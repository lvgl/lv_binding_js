// lvgljs-native test harness, run *by lvgljs itself*:
//
//   lvgljs run scripts/run-tests.js [--capture] [filter]
//
// GUI tests under test/**/index.js start the LVGL event loop and never return
// on their own. Each is launched through scripts/gui-test-runner.js, which
// loads the test, lets it render for a short window, and then calls
// tjs.exit(TEST_EXIT_OK).
//
// CLI tests under test/runtime/**/index.js are launched through
// scripts/cli-test-runner.js; the test must finish its async work and call
// tjs.exit(TEST_EXIT_OK) itself (or exit non-zero / throw on failure).
//
// Pass/fail logic:
//   - exit TEST_EXIT_OK, no signal, no error markers -> pass
//   - any other exit, crash/abort, killed, or error markers -> fail
//
// Expected failure (xfail): place an empty file named "xfail" next to index.js
// (e.g. test/runtime/foo/xfail). A failing test is reported XFAIL and does not
// fail the harness; a passing xfail test is reported XPASS and fails the harness.
// Optional first line in xfail is printed as the reason.
//
// --capture saves a PNG per test under _screenshots/capture/ (simulator build).
// For pixel diff against a baseline: yarn capture:screenshots then yarn diff:screenshots --baseline <dir>.
//
// Env:
//   TEST_RENDER_MS   how long each GUI test renders before auto-exit (default 1500;
//                    capture mode uses 2500 + TEST_SETTLE_MS unless set explicitly)
//   TEST_SETTLE_MS   extra render time before screenshot in capture mode (default 1200)
//   TEST_TIMEOUT_MS  hard kill safety net per test (default 15000)
//   TEST_GLOB        optional substring filter; only matching test paths run
//   TEST_SCREENSHOT_OUT  output directory for --capture (default <repo>/_screenshots/capture)
//   TEST_CAPTURE         set to "1" for each child test when --capture is active (stable screenshots)
//
// Per-test render overrides live in RENDER_MS_OVERRIDES (e.g. remote GIF fetch needs more time).
// The harness is itself a lvgljs program, so it reports its verdict via
// tjs.exit() (HARNESS_EXIT_OK / HARNESS_EXIT_FAIL / HARNESS_EXIT_ERROR).
import getopts from 'tjs:getopts';
import path from 'tjs:path';


const scriptDir = import.meta.dirname;
const {
    TEST_EXIT_OK,
    HARNESS_EXIT_OK,
    HARNESS_EXIT_FAIL,
    HARNESS_EXIT_ERROR,
} = await import(path.join(scriptDir, 'lib', 'harness-codes.js'));
const repoRoot = path.dirname(scriptDir);
const guiRunnerRel = 'scripts/gui-test-runner.js';
const cliRunnerRel = 'scripts/cli-test-runner.js';

const cli = getopts(tjs.args.slice(3), {
    boolean: [ 'capture' ],
    stopEarly: true,
});

const filter = cli._[0] || tjs.env.TEST_GLOB || '';
const captureMode = cli.capture;
const screenshotOut = path.resolve(
    repoRoot,
    tjs.env.TEST_SCREENSHOT_OUT || '_screenshots/capture',
);

const captureRenderMs = parseInt(tjs.env.TEST_RENDER_MS || '2500', 10);
const captureSettleMs = parseInt(tjs.env.TEST_SETTLE_MS || '1200', 10);
const defaultRenderMs = captureMode
    ? captureRenderMs + captureSettleMs
    : parseInt(tjs.env.TEST_RENDER_MS || '1500', 10);
const hardTimeoutMs = parseInt(tjs.env.TEST_TIMEOUT_MS || '15000', 10);

// Per-test render window (ms) when the default is too short (e.g. remote GIF fetch).
const RENDER_MS_OVERRIDES = {
    'test/gif/1/index.js': defaultRenderMs,
};

function resolveRenderMs(relPath) {
    if (RENDER_MS_OVERRIDES[relPath] != null) {
        return RENDER_MS_OVERRIDES[relPath];
    }
    return defaultRenderMs;
}

const FAILURE_MARKERS = [
    /Assertion .* failed/,        // debug-build C assert (abort)
    /\(closed\) == \(1\)/,        // runtime teardown regression
    /AssertionError/,             // tjs:assert / node assert failures
    /\bUncaught\b/,               // uncaught exception dump
    /unhandled rejection/i,       // unhandled promise rejection
    /Segmentation fault/i,
];

async function listDir(dir) {
    const iter = await tjs.readDir(dir);
    const entries = [];
    for await (const entry of iter) {
        entries.push(entry);
    }
    try {
        await iter.close();
    } catch (_) {
        // already closed when the iterator drained
    }
    return entries;
}

async function findTests(dir) {
    const found = [];
    for (const entry of await listDir(dir)) {
        if (entry.name === '.' || entry.name === '..') {
            continue;
        }
        const full = path.join(dir, entry.name);
        if (entry.isDirectory) {
            found.push(...await findTests(full));
        } else if (entry.isFile && entry.name === 'index.js') {
            found.push(full);
        }
    }
    return found;
}

function toRelative(p) {
    let rel = p.slice(repoRoot.length + 1);
    return rel.split('\\').join('/');
}

function pngName(testRel) {
    return testRel.replace(/\//g, '__') + '.png';
}

async function screenshotExists(filePath) {
    try {
        const st = await tjs.stat(filePath);
        return st.isFile;
    } catch (_) {
        return false;
    }
}

/** @returns {{ expected: boolean, reason: string }} */
async function readExpectedFail(absPath) {
    const xfailPath = path.join(path.dirname(absPath), 'xfail');
    try {
        const st = await tjs.stat(xfailPath);
        if (!st.isFile) {
            return { expected: false, reason: '' };
        }
    } catch (_) {
        return { expected: false, reason: '' };
    }

    let reason = '';
    try {
        const data = await tjs.readFile(xfailPath);
        reason = new TextDecoder().decode(data).split(/\r?\n/)[0].trim();
    } catch (_) {
        // empty xfail file is fine
    }

    return { expected: true, reason };
}

function logTestFailureOutput(result, reason) {
    console.log(`      reason: ${reason}`);
    if (result.stdout) {
        console.log('--- stdout ---\n' + result.stdout);
    }
    if (result.stderr) {
        console.log('--- stderr ---\n' + result.stderr);
    }
}

async function runTest(absPath, relPath, screenshotPath = '', isRuntimeTest = false) {
    const testRenderMs = resolveRenderMs(relPath);
    if (isRuntimeTest) {
        delete tjs.env.TEST_RENDER_MS;
        delete tjs.env.TEST_SCREENSHOT_PATH;
        delete tjs.env.TEST_CAPTURE;
    } else {
        tjs.env.TEST_RENDER_MS = String(testRenderMs);
        if (screenshotPath) {
            tjs.env.TEST_SCREENSHOT_PATH = screenshotPath;
            tjs.env.TEST_CAPTURE = '1';
        } else {
            delete tjs.env.TEST_SCREENSHOT_PATH;
            delete tjs.env.TEST_CAPTURE;
        }
    }

    const spawnArgs = isRuntimeTest
        ? [ tjs.exePath, 'run', cliRunnerRel, relPath ]
        : [ tjs.exePath, 'run', guiRunnerRel, relPath ];

    const proc = tjs.spawn(spawnArgs, {
        cwd: repoRoot,
        stdout: 'pipe',
        stderr: 'pipe',
    });

    let killed = false;
    const killer = setTimeout(() => {
        killed = true;
        try {
            proc.kill('SIGKILL');
        } catch (_) {
            // already gone
        }
    }, hardTimeoutMs);

    let status, stdout, stderr;
    try {
        [ status, stdout, stderr ] = await Promise.all([
            proc.wait(),
            proc.stdout.text(),
            proc.stderr.text(),
        ]);
    } finally {
        clearTimeout(killer);
    }

    const combined = `${stdout || ''}\n${stderr || ''}`;
    const marker = FAILURE_MARKERS.find((re) => re.test(combined));

    let ok = true;
    let reason = '';
    if (killed) {
        ok = false;
        reason = `did not exit within ${hardTimeoutMs}ms (hard killed)`;
    } else if (status.term_signal) {
        ok = false;
        reason = `terminated by signal ${status.term_signal}`;
    } else if (status.exit_status !== TEST_EXIT_OK) {
        ok = false;
        reason = `exit status ${status.exit_status} (expected ${TEST_EXIT_OK})`;
    } else if (marker) {
        ok = false;
        reason = `output matched failure marker ${marker}`;
    } else if (screenshotPath && !(await screenshotExists(screenshotPath))) {
        ok = false;
        reason = 'screenshot file was not created';
    }

    return { ok, reason, stdout, stderr };
}

async function main() {
    const demoList = await findTests(path.join(repoRoot, 'demo'));
    const testList = await findTests(path.join(repoRoot, 'test'));

    if (demoList.length === 0) {
        console.log(
            'No bundled demos found under demos/**/index.js. Run "yarn bundle" (node build.js) before the test harness.',
        );
        tjs.exit(HARNESS_EXIT_ERROR);
        return;
    }

    const tests = [...demoList, ...testList]
      .map((p) => ({ abs: p, rel: toRelative(p) }))
      .filter((t) => t.rel.includes(filter))
      .sort((a, b) => (a.rel < b.rel ? -1 : a.rel > b.rel ? 1 : 0));

    if (captureMode) {
        await tjs.makeDir(screenshotOut, { recursive: true });
    }

    const modeLabel = captureMode ? `capture -> ${toRelative(screenshotOut)}` : 'test';
    console.log(`Found ${tests.length} test(s) (${modeLabel}). Default render window: ${defaultRenderMs}ms, hard timeout: ${hardTimeoutMs}ms\n`);

    const failures = [];
    let xfailCount = 0;
    for (const test of tests) {
        const isRuntimeTest = test.rel.startsWith('test/runtime/');
        const screenshotPath = (captureMode && !isRuntimeTest)
            ? path.join(screenshotOut, pngName(test.rel))
            : '';
        const testRenderMs = resolveRenderMs(test.rel);
        const xfail = await readExpectedFail(test.abs);
        const result = await runTest(test.abs, test.rel, screenshotPath, isRuntimeTest);
        const renderNote = testRenderMs !== defaultRenderMs ? ` (${testRenderMs}ms)` : '';

        let verdict;
        let harnessOk;
        if (xfail.expected && !result.ok) {
            verdict = 'XFAIL';
            harnessOk = true;
            xfailCount++;
        } else if (xfail.expected && result.ok) {
            verdict = 'XPASS';
            harnessOk = false;
        } else {
            verdict = result.ok ? 'PASS' : 'FAIL';
            harnessOk = result.ok;
        }

        console.log(`${verdict} ${isRuntimeTest ? 'CLI' : 'GUI'} ${test.rel}${renderNote}`);
        if (xfail.expected && xfail.reason) {
            console.log(`      xfail: ${xfail.reason}`);
        }
        if (!harnessOk) {
            failures.push({ test, result, verdict });
            const reason = verdict === 'XPASS'
                ? 'passed but is marked xfail (remove xfail when fixed)'
                : result.reason;
            logTestFailureOutput(result, reason);
        } else if (verdict === 'XFAIL') {
            logTestFailureOutput(result, result.reason);
        }
    }

    if (failures.length > 0) {
        console.log('\nFailed tests:');
        for (const f of failures) {
            console.log(`  - ${f.test.rel}${f.verdict === 'XPASS' ? ' (unexpected pass)' : ''}`);
        }
    }

    const passCount = tests.length - failures.length;
    const summary = xfailCount > 0
        ? `${passCount}/${tests.length} test(s) passed (${xfailCount} expected failure(s)).`
        : `${passCount}/${tests.length} test(s) passed.`;
    console.log(`\n${summary}`);

    if (failures.length > 0) {
        tjs.exit(HARNESS_EXIT_FAIL);
        return;
    }

    tjs.exit(HARNESS_EXIT_OK);
}

main().catch((e) => {
    console.log('harness error:', e && e.stack ? e.stack : e);
    tjs.exit(HARNESS_EXIT_ERROR);
});