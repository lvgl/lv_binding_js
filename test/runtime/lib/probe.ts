export const HARNESS_CODES_PATH = '../../../scripts/lib/harness-codes.js';

export function getBridge(): any {
  return globalThis[Symbol.for('lvgljs')];
}

export function getCompMapSize(): number {
  return getBridge().NativeRender.RenderUtil.getCompMapSize();
}

export function flushReact(): void {
  /* no-op: calendar leak test drives reconciler directly */
}

export function runGc(): void {
  tjs.engine.gc.run();
  tjs.engine.gc.run();
}

export function fail(message: string): never {
  console.error(`FAIL: ${message}`);
  tjs.exit(2);
}

export function assertEq(actual: number, expected: number, label: string): void {
  if (actual !== expected) {
    fail(`${label}: expected ${expected}, got ${actual}`);
  }
  console.log(`ok: ${label} (${actual})`);
}
