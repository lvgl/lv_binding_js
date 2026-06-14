import assert from "node:assert/strict";
import { describe, it } from "node:test";

import "../../lv.setup.spec";
import {
  LV_LABEL_LONG_MODE_MAP,
  LV_TEXT_ALIGN_MAP,
  LV_TEXT_DECOR_MAP,
} from "../../lv_types";
import { runPipe } from "../pipe.harness";
import { TextStyle } from "./text";

describe("TextStyle pipe", () => {
  it("pushes text enums and spacing", () => {
    const map = runPipe(TextStyle, {
      "text-color": "black",
      "letter-spacing": "1px",
      "line-spacing": 2,
      "text-overflow": "ellipsis",
      "text-align": "center",
      "text-decoration": "underline",
      "font-size": 16,
    });
    assert.equal(map.get("text-color"), 0);
    assert.equal(map.get("letter-spacing"), 1);
    assert.equal(map.get("line-spacing"), 2);
    assert.equal(map.get("text-overflow"), LV_LABEL_LONG_MODE_MAP.ellipsis);
    assert.equal(map.get("text-align"), LV_TEXT_ALIGN_MAP.center);
    assert.equal(map.get("text-decoration"), LV_TEXT_DECOR_MAP.underline);
    assert.equal(map.get("font-size"), 4);
  });

  it("rounds odd font-size up to even before lookup", () => {
    const map = runPipe(TextStyle, { "font-size": 15 });
    assert.equal(map.get("font-size"), 4);
  });

  it("skips font-size when not in built-in list after clamping", () => {
    const map = runPipe(TextStyle, { "font-size": 13.5 });
    assert.equal(map.has("font-size"), false);
  });

  it("still pushes other text props when font-size is omitted", () => {
    const map = runPipe(TextStyle, {
      "text-color": "red",
      "text-align": "left",
    });
    assert.equal(map.get("text-color"), 0xf44336);
    assert.equal(map.get("text-align"), LV_TEXT_ALIGN_MAP.left);
    assert.equal(map.has("font-size"), false);
  });

  it("omits invalid text-align values", () => {
    const map = runPipe(TextStyle, { "text-align": "justify" as "center" });
    assert.equal(map.has("text-align"), false);
  });

  it("clamps font-size to built-in list maximum", () => {
    const map = runPipe(TextStyle, { "font-size": 999 });
    assert.equal(map.get("font-size"), 20);
  });
});
