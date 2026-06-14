import assert from "node:assert/strict";
import { describe, it } from "node:test";

import "../../lv.setup.spec";
import { runPipe } from "../pipe.harness";
import { OpacityStyle } from "./opacity";

describe("OpacityStyle pipe", () => {
  it("maps opacity to style opacity by default", () => {
    const map = runPipe(OpacityStyle, { opacity: 0.5 });
    assert.equal(map.get("opacity"), 127);
    assert.equal(map.has("img-opacity"), false);
  });

  it("maps opacity to img-opacity for Image", () => {
    const map = runPipe(OpacityStyle, { opacity: 1 }, "Image");
    assert.equal(map.get("img-opacity"), 255);
    assert.equal(map.has("opacity"), false);
    assert.equal(map.has("recolor-opacity"), false);
  });

  it("pushes arc-opacity only for Arc", () => {
    const base = runPipe(OpacityStyle, { "arc-opacity": 0.5 });
    const arc = runPipe(OpacityStyle, { "arc-opacity": 0.5 }, "Arc");
    assert.equal(base.has("arc-opacity"), false);
    assert.equal(arc.get("arc-opacity"), 127);
  });

  it("pushes component opacity channels via pushStyle", () => {
    const map = runPipe(OpacityStyle, {
      "background-opacity": 0.5,
      "border-opacity": "1",
      "shadow-opacity": 0,
    });
    assert.equal(map.get("background-opacity"), 127);
    assert.equal(map.get("border-opacity"), 255);
    assert.equal(map.get("shadow-opacity"), 0);
  });

  it("pushes outline-opacity via pushStyle", () => {
    const map = runPipe(OpacityStyle, { "outline-opacity": 0.25 });
    assert.equal(map.get("outline-opacity"), 63);
  });

  it("pushes recolor-opacity only for Image when set", () => {
    const base = runPipe(OpacityStyle, { "recolor-opacity": 0.5 });
    const image = runPipe(OpacityStyle, { "recolor-opacity": 0.5 }, "Image");
    assert.equal(base.has("recolor-opacity"), false);
    assert.equal(image.get("recolor-opacity"), 127);
  });

  it("omits opacity when value is undefined", () => {
    const map = runPipe(OpacityStyle, {});
    assert.equal(map.has("opacity"), false);
    assert.equal(map.has("img-opacity"), false);
  });

  it("maps opacity values above 1 to LV_OPA_COVER", () => {
    const map = runPipe(OpacityStyle, { opacity: 2 });
    assert.equal(map.get("opacity"), 255);
  });
});
