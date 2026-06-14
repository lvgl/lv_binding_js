/**
 * Create/update a GitHub Release for packaged screenshot baselines.
 *
 * Uses the passed git tag as the release tag (e.g. v8.2.0). When that tag
 * already exists, gh attaches assets to it without creating a new tag.
 */

const { spawnSync } = require("child_process");

const BASELINE_RELEASE_PREFIX = "screenshot-baseline/";

function baselineReleaseTag(gitTag) {
  if (!gitTag) {
    return "";
  }
  if (gitTag.startsWith(BASELINE_RELEASE_PREFIX)) {
    return gitTag.slice(BASELINE_RELEASE_PREFIX.length);
  }
  return gitTag;
}

function ghRun(args, options = {}) {
  const result = spawnSync("gh", args, { stdio: "inherit", ...options });
  if (result.error) {
    throw result.error;
  }
  return result.status ?? 1;
}

function ghReleaseExists(releaseTag, repo) {
  const args = ["release", "view", releaseTag];
  if (repo) {
    args.push("-R", repo);
  }
  const result = spawnSync("gh", args, { stdio: "ignore" });
  return result.status === 0;
}

function ghReleaseEdit({ releaseTag, repo, title, notes }) {
  const editArgs = ["release", "edit", releaseTag];
  if (repo) {
    editArgs.push("-R", repo);
  }
  if (title) {
    editArgs.push("--title", title);
  }
  if (notes) {
    editArgs.push("--notes", notes);
  }
  if (!title && !notes) {
    return 0;
  }
  console.log(`\nrelease: gh ${editArgs.join(" ")}`);
  const code = ghRun(editArgs);
  if (code !== 0) {
    throw new Error(`gh release edit failed (exit ${code})`);
  }
  return code;
}

function buildReleaseNotes({ gitTag, commit, run, filter, assets }) {
  const lines = [
    `Screenshot baseline from git tag \`${gitTag}\`.`,
    "",
  ];
  if (commit) {
    lines.push(`- commit: \`${commit}\``);
  }
  if (run) {
    lines.push(`- workflow run: ${run}`);
  }
  if (filter) {
    lines.push(`- filter: \`${filter}\``);
  }
  lines.push(`- assets: ${assets.map((f) => `\`${f}\``).join(", ")}`);
  return lines.join("\n");
}

function publishScreenshotBaseline({
  gitTag,
  repo,
  title,
  notes,
  assets,
  target,
}) {
  const releaseTag = baselineReleaseTag(gitTag);
  if (!releaseTag) {
    throw new Error("git tag is required to publish a screenshot baseline release");
  }
  if (!assets.length) {
    throw new Error("no packaged assets to upload");
  }

  const releaseTitle = title || `Screenshot baseline ${releaseTag}`;

  if (!ghReleaseExists(releaseTag, repo)) {
    const createArgs = ["release", "create", releaseTag, "--title", releaseTitle];
    if (repo) {
      createArgs.push("-R", repo);
    }
    if (target) {
      createArgs.push("--target", target);
    }
    if (notes) {
      createArgs.push("--notes", notes);
    }
    console.log(`\nrelease: gh ${createArgs.join(" ")}`);
    const code = ghRun(createArgs);
    if (code !== 0) {
      throw new Error(`gh release create failed (exit ${code})`);
    }
  } else {
    console.log(`\nrelease exists: ${releaseTag}`);
    ghReleaseEdit({ releaseTag, repo, title: releaseTitle, notes });
  }

  const uploadArgs = ["release", "upload", releaseTag, "--clobber", ...assets];
  if (repo) {
    uploadArgs.push("-R", repo);
  }
  console.log(`upload: gh release upload ${releaseTag} (${assets.length} file(s))`);
  const uploadCode = ghRun(uploadArgs);
  if (uploadCode !== 0) {
    throw new Error(`gh release upload failed (exit ${uploadCode})`);
  }

  console.log(`\nPublished: ${releaseTag}`);
  return releaseTag;
}

module.exports = {
  BASELINE_RELEASE_PREFIX,
  baselineReleaseTag,
  buildReleaseNotes,
  publishScreenshotBaseline,
};
