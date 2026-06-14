import assert from "node:assert/strict";
import { describe, it } from "node:test";

import "../../lv.setup.spec";
import { runPipe } from "../pipe.harness";
import { ArcStyle } from "./arc";

describe("ArcStyle pipe", () => {
  it("pushes arc width, color, and rounded flag", () => {
    const map = runPipe(ArcStyle, {
      "arc-width": "6px",
      "arc-color": "blue",
      "arc-rounded": true,
    });
    assert.equal(map.get("arc-width"), 6);
    assert.equal(map.get("arc-color"), 0x2196f3);
    assert.equal(map.get("arc-rounded"), 1);
  });

  it("rejects negative arc-width", () => {
    const map = runPipe(ArcStyle, { "arc-width": "-1px" });
    assert.equal(map.has("arc-width"), false);
  });

  it("defaults arc-rounded to 0 when omitted", () => {
    const map = runPipe(ArcStyle, { "arc-color": "red" });
    assert.equal(map.get("arc-rounded"), 0);
    assert.equal(map.get("arc-color"), 0xf44336);
  });

  it("pushes only arc-width when color is omitted", () => {
    const map = runPipe(ArcStyle, { "arc-width": 4 });
    assert.equal(map.get("arc-width"), 4);
    assert.equal(map.has("arc-color"), false);
  });
});
