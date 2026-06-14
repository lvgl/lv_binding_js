const path = require("path");

const SPEC_ROOT = path.join(__dirname, "../../src/render/react/core");
const OUT_DIR = path.join(__dirname, "../../build/spec");

/** Shared esbuild options for Node spec bundles (node:test + node:assert/strict). */
const esbuildOptions = {
  bundle: true,
  platform: "node",
  format: "cjs",
  target: "es2020",
  external: ["node:test", "node:assert/strict"],
  // Install the lv_conf bridge stub before any other module initializes.
  // Specs also import lv.setup.spec directly, but the import sorter may
  // reorder that after modules that read lv_conf at module load; `inject`
  // guarantees the stub runs first regardless of import order.
  inject: [path.join(SPEC_ROOT, "lv.setup.spec.ts")],
};

module.exports = { SPEC_ROOT, OUT_DIR, esbuildOptions };
