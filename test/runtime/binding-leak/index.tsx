// Thin entry for native binding leak probe (no React UI).
//
// Build:  yarn run bundle
// Run:    lvgljs run scripts/cli-test-runner.js test/runtime/binding-leak/index.js

import { runBindingLeakTest } from './run-binding-leak';

runBindingLeakTest();
