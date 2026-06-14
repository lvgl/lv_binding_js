import assert from "node:assert/strict";
import { describe, it } from "node:test";

import "../../lv.setup.spec";
import { runPipe } from "../pipe.harness";
import { ShadowStyle } from "./shadow";

describe("ShadowStyle pipe", () => {
  it("pushes shadow geometry and color", () => {
    const map = runPipe(ShadowStyle, {
      "shadow-width": "4px",
      "shadow-color": "#112233",
      "shadow-offset-x": -2,
      "shadow-offset-y": "3px",
      "shadow-spread": 1,
    });
    assert.equal(map.get("shadow-width"), 4);
    assert.equal(map.get("shadow-color"), 0x112233);
    assert.equal(map.get("shadow-offset-x"), -2);
    assert.equal(map.get("shadow-offset-y"), 3);
    assert.equal(map.get("shadow-spread"), 1);
  });

  it("rejects negative shadow-width and spread", () => {
    const map = runPipe(ShadowStyle, {
      "shadow-width": -1,
      "shadow-spread": "-2px",
    });
    assert.equal(map.has("shadow-width"), false);
    assert.equal(map.has("shadow-spread"), false);
  });

  it("pushes only provided shadow props", () => {
    const map = runPipe(ShadowStyle, { "shadow-color": "black" });
    assert.equal(map.get("shadow-color"), 0);
    assert.equal(map.has("shadow-width"), false);
    assert.equal(map.has("shadow-offset-x"), false);
  });
});
