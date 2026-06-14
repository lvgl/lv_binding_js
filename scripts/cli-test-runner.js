// Wrapper for CLI/runtime tests under test/runtime/:
//
//   lvgljs run scripts/cli-test-runner.js <test/index.js>
//
// Loads the test module and waits for it to call tjs.exit(). The test must
// run its async work and exit with TEST_EXIT_OK on success.

import path from 'tjs:path';

const scriptDir = import.meta.dirname;
const { HARNESS_EXIT_ERROR } = await import(path.join(scriptDir, 'lib', 'harness-codes.js'));

const testArg = tjs.args[3];

async function main() {
    if (!testArg) {
        console.error('usage: lvgljs run scripts/cli-test-runner.js <test.js>');
        tjs.exit(HARNESS_EXIT_ERROR);
        return;
    }

    const testPath = path.resolve(testArg);

    try {
        await import(testPath);
    } catch (e) {
        console.error('failed to load test:', e && e.stack ? e.stack : e);
        tjs.exit(HARNESS_EXIT_ERROR);
    }
}

main();
