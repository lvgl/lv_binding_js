import assert from "node:assert/strict";
import { describe, it } from "node:test";

import "../../lv.setup.spec";
import { LV_BORDER_SIDE_MAP } from "../type";
import { runPipe } from "../pipe.harness";
import { BorderStyle } from "./border";

describe("BorderStyle pipe", () => {
  it("pushes radius, width, color, and border-side enum", () => {
    const map = runPipe(BorderStyle, {
      "border-radius": "8px",
      "border-width": 2,
      "border-color": "red",
      "border-side": "full",
    });
    assert.equal(map.get("border-radius"), 8);
    assert.equal(map.get("border-width"), 2);
    assert.equal(map.get("border-color"), 0xf44336);
    assert.equal(map.get("border-side"), LV_BORDER_SIDE_MAP.full);
  });

  it("maps composite border-side keywords", () => {
    const map = runPipe(BorderStyle, { "border-side": "top-left" });
    assert.equal(map.get("border-side"), LV_BORDER_SIDE_MAP["top-left"]);
  });

  it("rejects negative border-radius and border-width", () => {
    const map = runPipe(BorderStyle, {
      "border-radius": "-1px",
      "border-width": -2,
    });
    assert.equal(map.has("border-radius"), false);
    assert.equal(map.has("border-width"), false);
  });

  it("omits unknown border-side values", () => {
    const map = runPipe(BorderStyle, {
      "border-side": "diagonal" as "full",
    });
    assert.equal(map.has("border-side"), false);
  });

  it("pushes only provided border props", () => {
    const map = runPipe(BorderStyle, { "border-color": "#00ff00" });
    assert.equal(map.get("border-color"), 0x00ff00);
    assert.equal(map.has("border-radius"), false);
    assert.equal(map.has("border-width"), false);
  });
});
