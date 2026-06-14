/**
 * Download combined CI screenshot artifacts (lvgljs-test-screenshots) via gh.
 * Used by package:screenshots:baseline --tag / --run.
 */

const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");
const { DEFAULT_WORKFLOW } = require("./screenshot-baseline-platforms");

const COMBINED_ARTIFACT = "lvgljs-test-screenshots";

function workflowFileForGh(workflowRel) {
  return path.basename(workflowRel || DEFAULT_WORKFLOW);
}

function ghJson(args) {
  const result = spawnSync("gh", args, { encoding: "utf8" });
  if (result.error) {
    throw result.error;
  }
  if (result.status !== 0) {
    const err = (result.stderr || result.stdout || "").trim();
    throw new Error(err || `gh ${args.join(" ")} failed with exit ${result.status}`);
  }
  return JSON.parse(result.stdout || "[]");
}

function gitResolveTagCommit(tag, repoRoot) {
  const candidates = [`${tag}^{commit}`, `refs/tags/${tag}^{commit}`];
  for (const ref of candidates) {
    const result = spawnSync("git", ["rev-parse", ref], {
      cwd: repoRoot,
      encoding: "utf8",
    });
    if (result.status === 0) {
      return result.stdout.trim();
    }
  }
  throw new Error(`could not resolve git tag "${tag}" (try: git fetch --tags)`);
}

function pickWorkflowRun(runs) {
  if (!runs.length) {
    return null;
  }
  const successful = runs.filter((r) => r.conclusion === "success");
  const pool = successful.length
    ? successful
    : runs.filter((r) => r.status === "completed");
  if (!pool.length) {
    return null;
  }
  return pool.sort((a, b) => b.databaseId - a.databaseId)[0];
}

function resolveRunIdForCommit({ repo, workflow, commit }) {
  const workflowFile = workflowFileForGh(workflow);
  const args = [
    "run",
    "list",
    "--workflow",
    workflowFile,
    "--commit",
    commit,
    "--json",
    "databaseId,conclusion,status,headSha,event",
    "-L",
    "20",
  ];
  if (repo) {
    args.push("-R", repo);
  }

  const runs = ghJson(args);
  const picked = pickWorkflowRun(runs);
  if (!picked) {
    throw new Error(
      `no completed workflow run for commit ${commit.slice(0, 7)} (${workflowFile})`,
    );
  }
  return String(picked.databaseId);
}

function resolveRunIdForTag({ tag, repo, workflow, repoRoot }) {
  const commit = gitResolveTagCommit(tag, repoRoot);
  const runId = resolveRunIdForCommit({ repo, workflow, commit });
  return { commit, runId };
}

function downloadScreenshotImport({ runId, repo, outDir }) {
  fs.rmSync(outDir, { recursive: true, force: true });
  fs.mkdirSync(outDir, { recursive: true });

  const args = [
    "run",
    "download",
    String(runId),
    "-n",
    COMBINED_ARTIFACT,
    "-D",
    outDir,
  ];
  if (repo) {
    args.push("-R", repo);
  }

  console.log(`download: gh ${args.join(" ")}`);
  const result = spawnSync("gh", args, { stdio: "inherit" });
  if (result.error) {
    throw result.error;
  }
  if (result.status !== 0) {
    throw new Error(`gh run download failed (exit ${result.status})`);
  }

  if (!fs.existsSync(outDir) || fs.readdirSync(outDir).length === 0) {
    throw new Error(
      `artifact "${COMBINED_ARTIFACT}" not found or empty for run ${runId}`,
    );
  }
}

/**
 * Resolve run (from --run or --tag) and download combined artifacts to outDir.
 * Returns { runId, commit } for manifest metadata.
 */
function ensureScreenshotImport({ tag, run, repo, workflow, repoRoot, outDir }) {
  let runId = run || "";
  let commit = "";

  if (tag) {
    const resolved = resolveRunIdForTag({ tag, repo, workflow, repoRoot });
    commit = resolved.commit;
    if (!runId) {
      runId = resolved.runId;
    }
    console.log(`tag ${tag} -> commit ${commit.slice(0, 7)} (run ${runId})`);
  } else if (!runId) {
    throw new Error("either --tag or --run is required to download import artifacts");
  }

  downloadScreenshotImport({ runId, repo, outDir });
  return { runId, commit };
}

module.exports = {
  COMBINED_ARTIFACT,
  ensureScreenshotImport,
  downloadScreenshotImport,
  resolveRunIdForTag,
  resolveRunIdForCommit,
  gitResolveTagCommit,
};
