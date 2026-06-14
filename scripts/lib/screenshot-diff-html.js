/**
 * Write a side-by-side HTML report for screenshot pixel diffs.
 */

const fs = require("fs");
const path = require("path");

function relFromHtml(htmlDir, filePath) {
  if (!filePath) {
    return "";
  }
  return path.relative(htmlDir, filePath).split(path.sep).join("/");
}

function escapeHtml(text) {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function imgCell(src, alt) {
  if (!src) {
    return '<td class="missing">-</td>';
  }
  return `<td><img src="${escapeHtml(src)}" alt="${escapeHtml(alt)}" loading="lazy" /></td>`;
}

/**
 * @param {object} params
 * @param {string} params.htmlFile  e.g. _screenshots/html/index.html
 * @param {string} params.baselineDir
 * @param {string} params.actualDir
 * @param {string} params.diffDir
 * @param {number} params.threshold
 * @param {string} params.filter
 * @param {object[]} params.results
 */
function writeScreenshotDiffHtml({
  htmlFile,
  baselineDir,
  actualDir,
  diffDir,
  threshold,
  filter,
  results,
}) {
  const htmlDir = path.dirname(htmlFile);
  fs.mkdirSync(htmlDir, { recursive: true });

  const passed = results.filter((r) => r.ok).length;
  const failed = results.length - passed;
  const generatedAt = new Date().toISOString();

  const rows = results
    .map((r) => {
      const status = r.ok ? "pass" : "fail";
      const baselineSrc = relFromHtml(htmlDir, r.baselinePath);
      const actualSrc = relFromHtml(htmlDir, r.actualPath);
      const diffSrc = relFromHtml(htmlDir, r.diffPath);
      return `    <tr class="${status}">
      <td class="name">${escapeHtml(r.name)}</td>
      <td class="status ${status}">${r.ok ? "PASS" : "FAIL"}</td>
      <td class="reason">${escapeHtml(r.reason || "")}</td>
      ${imgCell(baselineSrc, `${r.name} baseline`)}
      ${imgCell(actualSrc, `${r.name} actual`)}
      ${imgCell(diffSrc, `${r.name} diff`)}
    </tr>`;
    })
    .join("\n");

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Screenshot diff</title>
  <style>
    :root { color-scheme: light dark; }
    body { font-family: system-ui, sans-serif; margin: 1.5rem; line-height: 1.4; }
    h1 { margin: 0 0 0.5rem; font-size: 1.4rem; }
    .meta { color: #666; margin-bottom: 1rem; font-size: 0.9rem; }
    .summary { margin-bottom: 1rem; }
    .summary .fail { color: #c00; font-weight: 600; }
    .summary .pass { color: #080; font-weight: 600; }
    .toolbar { margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap; }
    .toolbar label { font-size: 0.9rem; font-weight: 600; }
    .toolbar button {
      font: inherit;
      padding: 0.35rem 0.75rem;
      border: 1px solid #ccc;
      border-radius: 4px;
      background: #f4f4f4;
      cursor: pointer;
    }
    .toolbar button:hover { background: #e8e8e8; }
    .toolbar button.active { background: #333; color: #fff; border-color: #333; }
    .visible-count { font-size: 0.9rem; color: #666; }
    table { border-collapse: collapse; width: 100%; }
    th, td { border: 1px solid #ccc; padding: 0.5rem; vertical-align: top; }
    th { background: #f4f4f4; text-align: left; }
    td.name { font-family: ui-monospace, monospace; font-size: 0.85rem; white-space: nowrap; }
    td.status { font-weight: 600; white-space: nowrap; }
    td.status.pass { color: #080; }
    td.status.fail { color: #c00; }
    td.reason { font-size: 0.85rem; max-width: 22rem; }
    td.missing { color: #999; text-align: center; }
    img { max-width: 320px; max-height: 240px; height: auto; display: block; background: #eee; }
    tr.fail { background: #fff8f8; }
    tr.filtered-out { display: none; }
  </style>
</head>
<body>
  <h1>Screenshot diff</h1>
  <p class="meta">Generated ${escapeHtml(generatedAt)}</p>
  <p class="summary">
    <span class="${failed ? "fail" : "pass"}">${passed}/${results.length} passed</span>
    ${failed ? ` &mdash; <span class="fail">${failed} failed</span>` : ""}
  </p>
  <div class="toolbar">
    <label for="status-filter">Show:</label>
    <button type="button" class="filter-btn" data-filter="all">All (${results.length})</button>
    <button type="button" class="filter-btn" data-filter="fail">Failed (${failed})</button>
    <button type="button" class="filter-btn" data-filter="pass">Passed (${passed})</button>
    <span class="visible-count" id="visible-count"></span>
  </div>
  <p class="meta">
    baseline: ${escapeHtml(baselineDir)}<br />
    actual: ${escapeHtml(actualDir)}<br />
    diff: ${escapeHtml(diffDir)}<br />
    threshold: ${threshold}${filter ? `<br />filter: ${escapeHtml(filter)}` : ""}<br />
    details: screen % = differing pixels / full 1024x600 frame;
    content % = differing pixels / baseline non-white pixels (widget area)
  </p>
  <table>
    <thead>
      <tr>
        <th>File</th>
        <th>Status</th>
        <th>Details</th>
        <th>Baseline</th>
        <th>Actual</th>
        <th>Diff</th>
      </tr>
    </thead>
    <tbody>
${rows}
    </tbody>
  </table>
  <script>
    (function () {
      const rows = Array.from(document.querySelectorAll("tbody tr"));
      const buttons = Array.from(document.querySelectorAll(".filter-btn"));
      const countEl = document.getElementById("visible-count");
      const defaultFilter = ${failed > 0 ? '"fail"' : '"all"'};

      function applyFilter(mode) {
        let visible = 0;
        for (const row of rows) {
          const show =
            mode === "all" ||
            (mode === "pass" && row.classList.contains("pass")) ||
            (mode === "fail" && row.classList.contains("fail"));
          row.classList.toggle("filtered-out", !show);
          if (show) visible++;
        }
        for (const btn of buttons) {
          btn.classList.toggle("active", btn.dataset.filter === mode);
        }
        countEl.textContent = visible + " shown";
      }

      for (const btn of buttons) {
        btn.addEventListener("click", () => applyFilter(btn.dataset.filter));
      }
      applyFilter(defaultFilter);
    })();
  </script>
</body>
</html>
`;

  fs.writeFileSync(htmlFile, html, "utf8");
  return htmlFile;
}

module.exports = { writeScreenshotDiffHtml };
