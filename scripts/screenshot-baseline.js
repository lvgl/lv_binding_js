#!/usr/bin/env node
/**
 * Screenshot baseline archive management (package / fetch).
 *
 *   yarn package:screenshots:baseline --all --from-root _screenshots/import --filter chart
 *   yarn fetch:screenshots:baseline --release v8.3.1 --platform linux --filter chart
 */

const fs = require("fs");
const path = require("path");
const os = require("os");
const { spawnSync } = require("child_process");
const { Glob } = require("glob");
const {
  DEFAULT_WORKFLOW,
  baselineAssetName,
  listScreenshotPlatforms,
  resolveImportDir,
} = require("./lib/screenshot-baseline-platforms");
const { screenshotPaths, ensureScreenshotDirs } = require("./lib/screenshot-paths");
const { fetchBaselineFromRelease } = require("./lib/fetch-screenshot-baseline");
const { ensureScreenshotImport } = require("./lib/download-screenshot-import");
const {
  buildReleaseNotes,
  publishScreenshotBaseline,
} = require("./lib/publish-screenshot-baseline");

const repoRoot = path.resolve(__dirname, "..");
const paths = ensureScreenshotDirs(repoRoot);

function usage() {
  console.error(`usage: node scripts/screenshot-baseline.js <package|fetch> [options]

package ¡ª create .tar.gz assets for GitHub Release upload
  (--platform <id> | --all) [options]
  --all              every job in collect-screenshots.needs (from build.yml)
  --workflow <file>  workflow file (default: ${DEFAULT_WORKFLOW})
  --from <dir>       source PNG tree for single --platform (default: _screenshots/capture)
  --from-root <dir>  parent of per-platform dirs (default with --all: _screenshots/import)
  --filter <text>    only include PNGs whose file name contains this substring
  --label <text>     manifest label
  --commit <sha>     source commit
  --branch <name>    source branch
  --run <id>         GitHub Actions run ID (downloads combined artifact when set)
  --tag <git-tag>    resolve run from git tag via gh, download, package, and publish release
  --repo <owner/name>  GitHub repo for gh (default: GITHUB_REPOSITORY or lvgljs/lvgljs)
  --strict           fail when any platform from build.yml is missing (default: skip with warning)
  --no-release       skip gh release create/upload (even when --tag is set)
  --out <file>       output .tar.gz for single --platform

fetch ? download and extract a baseline .tar.gz from a GitHub Release
  --release <tag> (--asset <file> | --platform <id>) [options]
  --asset <file>     release asset name (e.g. linux-chart.tar.gz)
  --platform <id>    derive asset from platform + --filter (default: GITHUB_JOB in CI)
  --filter <text>    used with --platform (default: SCREENSHOT_DIFF_FILTER or "all")
  --out <dir>        extract baseline here (default: _screenshots/baseline)
  --repo <owner/name>  GitHub repo (default: GITHUB_REPOSITORY or lvgljs/lvgljs)

examples:
  yarn package:screenshots:baseline --all --tag v8.3.1 --filter chart
  yarn package:screenshots:baseline --all --tag v8.3.1 --no-release
  yarn package:screenshots:baseline --all --run 27415518550 --filter chart
  yarn package:screenshots:baseline --all --from-root _screenshots/import --filter chart
  gh release upload v8.3.1 _screenshots/packages/*.tar.gz
  yarn fetch:screenshots:baseline --release v8.3.1 --platform linux --filter chart
`);
}

function run(command, args, options = {}) {
  const result = spawnSync(command, args, { stdio: "inherit", ...options });
  if (result.error) {
    throw result.error;
  }
  return result.status ?? 1;
}

function parseCommand(argv) {
  const command = argv[0];
  if (!command || command === "--help" || command === "-h") {
    return { command: "", rest: [], help: true };
  }
  if (command === "package" || command === "fetch") {
    return { command, rest: argv.slice(1), help: false };
  }
  return { command: "", rest: argv, help: true };
}

function parsePackageArgs(argv) {
  const opts = {
    all: false,
    platform: "",
    workflow: DEFAULT_WORKFLOW,
    from: paths.capture,
    fromRoot: "",
    filter: "",
    label: "",
    commit: "",
    branch: "",
    run: "",
    tag: "",
    repo: process.env.GITHUB_REPOSITORY || "lvgljs/lvgljs",
    strict: false,
    noRelease: false,
    out: "",
    help: false,
  };

  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === "--help" || arg === "-h") {
      opts.help = true;
    } else if (arg === "--all") {
      opts.all = true;
    } else if (arg === "--platform") {
      opts.platform = argv[++i] || "";
    } else if (arg === "--workflow") {
      opts.workflow = argv[++i] || "";
    } else if (arg === "--from") {
      opts.from = argv[++i] || "";
    } else if (arg === "--from-root") {
      opts.fromRoot = argv[++i] || "";
    } else if (arg === "--filter") {
      opts.filter = argv[++i] || "";
    } else if (arg === "--label") {
      opts.label = argv[++i] || "";
    } else if (arg === "--commit") {
      opts.commit = argv[++i] || "";
    } else if (arg === "--branch") {
      opts.branch = argv[++i] || "";
    } else if (arg === "--run") {
      opts.run = argv[++i] || "";
    } else if (arg === "--tag") {
      opts.tag = argv[++i] || "";
    } else if (arg === "--repo") {
      opts.repo = argv[++i] || "";
    } else if (arg === "--strict") {
      opts.strict = true;
    } else if (arg === "--no-release") {
      opts.noRelease = true;
    } else if (arg === "--out") {
      opts.out = argv[++i] || "";
    } else {
      console.error(`unknown argument: ${arg}`);
      opts.help = true;
    }
  }

  opts.from = path.resolve(opts.from);
  if (opts.fromRoot) {
    opts.fromRoot = path.resolve(opts.fromRoot);
  }
  if (opts.out) {
    opts.out = path.resolve(opts.out);
  }
  return opts;
}

function parseFetchArgs(argv) {
  const filter = process.env.SCREENSHOT_DIFF_FILTER || "";
  const opts = {
    release: process.env.SCREENSHOT_DIFF_BASELINE_RELEASE || "",
    asset: process.env.SCREENSHOT_DIFF_BASELINE_ASSET || "",
    platform: process.env.GITHUB_JOB || "",
    filter,
    out: process.env.SCREENSHOT_DIFF_BASELINE_OUT || paths.baseline,
    repo: process.env.GITHUB_REPOSITORY || "lvgljs/lvgljs",
    help: false,
  };

  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === "--help" || arg === "-h") {
      opts.help = true;
    } else if (arg === "--release") {
      opts.release = argv[++i] || "";
    } else if (arg === "--asset") {
      opts.asset = argv[++i] || "";
    } else if (arg === "--platform") {
      opts.platform = argv[++i] || "";
    } else if (arg === "--filter") {
      opts.filter = argv[++i] || "";
    } else if (arg === "--out") {
      opts.out = argv[++i] || "";
    } else if (arg === "--repo") {
      opts.repo = argv[++i] || "";
    } else {
      console.error(`unknown argument: ${arg}`);
      opts.help = true;
    }
  }

  if (!opts.asset && opts.platform) {
    opts.asset = baselineAssetName(opts.platform, opts.filter || "all");
  }

  opts.out = path.resolve(opts.out);
  return opts;
}

async function collectPngs(rootDir, filter) {
  const glob = new Glob("**/*.png", { cwd: rootDir, nodir: true });
  const files = [];
  for (const rel of glob) {
    const base = path.basename(rel);
    if (filter && !base.includes(filter)) {
      continue;
    }
    files.push({ base, src: path.join(rootDir, rel) });
  }
  return files;
}

function defaultOutFile(platform, filter) {
  return path.join(paths.packages, baselineAssetName(platform, filter || "all"));
}

function createTarGz(stagingDir, outFile) {
  fs.mkdirSync(path.dirname(outFile), { recursive: true });

  if (process.platform === "win32") {
    const ps = spawnSync(
      "powershell",
      [
        "-NoProfile",
        "-Command",
        `tar -czf '${outFile.replace(/'/g, "''")}' -C '${stagingDir.replace(/'/g, "''")}' .`,
      ],
      { stdio: "inherit" },
    );
    if (ps.status !== 0) {
      throw new Error(`tar failed with exit ${ps.status}`);
    }
    return;
  }

  const result = spawnSync("tar", ["-czf", outFile, "-C", stagingDir, "."], { stdio: "inherit" });
  if (result.status !== 0) {
    throw new Error(`tar failed with exit ${result.status}`);
  }
}

async function packageOnePlatform({ platform, from, filter, label, commit, branch, run, out }) {
  if (!fs.existsSync(from)) {
    throw new Error(`source directory not found: ${from}`);
  }

  const files = await collectPngs(from, filter);
  if (files.length === 0) {
    throw new Error(
      filter
        ? `no PNGs matched filter "${filter}" under ${from}`
        : `no PNGs found under ${from}`,
    );
  }

  const stagingDir = fs.mkdtempSync(path.join(os.tmpdir(), "lvgljs-screenshot-baseline-"));
  const seen = new Set();

  try {
    for (const { base, src } of files) {
      if (seen.has(base)) {
        console.warn(`warning: skipping duplicate ${base}`);
        continue;
      }
      seen.add(base);
      fs.copyFileSync(src, path.join(stagingDir, base));
      console.log(`  ${base}`);
    }

    const manifest = {
      platform,
      label: label || null,
      commit: commit || null,
      branch: branch || null,
      run_id: run || null,
      filter: filter || null,
      source: path.relative(repoRoot, from).split("\\").join("/"),
      packaged_at: new Date().toISOString(),
      files: [...seen].sort(),
    };

    fs.writeFileSync(
      path.join(stagingDir, "manifest.json"),
      `${JSON.stringify(manifest, null, 2)}\n`,
      "utf8",
    );

    const outFile = out || defaultOutFile(platform, filter);
    createTarGz(stagingDir, outFile);

    console.log(`\nPackaged ${seen.size} PNG(s) + manifest.json`);
    console.log(`  ${path.relative(repoRoot, outFile)}`);
    return outFile;
  } finally {
    fs.rmSync(stagingDir, { recursive: true, force: true });
  }
}

async function packageAllPlatforms(opts, platforms) {
  fs.mkdirSync(opts.fromRoot, { recursive: true });

  const outputs = [];
  const skipped = [];
  console.log(`platforms from ${opts.workflow}: ${platforms.map((p) => p.platform).join(", ")}`);

  for (const entry of platforms) {
    const importDir = resolveImportDir(opts.fromRoot, entry);
    if (!importDir) {
      const message =
        `no screenshots for platform "${entry.platform}" under ${opts.fromRoot}\n` +
        `  expected: ${entry.artifact}/ or ${entry.platform}/`;
      if (opts.strict) {
        console.error(`error: ${message}`);
        process.exit(2);
      }
      console.warn(`warning: skipping ${entry.platform} (${message.split("\n")[0]})`);
      skipped.push(entry.platform);
      continue;
    }

    console.log(`\n[${entry.platform}] from ${path.relative(repoRoot, importDir)}`);
    const outFile = await packageOnePlatform({
      platform: entry.platform,
      from: importDir,
      filter: opts.filter,
      label: opts.label,
      commit: opts.commit,
      branch: opts.branch,
      run: opts.run,
      out: defaultOutFile(entry.platform, opts.filter),
    });
    outputs.push(outFile);
  }

  if (outputs.length === 0) {
    console.error(
      `error: no platforms packaged under ${opts.fromRoot}\n` +
        `  hint: pass --tag <git-tag> or --run <id> to download via gh, or:\n` +
        `        gh run download <run> -n lvgljs-test-screenshots -D ${path.relative(repoRoot, opts.fromRoot)}`,
    );
    process.exit(2);
  }

  if (skipped.length) {
    console.warn(`\nSkipped ${skipped.length} platform(s): ${skipped.join(", ")}`);
  }

  if (!opts.tag || opts.noRelease) {
    console.log("\nUpload to GitHub Releases (permanent, not checked into git):");
    console.log('  gh release create <tag> --title "Screenshot baseline"');
    console.log(
      `  gh release upload <tag> ${outputs.map((f) => path.relative(repoRoot, f)).join(" ")}`,
    );
  }

  return outputs;
}

async function cmdPackage(argv) {
  const opts = parsePackageArgs(argv);

  if (opts.help || (!opts.all && !opts.platform)) {
    usage();
    process.exit(opts.help && (opts.all || opts.platform) ? 0 : 2);
  }

  if (opts.all && opts.platform) {
    console.error("error: use either --all or --platform, not both");
    process.exit(2);
  }

  if (opts.tag || opts.run) {
    try {
      const { runId, commit } = ensureScreenshotImport({
        tag: opts.tag,
        run: opts.run,
        repo: opts.repo,
        workflow: opts.workflow,
        repoRoot,
        outDir: paths.import,
      });
      opts.fromRoot = paths.import;
      if (!opts.run) {
        opts.run = runId;
      }
      if (!opts.commit && commit) {
        opts.commit = commit;
      }
    } catch (err) {
      console.error(err && err.message ? err.message : err);
      process.exit(2);
    }
  }

  if (opts.all) {
    const platforms = listScreenshotPlatforms(repoRoot, opts.workflow);
    if (!opts.fromRoot) {
      opts.fromRoot = paths.import;
    }
    const outputs = await packageAllPlatforms(opts, platforms);
    maybePublishRelease(opts, outputs);
    return;
  }

  const known = listScreenshotPlatforms(repoRoot, opts.workflow).map((p) => p.platform);
  if (!known.includes(opts.platform)) {
    console.error(`error: unknown platform "${opts.platform}" (from ${opts.workflow}: ${known.join(", ")})`);
    process.exit(2);
  }

  console.log(`[${opts.platform}]`);
  const outFile = await packageOnePlatform({
    platform: opts.platform,
    from: opts.from,
    filter: opts.filter,
    label: opts.label,
    commit: opts.commit,
    branch: opts.branch,
    run: opts.run,
    out: opts.out,
  });

  maybePublishRelease(opts, [outFile]);
}

function maybePublishRelease(opts, outputs) {
  if (!opts.tag || opts.noRelease) {
    if (!opts.tag) {
      console.log("\nUpload to GitHub Releases (permanent, not checked into git):");
      console.log('  gh release create <tag> --title "Screenshot baseline"');
      console.log(
        `  gh release upload <tag> ${outputs.map((f) => path.relative(repoRoot, f)).join(" ")}`,
      );
    }
    return;
  }

  try {
    const assetNames = outputs.map((f) => path.basename(f));
    publishScreenshotBaseline({
      gitTag: opts.tag,
      repo: opts.repo,
      target: opts.commit || undefined,
      title: opts.label ? String(opts.label) : undefined,
      notes: buildReleaseNotes({
        gitTag: opts.tag,
        commit: opts.commit,
        run: opts.run,
        filter: opts.filter,
        assets: assetNames,
      }),
      assets: outputs,
    });
  } catch (err) {
    console.error(err && err.message ? err.message : err);
    process.exit(2);
  }
}

function cmdFetch(argv) {
  const opts = parseFetchArgs(argv);

  if (opts.help || !opts.release || (!opts.asset && !opts.platform)) {
    usage();
    process.exit(opts.help && opts.release && (opts.asset || opts.platform) ? 0 : 2);
  }

  if (!opts.asset) {
    console.error("error: could not resolve asset name (use --asset or --platform)");
    process.exit(2);
  }

  try {
    fetchBaselineFromRelease(opts);
  } catch (err) {
    console.error(err && err.message ? err.message : err);
    process.exit(2);
  }
}

async function main() {
  const { command, rest, help } = parseCommand(process.argv.slice(2));

  if (help || !command) {
    usage();
    process.exit(help ? 0 : 2);
  }

  if (command === "package") {
    await cmdPackage(rest);
    return;
  }

  if (command === "fetch") {
    cmdFetch(rest);
    return;
  }

  usage();
  process.exit(2);
}

main().catch((err) => {
  console.error(err && err.stack ? err.stack : err);
  process.exit(2);
});
