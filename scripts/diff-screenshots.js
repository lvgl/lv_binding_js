#!/usr/bin/env node
/**
 * Pixel-diff GUI test screenshots against a baseline directory (e.g. CI artifact).
 *
 * Usage:
 *   node scripts/diff-screenshots.js --baseline _screenshots/baseline --actual _screenshots/capture
 *   node scripts/diff-screenshots.js --baseline _screenshots/baseline chart
 *
 * Run after yarn capture:screenshots. Fetches baseline first when
 * SCREENSHOT_DIFF_BASELINE_RELEASE or SCREENSHOT_DIFF_BASELINE_RUN_ID is set.
 *
 * Exit: 0 all compared images match; 1 mismatch or missing baseline; 2 bad args.
 */

const fs = require("fs");
const path = require("path");
const { Glob } = require("glob");
const { PNG } = require("pngjs");
const { screenshotPaths } = require("./lib/screenshot-paths");
const { fetchBaselineIfConfigured } = require("./lib/fetch-screenshot-baseline");
const { writeScreenshotDiffHtml } = require("./lib/screenshot-diff-html");

const repoRoot = path.resolve(__dirname, "..");
const paths = screenshotPaths(repoRoot);

function usage() {
  console.error(`usage: node scripts/diff-screenshots.js [options] [filter]

options:
  --baseline <dir>   baseline PNG tree (required unless SCREENSHOT_DIFF_BASELINE)
  --actual <dir>     actual PNG tree (default: _screenshots/capture)
  --out <dir>        write diff overlays here (default: _screenshots/diff)
  --html <file>      write HTML report (default: _screenshots/html/index.html)
  --no-html          skip HTML report
  --threshold <n>    pixelmatch threshold 0..1 (default: 0.05)
  --help             show this help

filter:
  optional substring; only PNGs whose file name contains filter are compared
`);
}

function parseArgs(argv) {
  const opts = {
    baseline: process.env.SCREENSHOT_DIFF_BASELINE || "",
    actual: process.env.SCREENSHOT_DIFF_ACTUAL || paths.capture,
    out: process.env.SCREENSHOT_DIFF_OUT || paths.diff,
    html: process.env.SCREENSHOT_DIFF_HTML || path.join(paths.html, "index.html"),
    noHtml: false,
    threshold: parseFloat(process.env.SCREENSHOT_DIFF_THRESHOLD || "0.05"),
    filter: process.env.SCREENSHOT_DIFF_FILTER || "",
    help: false,
  };

  const positional = [];
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === "--help" || arg === "-h") {
      opts.help = true;
    } else if (arg === "--baseline") {
      opts.baseline = argv[++i] || "";
    } else if (arg === "--actual") {
      opts.actual = argv[++i] || "";
    } else if (arg === "--out") {
      opts.out = argv[++i] || "";
    } else if (arg === "--html") {
      opts.html = argv[++i] || "";
    } else if (arg === "--no-html") {
      opts.noHtml = true;
    } else if (arg === "--threshold") {
      opts.threshold = parseFloat(argv[++i]);
    } else if (arg.startsWith("-")) {
      console.error(`unknown option: ${arg}`);
      opts.help = true;
    } else {
      positional.push(arg);
    }
  }

  if (positional.length > 0) {
    opts.filter = positional.join(" ");
  }

  if (opts.baseline) {
    opts.baseline = path.resolve(opts.baseline);
  }
  opts.actual = path.resolve(opts.actual);
  opts.out = path.resolve(opts.out);
  if (opts.html) {
    opts.html = path.resolve(opts.html);
  }

  return opts;
}

function readPng(filePath) {
  const data = fs.readFileSync(filePath);
  return PNG.sync.read(data);
}

function writePng(filePath, png) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, PNG.sync.write(png));
}

/** Baseline pixels that are not near-white (UI/content vs empty background). */
function isContentPixel(data, i) {
  return !(data[i] > 250 && data[i + 1] > 250 && data[i + 2] > 250);
}

/** pixelmatch marks mismatches in red on the diff image. */
function isDiffPixel(diffData, i) {
  return diffData[i] > 200 && diffData[i + 1] < 80 && diffData[i + 2] < 80;
}

function countContentDiff(baselineData, diffData) {
  let contentPixels = 0;
  let contentDiffPixels = 0;
  for (let i = 0; i < baselineData.length; i += 4) {
    const content = isContentPixel(baselineData, i);
    if (content) {
      contentPixels++;
    }
    if (content && isDiffPixel(diffData, i)) {
      contentDiffPixels++;
    }
  }
  return { contentPixels, contentDiffPixels };
}

function formatDiffReason(diffPixels, totalPixels, contentPixels, contentDiffPixels) {
  const screenPct = ((diffPixels / totalPixels) * 100).toFixed(2);
  let reason = `${diffPixels}/${totalPixels} screen (${screenPct}%)`;
  if (contentPixels > 0) {
    const contentPct = ((contentDiffPixels / contentPixels) * 100).toFixed(1);
    reason += `; ${contentDiffPixels}/${contentPixels} content (${contentPct}%)`;
  }
  return reason;
}

async function collectPngMap(rootDir) {
  const glob = new Glob("**/*.png", { cwd: rootDir, nodir: true });
  const map = new Map();
  for (const rel of glob) {
    const base = path.basename(rel);
    if (map.has(base)) {
      const prev = map.get(base);
      console.warn(
        `warning: duplicate baseline name "${base}"\n  keeping: ${prev}\n  ignoring: ${path.join(rootDir, rel)}`,
      );
      continue;
    }
    map.set(base, path.join(rootDir, rel));
  }
  return map;
}

function comparePair(name, baselinePath, actualPath, outDir, threshold, pixelmatch) {
  const baseline = readPng(baselinePath);
  const actual = readPng(actualPath);

  if (baseline.width !== actual.width || baseline.height !== actual.height) {
    return {
      name,
      ok: false,
      reason: `size mismatch baseline ${baseline.width}x${baseline.height} vs actual ${actual.width}x${actual.height}`,
      diffPixels: null,
      totalPixels: null,
      diffPath: "",
      baselinePath,
      actualPath,
    };
  }

  const { width, height } = baseline;
  const diff = new PNG({ width, height });
  const diffPixels = pixelmatch(
    baseline.data,
    actual.data,
    diff.data,
    width,
    height,
    { threshold, includeAA: false },
  );

  const totalPixels = width * height;
  const { contentPixels, contentDiffPixels } = countContentDiff(
    baseline.data,
    diff.data,
  );
  const ok = diffPixels === 0;
  const diffPath = path.join(outDir, name.replace(/\.png$/i, ".diff.png"));
  writePng(diffPath, diff);

  return {
    name,
    ok,
    reason: ok
      ? ""
      : formatDiffReason(
          diffPixels,
          totalPixels,
          contentPixels,
          contentDiffPixels,
        ),
    diffPixels,
    totalPixels,
    contentPixels,
    contentDiffPixels,
    diffPath,
    baselinePath,
    actualPath,
  };
}

/**
 * @param {ReturnType<typeof parseArgs>} opts
 * @returns {Promise<{ exitCode: number, passed: number, failed: number, results: object[] }>}
 */
async function compareScreenshots(opts) {
  const pixelmatch = (await import("pixelmatch")).default;

  if (!opts.baseline) {
    console.error("error: --baseline <dir> is required (or set SCREENSHOT_DIFF_BASELINE)");
    usage();
    return { exitCode: 2, passed: 0, failed: 0, results: [] };
  }

  if (!fs.existsSync(opts.baseline)) {
    console.error(`error: baseline directory not found: ${opts.baseline}`);
    return { exitCode: 2, passed: 0, failed: 0, results: [] };
  }
  if (!fs.existsSync(opts.actual)) {
    console.error(`error: actual directory not found: ${opts.actual}`);
    return { exitCode: 2, passed: 0, failed: 0, results: [] };
  }
  if (Number.isNaN(opts.threshold) || opts.threshold < 0 || opts.threshold > 1) {
    console.error(`error: invalid threshold ${opts.threshold} (expected 0..1)`);
    return { exitCode: 2, passed: 0, failed: 0, results: [] };
  }

  const baselineMap = await collectPngMap(opts.baseline);
  const actualMap = await collectPngMap(opts.actual);

  let names = [...actualMap.keys()].sort();
  if (opts.filter) {
    names = names.filter((n) => n.includes(opts.filter));
  }

  if (names.length === 0) {
    console.error(
      opts.filter
        ? `error: no actual PNGs matched filter "${opts.filter}" under ${opts.actual}`
        : `error: no PNGs found under ${opts.actual}`,
    );
    return { exitCode: 2, passed: 0, failed: 0, results: [] };
  }

  fs.mkdirSync(opts.out, { recursive: true });

  const results = [];
  let missingBaseline = 0;

  for (const name of names) {
    const actualPath = actualMap.get(name);
    const baselinePath = baselineMap.get(name);
    if (!baselinePath) {
      missingBaseline++;
      results.push({
        name,
        ok: false,
        reason: "missing baseline PNG (same file name not found under baseline tree)",
        diffPixels: null,
        totalPixels: null,
        diffPath: "",
        baselinePath: "",
        actualPath,
      });
      continue;
    }

    results.push(comparePair(name, baselinePath, actualPath, opts.out, opts.threshold, pixelmatch));
  }

  const failed = results.filter((r) => !r.ok);
  const passed = results.length - failed.length;

  console.log(
    `Compared ${results.length} image(s)\n  baseline: ${opts.baseline}\n  actual:   ${opts.actual}\n  threshold: ${opts.threshold}${opts.filter ? `\n  filter:   ${opts.filter}` : ""}`,
  );

  for (const r of results) {
    if (r.ok) {
      console.log(`PASS ${r.name}`);
    } else {
      console.log(`FAIL ${r.name} - ${r.reason}`);
      if (r.diffPath) {
        console.log(`      diff: ${r.diffPath}`);
      }
    }
  }

  if (!opts.noHtml) {
    const htmlFile = writeScreenshotDiffHtml({
      htmlFile: opts.html,
      baselineDir: opts.baseline,
      actualDir: opts.actual,
      diffDir: opts.out,
      threshold: opts.threshold,
      filter: opts.filter,
      results,
    });
    console.log(`\nHTML report: ${htmlFile}`);
  }

  if (failed.length > 0) {
    console.log(`\n${passed}/${results.length} passed; ${failed.length} failed`);
    if (missingBaseline > 0) {
      console.log(`  (${missingBaseline} without a matching baseline file name)`);
    }
    console.log(`Diff overlays written under: ${opts.out}`);
    return { exitCode: 1, passed, failed: failed.length, results };
  }

  console.log(`\n${passed}/${results.length} passed`);
  return { exitCode: 0, passed, failed: 0, results };
}

async function main() {
  const opts = parseArgs(process.argv.slice(2));

  if (opts.help) {
    usage();
    process.exit(opts.help && !opts.baseline ? 2 : 0);
    return;
  }

  if (opts.baseline) {
    fetchBaselineIfConfigured({ out: opts.baseline, filter: opts.filter });
  }

  const { exitCode } = await compareScreenshots(opts);
  process.exit(exitCode);
}

module.exports = { compareScreenshots, parseArgs, usage };

if (require.main === module) {
  main().catch((err) => {
    console.error(err && err.stack ? err.stack : err);
    process.exit(2);
  });
}
