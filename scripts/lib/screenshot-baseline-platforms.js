/**
 * Read screenshot platform list from .github/workflows/build.yml.
 *
 * Platforms are the jobs listed in collect-screenshots.needs. Artifact names
 * are read from each job's upload-artifact step (lvgljs-test-screenshots-*).
 */

const fs = require("fs");
const path = require("path");
const yaml = require("yaml");

const DEFAULT_WORKFLOW = path.join(".github", "workflows", "build.yml");
const COLLECT_JOB = "collect-screenshots";
const SCREENSHOT_ARTIFACT_RE = /^lvgljs-test-screenshots-/;

function baselineAssetName(platform, filter) {
  const suffix = filter || "all";
  return `${platform}-${suffix}.tar.gz`;
}

function normalizeNeeds(needs) {
  if (!needs) {
    return [];
  }
  if (Array.isArray(needs)) {
    return needs.map(String);
  }
  return [String(needs)];
}

function findScreenshotArtifactName(job) {
  const steps = job && job.steps;
  if (!Array.isArray(steps)) {
    return null;
  }

  for (const step of steps) {
    const uses = step && step.uses;
    if (!uses || !String(uses).startsWith("actions/upload-artifact")) {
      continue;
    }
    const name = step.with && step.with.name;
    if (typeof name === "string" && SCREENSHOT_ARTIFACT_RE.test(name)) {
      return name;
    }
  }

  return null;
}

function parseBuildWorkflow(workflowPath) {
  const text = fs.readFileSync(workflowPath, "utf8");
  const workflow = yaml.parse(text);
  const jobs = workflow && workflow.jobs;

  if (!jobs || typeof jobs !== "object") {
    return [];
  }

  const collectJob = jobs[COLLECT_JOB];
  const collectNeeds = normalizeNeeds(collectJob && collectJob.needs);
  if (collectNeeds.length === 0) {
    return [];
  }

  return collectNeeds.map((jobId) => ({
    job: jobId,
    platform: jobId,
    artifact: findScreenshotArtifactName(jobs[jobId]) || `lvgljs-test-screenshots-${jobId}`,
  }));
}

function resolveWorkflowPath(repoRoot, workflowRel) {
  const workflowPath = path.resolve(repoRoot, workflowRel || DEFAULT_WORKFLOW);
  if (!fs.existsSync(workflowPath)) {
    throw new Error(`workflow not found: ${workflowPath}`);
  }
  return workflowPath;
}

function listScreenshotPlatforms(repoRoot, workflowRel) {
  const workflowPath = resolveWorkflowPath(repoRoot, workflowRel);
  const platforms = parseBuildWorkflow(workflowPath);
  if (platforms.length === 0) {
    throw new Error(
      `no collect-screenshots.needs jobs found in ${path.relative(repoRoot, workflowPath)}`,
    );
  }
  return platforms;
}

function resolveImportDir(fromRoot, platformEntry) {
  const candidates = [
    path.join(fromRoot, platformEntry.artifact),
    path.join(fromRoot, platformEntry.platform),
    path.join(fromRoot, platformEntry.job),
  ];

  for (const dir of candidates) {
    if (fs.existsSync(dir) && fs.statSync(dir).isDirectory()) {
      return dir;
    }
  }

  return null;
}

module.exports = {
  COLLECT_JOB,
  DEFAULT_WORKFLOW,
  baselineAssetName,
  parseBuildWorkflow,
  listScreenshotPlatforms,
  resolveImportDir,
};
