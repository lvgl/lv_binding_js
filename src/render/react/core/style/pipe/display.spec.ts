import assert from "node:assert/strict";
import { describe, it } from "node:test";

import "../../lv.setup.spec";
import { CSS_DISPLAY_MAP } from "../type";
import { runPipe } from "../pipe.harness";
import { DisplayStyle } from "./display";

describe("DisplayStyle pipe", () => {
  it("pushes validated display keywords", () => {
    const map = runPipe(DisplayStyle, { display: "grid" });
    assert.equal(map.get("display"), CSS_DISPLAY_MAP.grid);
  });

  it("omits unknown display values", () => {
    const map = runPipe(DisplayStyle, { display: "table" as "grid" });
    assert.equal(map.has("display"), false);
  });

  it("pushes all supported display keywords", () => {
    for (const keyword of ["flex", "block", "inline", "none"] as const) {
      const map = runPipe(DisplayStyle, { display: keyword });
      assert.equal(map.get("display"), CSS_DISPLAY_MAP[keyword]);
    }
  });
});
