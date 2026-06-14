import assert from "node:assert/strict";
import { describe, it } from "node:test";

import "../../lv.setup.spec";
import { LV_GRAD_DIR_MAP } from "../../lv_types";
import { runPipe } from "../pipe.harness";
import { BackgroundStyle } from "./background";

describe("BackgroundStyle pipe", () => {
  it("pushes background colors and gradient direction enum", () => {
    const map = runPipe(BackgroundStyle, {
      "background-color": "white",
      "background-grad-color": "#000000",
      "background-grad-color-dir": "vertical",
    });
    assert.equal(map.get("background-color"), 0xffffff);
    assert.equal(map.get("background-grad-color"), 0);
    assert.equal(
      map.get("background-grad-color-dir"),
      LV_GRAD_DIR_MAP.vertical,
    );
  });

  it("pushes horizontal and none gradient directions", () => {
    const horizontal = runPipe(BackgroundStyle, {
      "background-grad-color-dir": "horizontal",
    });
    const none = runPipe(BackgroundStyle, {
      "background-grad-color-dir": "none",
    });
    assert.equal(
      horizontal.get("background-grad-color-dir"),
      LV_GRAD_DIR_MAP.horizontal,
    );
    assert.equal(
      none.get("background-grad-color-dir"),
      LV_GRAD_DIR_MAP.none,
    );
  });

  it("omits unknown gradient direction", () => {
    const map = runPipe(BackgroundStyle, {
      "background-grad-color-dir": "diagonal" as "vertical",
    });
    assert.equal(map.has("background-grad-color-dir"), false);
  });

  it("pushes background-color without gradient props", () => {
    const map = runPipe(BackgroundStyle, { "background-color": "#abcdef" });
    assert.equal(map.get("background-color"), 0xabcdef);
    assert.equal(map.has("background-grad-color"), false);
  });
});
