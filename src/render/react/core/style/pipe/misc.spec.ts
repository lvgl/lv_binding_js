import assert from "node:assert/strict";
import { describe, it } from "node:test";

import "../../lv.setup.spec";
import { runPipe } from "../pipe.harness";
import { MiscStyle } from "./misc";

describe("MiscStyle pipe", () => {
  it("pushes style-transition-time as ms", () => {
    const map = runPipe(MiscStyle, { "style-transition-time": "500ms" });
    assert.equal(map.get("style-transition-time"), 500);
  });

  it("pushes recolor only for Image", () => {
    const base = runPipe(MiscStyle, { recolor: "red" });
    const image = runPipe(MiscStyle, { recolor: "red" }, "Image");
    assert.equal(base.has("recolor"), false);
    assert.equal(image.get("recolor"), 0xf44336);
  });

  it("parses style-transition-time in seconds", () => {
    const map = runPipe(MiscStyle, { "style-transition-time": "1.5s" });
    assert.equal(map.get("style-transition-time"), 1500);
  });

  it("pushes style-transition-time 0", () => {
    const map = runPipe(MiscStyle, { "style-transition-time": 0 });
    assert.equal(map.get("style-transition-time"), 0);
  });

  it("does not push recolor for non-Image components", () => {
    const map = runPipe(MiscStyle, { recolor: "blue" }, "Arc");
    assert.equal(map.has("recolor"), false);
  });
});
