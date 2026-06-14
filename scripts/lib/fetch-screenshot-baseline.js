/**
 * Download screenshot baseline when SCREENSHOT_DIFF_BASELINE_RELEASE or
 * SCREENSHOT_DIFF_BASELINE_RUN_ID is set (used by diff-screenshots.js and fetch CLI).
 */

const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");
const { baselineAssetName } = require("./screenshot-baseline-platforms");
const { screenshotPaths } = require("./screenshot-paths");

const repoRoot = path.resolve(__dirname, "..", "..");

function run(command, args) {
  const result = spawnSync(command, args, { stdio: "inherit" });
  if (result.error) {
    throw result.error;
  }
  return result.status ?? 1;
}

function extractTarGz(archivePath, outDir) {
  if (process.platform === "win32") {
    const code = run("powershell", [
      "-NoProfile",
      "-Command",
      `tar -xzf '${archivePath.replace(/'/g, "''")}' -C '${outDir.replace(/'/g, "''")}'`,
    ]);
    if (code !== 0) {
      throw new Error(`tar extract failed with exit ${code}`);
    }
    return;
  }

  const code = run("tar", ["-xzf", archivePath, "-C", outDir]);
  if (code !== 0) {
    throw new Error(`tar extract failed with exit ${code}`);
  }
}

function fetchBaselineFromRelease(opts) {
  const paths = screenshotPaths(repoRoot);
  const downloadDir = paths.download;
  const out = path.resolve(opts.out);

  fs.rmSync(downloadDir, { recursive: true, force: true });
  fs.mkdirSync(downloadDir, { recursive: true });

  console.log(`download: gh release download ${opts.release} -R ${opts.repo} -p ${opts.asset} -D ${downloadDir}`);

  const dlCode = run("gh", [
    "release", "download", opts.release,
    "-R", opts.repo,
    "-p", opts.asset,
    "-D", downloadDir,
  ]);

  if (dlCode !== 0) {
    throw new Error(`gh release download failed (exit ${dlCode})`);
  }

  const archivePath = path.join(downloadDir, opts.asset);
  if (!fs.existsSync(archivePath)) {
    throw new Error(`downloaded asset not found: ${archivePath}`);
  }

  fs.rmSync(out, { recursive: true, force: true });
  fs.mkdirSync(out, { recursive: true });
  extractTarGz(archivePath, out);

  const manifestPath = path.join(out, "manifest.json");
  if (!fs.existsSync(manifestPath)) {
    throw new Error(`manifest.json missing after extract in ${out}`);
  }

  console.log(`\nBaseline ready: ${out}`);
  console.log(`  release: ${opts.release}`);
  console.log(`  asset:   ${opts.asset}`);
}

function fetchBaselineFromRun(opts) {
  const out = path.resolve(opts.out);
  const artifact = `lvgljs-test-screenshots-${opts.job}`;

  console.log(`download: gh run download ${opts.runId} -R ${opts.repo} -n ${artifact} -D ${out}`);

  fs.rmSync(out, { recursive: true, force: true });
  fs.mkdirSync(out, { recursive: true });

  const dlCode = run("gh", [
    "run", "download", opts.runId,
    "-R", opts.repo,
    "-n", artifact,
    "-D", out,
  ]);

  if (dlCode !== 0) {
    throw new Error(`gh run download failed (exit ${dlCode})`);
  }

  console.log(`\nBaseline ready: ${out}`);
  console.log(`  run_id:   ${opts.runId}`);
  console.log(`  artifact: ${artifact}`);
}

/**
 * Download baseline when CI env vars are set. Returns true if a download ran.
 */
function fetchBaselineIfConfigured({ out, filter } = {}) {
  const paths = screenshotPaths(repoRoot);
  const resolvedFilter = filter || process.env.SCREENSHOT_DIFF_FILTER || "";
  const resolvedOut = path.resolve(out || process.env.SCREENSHOT_DIFF_BASELINE_OUT || paths.baseline);
  const release = process.env.SCREENSHOT_DIFF_BASELINE_RELEASE || "";
  const runId = process.env.SCREENSHOT_DIFF_BASELINE_RUN_ID || "";
  const repo = process.env.GITHUB_REPOSITORY || "lvgljs/lvgljs";
  const job = process.env.GITHUB_JOB || "";

  if (release) {
    let asset = process.env.SCREENSHOT_DIFF_BASELINE_ASSET || "";
    if (!asset && job) {
      asset = baselineAssetName(job, resolvedFilter || "all");
    }
    if (!asset) {
      throw new Error("could not resolve baseline asset (set SCREENSHOT_DIFF_BASELINE_ASSET or GITHUB_JOB)");
    }
    fetchBaselineFromRelease({ release, asset, repo, out: resolvedOut });
    return true;
  }

  if (runId) {
    if (!job) {
      throw new Error("GITHUB_JOB is required when SCREENSHOT_DIFF_BASELINE_RUN_ID is set");
    }
    fetchBaselineFromRun({ runId, job, repo, out: resolvedOut });
    return true;
  }

  return false;
}

module.exports = {
  fetchBaselineFromRelease,
  fetchBaselineFromRun,
  fetchBaselineIfConfigured,
};
