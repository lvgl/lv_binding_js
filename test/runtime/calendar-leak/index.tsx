// Thin entry for the widgets-style calendar leak probe.
//
// Build:  yarn run bundle  (or yarn run build)
// Run:    lvgljs run scripts/cli-test-runner.js test/runtime/calendar-leak/index.js

import { runCalendarLeakTest } from './run-calendar-leak';

runCalendarLeakTest();
