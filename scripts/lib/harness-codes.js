// Shared exit codes for scripts/run-tests.js, gui-test-runner.js, cli-test-runner.js.

/** A test finished its async work and exited with TEST_EXIT_OK. */
export const TEST_EXIT_OK = 95;

/** The harness itself: all tests passed / some failed / internal error. */
export const HARNESS_EXIT_OK = 0;
export const HARNESS_EXIT_FAIL = 1;
export const HARNESS_EXIT_ERROR = 2;
