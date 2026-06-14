import assert from "node:assert/strict";
import { describe, it } from "node:test";

import "../../lv.setup.spec";
import { LV_GRID_CONTENT, LV_GRID_FR } from "../../lv_conf_macros";
import { LV_GRID_ALIGN_MAP } from "../../lv_types";
import { runPipe } from "../pipe.harness";
import { GridStyle } from "./grid";

describe("GridStyle pipe", () => {
  it("no-ops when display is not grid", () => {
    const map = runPipe(GridStyle, { display: "flex" });
    assert.equal(map.size, 0);
  });

  it("pushes grid template, display, and default grid-align", () => {
    const map = runPipe(GridStyle, {
      display: "grid",
      "grid-template-columns": "100px 1fr auto",
      "grid-template-rows": "50px",
    });
    assert.equal(map.get("display"), "grid");
    assert.deepEqual(map.get("grid-template"), [
      [100, LV_GRID_FR(1), LV_GRID_CONTENT],
      [50],
    ]);
    assert.deepEqual(map.get("grid-align"), [
      LV_GRID_ALIGN_MAP.start,
      LV_GRID_ALIGN_MAP.start,
    ]);
  });

  it("pushes grid-child tuple with defaults and parsed span", () => {
    const map = runPipe(GridStyle, {
      "grid-child": true,
      "grid-column-pos": "1",
      "grid-row-pos": 0,
      "grid-column-span": "2",
    });
    assert.deepEqual(map.get("grid-child"), [
      LV_GRID_ALIGN_MAP.start,
      1,
      2,
      LV_GRID_ALIGN_MAP.start,
      0,
      1,
    ]);
  });

  it("skips grid-child when column or row pos is invalid", () => {
    const map = runPipe(GridStyle, {
      "grid-child": true,
      "grid-column-pos": -1,
      "grid-row-pos": 0,
    });
    assert.equal(map.has("grid-child"), false);
  });

  it("no-ops grid container when template columns or rows are missing", () => {
    const colsOnly = runPipe(GridStyle, {
      display: "grid",
      "grid-template-columns": "100px",
    });
    const rowsOnly = runPipe(GridStyle, {
      display: "grid",
      "grid-template-rows": "50px",
    });
    assert.equal(colsOnly.size, 0);
    assert.equal(rowsOnly.size, 0);
  });

  it("pushes custom grid-align from justify-content and align-items", () => {
    const map = runPipe(GridStyle, {
      display: "grid",
      "grid-template-columns": "1fr",
      "grid-template-rows": "1fr",
      "justify-content": "center",
      "align-items": "end",
    });
    assert.deepEqual(map.get("grid-align"), [
      LV_GRID_ALIGN_MAP.center,
      LV_GRID_ALIGN_MAP.end,
    ]);
  });

  it("defaults grid-row-span to 1 and honors align-self / justify-self", () => {
    const map = runPipe(GridStyle, {
      "grid-child": true,
      "grid-column-pos": 0,
      "grid-row-pos": 1,
      "justify-self": "center",
      "align-self": "end",
    });
    const child = map.get("grid-child") as number[];
    assert.equal(child[2], 1);
    assert.equal(child[5], 1);
    assert.equal(child[0], LV_GRID_ALIGN_MAP.center);
    assert.equal(child[3], LV_GRID_ALIGN_MAP.end);
  });
});
