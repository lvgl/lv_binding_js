#!/usr/bin/env node
/**
 * Capture GUI test screenshots via lvgljs run scripts/run-tests.js --capture.
 * Before running, deletes stray PNGs in _screenshots/capture/ that do not match
 * any bundled demo/test screenshot name (e.g. manual debug captures).
 *
 * Usage:
 *   yarn capture:screenshots
 *   yarn capture:screenshots chart
 *
 * Env:
 *   SCREENSHOT_DIFF_FILTER   substring filter (same as positional arg)
 *   LVGLJS_BIN               path to lvgljs executable (auto-detected)
 *   SCREENSHOT_USE_XVFB=1    wrap lvgljs with xvfb-run (Linux CI)
 */

const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");
const { clearWildCapturePngs } = require("./lib/screenshot-paths");

const repoRoot = path.resolve(__dirname, "..");

function usage() {
  console.error(`usage: node scripts/capture-screenshots.js [filter]

filter:
  optional substring passed to scripts/run-tests.js --capture (e.g. chart)

examples:
  yarn capture:screenshots
  yarn capture:screenshots chart
`);
}

function parseArgs(argv) {
  const opts = {
    filter: process.env.SCREENSHOT_DIFF_FILTER || "",
    lvgljs: process.env.LVGLJS_BIN || "",
    help: false,
    error: false,
  };

  const positional = [];
  for (const arg of argv) {
    if (arg === "--help" || arg === "-h") {
      opts.help = true;
    } else if (arg.startsWith("-")) {
      console.error(`unknown option: ${arg}`);
      opts.error = true;
    } else {
      positional.push(arg);
    }
  }

  if (positional.length > 0) {
    opts.filter = positional.join(" ");
  }

  return opts;
}

function resolveLvgljs(explicit) {
  if (explicit && fs.existsSync(explicit)) {
    return explicit;
  }

  const candidates = [
    path.join(repoRoot, "build", "lvgljs"),
    path.join(repoRoot, "build", "Release", "lvgljs.exe"),
    path.join(repoRoot, "build", "x64-pc-windows-msvc", "lvgljs.exe"),
    path.join(repoRoot, "build", "Debug", "lvgljs.exe"),
  ];

  for (const candidate of candidates) {
    if (fs.existsSync(candidate)) {
      return candidate;
    }
  }

  return "";
}

function main() {
  const opts = parseArgs(process.argv.slice(2));

  if (opts.error) {
    usage();
    process.exit(1);
  }

  if (opts.help) {
    usage();
    process.exit(0);
  }

  const lvgljs = resolveLvgljs(opts.lvgljs);
  if (!lvgljs) {
    console.error("error: lvgljs binary not found (build first or set LVGLJS_BIN)");
    process.exit(2);
  }

  const removed = clearWildCapturePngs(repoRoot);
  if (removed.length > 0) {
    console.log(
      `removed ${removed.length} wild capture PNG(s): ${removed.join(", ")}\n`,
    );
  }

  const args = ["run", "scripts/run-tests.js", "--capture"];
  if (opts.filter) {
    args.push(opts.filter);
  }

  const useXvfb = process.env.SCREENSHOT_USE_XVFB === "1";
  const command = useXvfb ? "xvfb-run" : lvgljs;
  const spawnArgs = useXvfb ? ["-a", lvgljs, ...args] : args;

  console.log(`capture: ${command} ${spawnArgs.join(" ")}\n`);

  const result = spawnSync(command, spawnArgs, {
    cwd: repoRoot,
    stdio: "inherit",
    shell: false,
    env: { ...process.env },
  });

  if (result.error) {
    console.error(`capture failed: ${result.error.message}`);
    process.exit(2);
  }

  process.exit(result.status ?? 1);
}

main();
