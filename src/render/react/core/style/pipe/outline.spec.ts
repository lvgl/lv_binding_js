import assert from "node:assert/strict";
import { describe, it } from "node:test";

import "../../lv.setup.spec";
import { LV_SIZE_CONTENT } from "../../lv_conf_macros";
import { runPipe } from "../pipe.harness";
import { OutlineStyle } from "./outline";

describe("OutlineStyle pipe", () => {
  it("pushes outline width, color, and padding coord", () => {
    const map = runPipe(OutlineStyle, {
      "outline-width": "4px",
      "outline-color": "#ff0000",
      "outline-padding": "auto",
    });
    assert.equal(map.get("outline-width"), 4);
    assert.equal(map.get("outline-color"), 0xff0000);
    assert.equal(map.get("outline-padding"), LV_SIZE_CONTENT);
  });

  it("pushes numeric outline-padding in px", () => {
    const map = runPipe(OutlineStyle, { "outline-padding": "12px" });
    assert.equal(map.get("outline-padding"), 12);
  });

  it("rejects negative outline-width", () => {
    const map = runPipe(OutlineStyle, { "outline-width": -4 });
    assert.equal(map.has("outline-width"), false);
  });

  it("pushes percent outline-padding", () => {
    const map = runPipe(OutlineStyle, { "outline-padding": "50%" });
    assert.equal(typeof map.get("outline-padding"), "number");
  });
});
