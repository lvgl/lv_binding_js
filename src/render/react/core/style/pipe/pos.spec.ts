import assert from "node:assert/strict";
import { describe, it } from "node:test";

import "../../lv.setup.spec";
import { lv_pct } from "../../lv_conf_macros";
import { CSS_POSITION_MAP } from "../type";
import { runPipe } from "../pipe.harness";
import { PosStyle } from "./pos";

describe("PosStyle pipe", () => {
  it("pushes coord lengths and position enum", () => {
    const map = runPipe(PosStyle, {
      width: "100px",
      height: "50%",
      left: 10,
      position: "absolute",
    });
    assert.equal(map.get("width"), 100);
    assert.equal(map.get("height"), lv_pct(50));
    assert.equal(map.get("left"), 10);
    assert.equal(map.get("position"), CSS_POSITION_MAP.absolute);
  });

  it("rejects negative coords", () => {
    const map = runPipe(PosStyle, { width: -1, top: "-5px" });
    assert.equal(map.has("width"), false);
    assert.equal(map.has("top"), false);
  });

  it("pushes absolute and fixed position enums", () => {
    const absolute = runPipe(PosStyle, { position: "absolute" });
    const fixed = runPipe(PosStyle, { position: "fixed" });
    assert.equal(absolute.get("position"), CSS_POSITION_MAP.absolute);
    assert.equal(fixed.get("position"), CSS_POSITION_MAP.fixed);
  });

  it("pushes max/min dimensions and spacing coords", () => {
    const map = runPipe(PosStyle, {
      "max-width": "200px",
      "min-height": 10,
      "row-spacing": "4px",
      "column-spacing": 8,
    });
    assert.equal(map.get("max-width"), 200);
    assert.equal(map.get("min-height"), 10);
    assert.equal(map.get("row-spacing"), 4);
    assert.equal(map.get("column-spacing"), 8);
  });

  it("omits unknown position values", () => {
    const map = runPipe(PosStyle, { position: "sticky" as "absolute" });
    assert.equal(map.has("position"), false);
  });
});
