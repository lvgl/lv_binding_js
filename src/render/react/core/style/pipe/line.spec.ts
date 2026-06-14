import assert from "node:assert/strict";
import { describe, it } from "node:test";

import "../../lv.setup.spec";
import { runPipe } from "../pipe.harness";
import { LineStyle } from "./line";

describe("LineStyle pipe", () => {
  it("pushes line width, color, and rounded flag", () => {
    const map = runPipe(LineStyle, {
      "line-width": 3,
      "line-color": "green",
      "line-rounded": false,
    });
    assert.equal(map.get("line-width"), 3);
    assert.equal(map.get("line-color"), 0x4caf50);
    assert.equal(map.get("line-rounded"), 0);
  });

  it("rejects negative line-width", () => {
    const map = runPipe(LineStyle, { "line-width": -1 });
    assert.equal(map.has("line-width"), false);
  });

  it("defaults line-rounded to 0 when omitted", () => {
    const map = runPipe(LineStyle, { "line-color": "white" });
    assert.equal(map.get("line-rounded"), 0);
    assert.equal(map.get("line-color"), 0xffffff);
  });
});
