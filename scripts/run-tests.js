// lvgljs-native test harness, run *by lvgljs itself*:
//
//   lvgljs run scripts/run-tests.js [--capture] [filter]
//
// Every bundled test under test/**/index.js is a GUI program that starts the
// LVGL event loop and never returns on its own. Each one is launched through
// scripts/gui-test-runner.js, which loads the test, lets it render for a
// short window, and then calls tjs.exit(TEST_EXIT_OK).
//
// Pass/fail logic:
//   - exit TEST_EXIT_OK, no signal, no error markers -> pass
//   - any other exit, crash/abort, killed, or error markers -> fail
//
// --capture saves a PNG per test under _screenshots/ (simulator build).
//
// Env:
//   TEST_RENDER_MS   how long each GUI test renders before auto-exit (default 1500;
//                    capture mode uses 2500 + TEST_SETTLE_MS unless set explicitly)
//   TEST_SETTLE_MS   extra render time before screenshot in capture mode (default 1200)
//   TEST_TIMEOUT_MS  hard kill safety net per test (default 15000)
//   TEST_GLOB        optional substring filter; only matching test paths run
//   TEST_SCREENSHOT_OUT  output directory for --capture (default <repo>/_screenshots)
//
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
} = await import(path.join(scriptDir, 'harness-codes.js'));
const repoRoot = path.dirname(scriptDir);
const testRoot = path.join(repoRoot, 'test');
const runnerRel = 'scripts/gui-test-runner.js';

const cli = getopts(tjs.args.slice(3), {
    boolean: [ 'capture' ],
    stopEarly: true,
});

const filter = cli._[0] || tjs.env.TEST_GLOB || '';
const captureMode = cli.capture;
const screenshotOut = path.resolve(
    repoRoot,
    tjs.env.TEST_SCREENSHOT_OUT || '_screenshots',
);

const captureRenderMs = parseInt(tjs.env.TEST_RENDER_MS || '2500', 10);
const captureSettleMs = parseInt(tjs.env.TEST_SETTLE_MS || '1200', 10);
const renderMs = captureMode
    ? captureRenderMs + captureSettleMs
    : parseInt(tjs.env.TEST_RENDER_MS || '1500', 10);
const hardTimeoutMs = parseInt(tjs.env.TEST_TIMEOUT_MS || '15000', 10);

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

async function runTest(absPath, relPath, screenshotPath = '') {
    tjs.env.TEST_RENDER_MS = String(renderMs);
    if (screenshotPath) {
        tjs.env.TEST_SCREENSHOT_PATH = screenshotPath;
    } else {
        delete tjs.env.TEST_SCREENSHOT_PATH;
    }

    const proc = tjs.spawn([ tjs.exePath, 'run', runnerRel, relPath ], {
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
    const tests = (await findTests(testRoot))
        .map((p) => ({ abs: p, rel: toRelative(p) }))
        .filter((t) => t.rel.includes(filter))
        .filter((t) => !captureMode || !t.rel.startsWith('test/runtime/'))
        .sort((a, b) => (a.rel < b.rel ? -1 : a.rel > b.rel ? 1 : 0));

    if (tests.length === 0) {
        console.log(
            'No bundled tests found under test/**/index.js. Run "yarn bundle" (node build.js) before the test harness.',
        );
        tjs.exit(HARNESS_EXIT_ERROR);
        return;
    }

    if (captureMode) {
        await tjs.makeDir(screenshotOut, { recursive: true });
    }

    const modeLabel = captureMode ? `capture -> ${toRelative(screenshotOut)}` : 'test';
    console.log(`Found ${tests.length} test(s) (${modeLabel}). Render window: ${renderMs}ms, hard timeout: ${hardTimeoutMs}ms\n`);

    const failures = [];
    for (const test of tests) {
        const screenshotPath = captureMode
            ? path.join(screenshotOut, pngName(test.rel))
            : '';
        const result = await runTest(test.abs, test.rel, screenshotPath);
        console.log(`${result.ok ? 'PASS' : 'FAIL'}  ${test.rel}`);
        if (!result.ok) {
            failures.push({ test, result });
            console.log(`      reason: ${result.reason}`);
            if (result.stdout) {
                console.log('--- stdout ---\n' + result.stdout);
            }
            if (result.stderr) {
                console.log('--- stderr ---\n' + result.stderr);
            }
        }
    }

    console.log(`\n${tests.length - failures.length}/${tests.length} test(s) passed.`);

    if (failures.length > 0) {
        console.log('\nFailed tests:');
        for (const f of failures) {
            console.log(`  - ${f.test.rel}`);
        }
        tjs.exit(HARNESS_EXIT_FAIL);
        return;
    }

    tjs.exit(HARNESS_EXIT_OK);
}

main().catch((e) => {
    console.log('harness error:', e && e.stack ? e.stack : e);
    tjs.exit(HARNESS_EXIT_ERROR);
});
