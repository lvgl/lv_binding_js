/**
 * All screenshot working directories live under _screenshots/.
 */

const path = require("path");

const ROOT = "_screenshots";

const SUB = {
  capture: "capture",
  diff: "diff",
  baseline: "baseline",
  download: "download",
  packages: "packages",
  import: "import",
  html: "html",
};

function screenshotPaths(repoRoot) {
  const root = path.join(repoRoot, ROOT);
  return {
    root,
    rootRel: ROOT,
    capture: path.join(root, SUB.capture),
    captureRel: `${ROOT}/${SUB.capture}`,
    diff: path.join(root, SUB.diff),
    diffRel: `${ROOT}/${SUB.diff}`,
    baseline: path.join(root, SUB.baseline),
    baselineRel: `${ROOT}/${SUB.baseline}`,
    download: path.join(root, SUB.download),
    downloadRel: `${ROOT}/${SUB.download}`,
    packages: path.join(root, SUB.packages),
    packagesRel: `${ROOT}/${SUB.packages}`,
    import: path.join(root, SUB.import),
    importRel: `${ROOT}/${SUB.import}`,
    html: path.join(root, SUB.html),
    htmlRel: `${ROOT}/${SUB.html}`,
  };
}

function ensureScreenshotDirs(repoRoot) {
  const fs = require("fs");
  const paths = screenshotPaths(repoRoot);
  fs.mkdirSync(paths.root, { recursive: true });
  for (const sub of Object.values(SUB)) {
    fs.mkdirSync(path.join(paths.root, sub), { recursive: true });
  }
  return paths;
}

/** Same naming as scripts/run-tests.js pngName(). */
function capturePngName(testRel) {
  return testRel.replace(/\//g, "__") + ".png";
}

function findBundledTestRels(repoRoot) {
  const fs = require("fs");
  const rels = [];

  function walk(dir, prefix) {
    if (!fs.existsSync(dir)) {
      return;
    }
    for (const name of fs.readdirSync(dir)) {
      const full = path.join(dir, name);
      if (!fs.statSync(full).isDirectory()) {
        continue;
      }
      const indexJs = path.join(full, "index.js");
      if (fs.existsSync(indexJs) && fs.statSync(indexJs).isFile()) {
        rels.push(`${prefix}${name}/index.js`);
      } else {
        walk(full, `${prefix}${name}/`);
      }
    }
  }

  walk(path.join(repoRoot, "demo"), "demo/");
  walk(path.join(repoRoot, "test"), "test/");
  return rels;
}

/** Remove capture PNGs that do not match any bundled demo/test screenshot name. */
function clearWildCapturePngs(repoRoot) {
  const fs = require("fs");
  const paths = ensureScreenshotDirs(repoRoot);
  const valid = new Set(findBundledTestRels(repoRoot).map(capturePngName));
  const removed = [];

  if (!fs.existsSync(paths.capture)) {
    return removed;
  }

  for (const name of fs.readdirSync(paths.capture)) {
    if (!name.endsWith(".png") || valid.has(name)) {
      continue;
    }
    fs.unlinkSync(path.join(paths.capture, name));
    removed.push(name);
  }

  return removed.sort();
}

module.exports = {
  ROOT,
  SUB,
  screenshotPaths,
  ensureScreenshotDirs,
  capturePngName,
  clearWildCapturePngs,
};
