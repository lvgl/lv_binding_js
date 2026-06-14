import * as lv_conf from "../../lv_conf";
import { LV_FLEX_ALIGN_MAP, LV_FLEX_FLOW_MAP } from "../../lv_types";
import { runPipe } from "../pipe.harness";
import "../../lv.setup.spec";
import { FlexStyle } from "./flex";
import assert from "node:assert/strict";
import { describe, it } from "node:test";

describe("FlexStyle pipe", () => {
  it("no-ops when display is not flex", () => {
    const map = runPipe(FlexStyle, { display: "grid" });
    assert.equal(map.size, 0);
  });

  it("pushes default flex-flow for row nowrap", () => {
    const map = runPipe(FlexStyle, { display: "flex" });
    assert.equal(map.get("flex-flow"), LV_FLEX_FLOW_MAP.row);
  });

  it("maps flex-direction and flex-wrap to flex-flow", () => {
    const map = runPipe(FlexStyle, {
      display: "flex",
      "flex-direction": "column",
      "flex-wrap": "wrap",
    });
    assert.equal(map.get("flex-flow"), LV_FLEX_FLOW_MAP.column_wrap);
  });

  it("defaults to column nowrap when only flex-direction is column", () => {
    const map = runPipe(FlexStyle, {
      display: "flex",
      "flex-direction": "column",
    });
    assert.equal(map.get("flex-flow"), LV_FLEX_FLOW_MAP.column);
  });

  it("omits invalid justify-content and align-items enums", () => {
    const map = runPipe(FlexStyle, {
      display: "flex",
      "justify-content": "baseline" as "center",
      "align-items": "stretch" as "center",
    });
    assert.equal(map.has("justify-content"), false);
    assert.equal(map.has("align-items"), false);
  });

  it("pushes justify-content and align-items enums", () => {
    const map = runPipe(FlexStyle, {
      display: "flex",
      "justify-content": "center",
      "align-items": "flex-end",
    });
    assert.equal(map.get("justify-content"), LV_FLEX_ALIGN_MAP.center);
    assert.equal(map.get("align-items"), LV_FLEX_ALIGN_MAP["flex-end"]);
  });

  it("pushes flex-grow 0 explicitly", () => {
    const map = runPipe(FlexStyle, { display: "flex", "flex-grow": 0 });
    assert.equal(map.get("flex-grow"), 0);
  });

  it("rejects non-integer flex-grow", () => {
    const map = runPipe(FlexStyle, { display: "flex", "flex-grow": 1.5 });
    assert.equal(map.has("flex-grow"), false);
  });

  it("parses flex-grow from numeric strings", () => {
    const map = runPipe(FlexStyle, { display: "flex", "flex-grow": "2" });
    assert.equal(map.get("flex-grow"), 2);
  });

  it("maps wrap-reverse to row_wrap-reverse flow", () => {
    const map = runPipe(FlexStyle, {
      display: "flex",
      "flex-wrap": "wrap-reverse",
    });
    assert.equal(map.get("flex-flow"), lv_conf.LV_FLEX_FLOW_ROW_WRAP_REVERSE);
  });

  it("maps reverse to row_reverse flow", () => {
    const map = runPipe(FlexStyle, {
      display: "flex",
      "flex-wrap": "reverse",
    });
    assert.equal(map.get("flex-flow"), lv_conf.LV_FLEX_FLOW_ROW_REVERSE);
  });

  it("maps column+reverse to column_reverse (not row_reverse)", () => {
    const map = runPipe(FlexStyle, {
      display: "flex",
      "flex-direction": "column",
      "flex-wrap": "reverse",
    });
    assert.equal(map.get("flex-flow"), lv_conf.LV_FLEX_FLOW_COLUMN_REVERSE);
    assert.notEqual(
      map.get("flex-flow"),
      lv_conf.LV_FLEX_FLOW_ROW_REVERSE,
    );
  });

  it("maps column wrap-reverse to column_wrap_reverse flow", () => {
    const map = runPipe(FlexStyle, {
      display: "flex",
      "flex-direction": "column",
      "flex-wrap": "wrap-reverse",
    });
    assert.equal(
      map.get("flex-flow"),
      lv_conf.LV_FLEX_FLOW_COLUMN_WRAP_REVERSE,
    );
  });

  /**
   * LVGL flex-align is [mainPlace, crossPlace, trackCrossPlace].
   * CSS maps them to justify-content, align-items, align-content respectively.
   */
  describe("align-content / trackCrossPlace", () => {
    it("maps main, cross, and track places independently when all three are set", () => {
      const map = runPipe(FlexStyle, {
        display: "flex",
        "flex-wrap": "wrap",
        "justify-content": "space-between",
        "align-items": "flex-end",
        "align-content": "space-around",
      });
      assert.equal(
        map.get("justify-content"),
        LV_FLEX_ALIGN_MAP["space-between"],
      );
      assert.equal(map.get("align-items"), LV_FLEX_ALIGN_MAP["flex-end"]);
      assert.equal(
        map.get("align-content"),
        LV_FLEX_ALIGN_MAP["space-around"],
      );
    });

    it("on nowrap mirrors align-items into trackCrossPlace when align-content omitted", () => {
      const map = runPipe(FlexStyle, {
        display: "flex",
        "flex-wrap": "nowrap",
        "align-items": "center",
      });
      assert.equal(map.get("align-items"), LV_FLEX_ALIGN_MAP.center);
      assert.equal(map.get("align-content"), LV_FLEX_ALIGN_MAP.center);
    });

    it("on nowrap mirrors any align-items keyword into trackCrossPlace", () => {
      const map = runPipe(FlexStyle, {
        display: "flex",
        "flex-wrap": "nowrap",
        "align-items": "flex-end",
      });
      assert.equal(map.get("align-content"), LV_FLEX_ALIGN_MAP["flex-end"]);
    });

    it("omits trackCrossPlace on nowrap when align-items is unset", () => {
      const map = runPipe(FlexStyle, {
        display: "flex",
        "flex-wrap": "nowrap",
      });
      assert.equal(map.has("align-items"), false);
      assert.equal(map.has("align-content"), false);
    });

    it("defaults trackCrossPlace to flex-start on wrap when align-content omitted", () => {
      const map = runPipe(FlexStyle, {
        display: "flex",
        "flex-wrap": "wrap",
      });
      assert.equal(map.get("align-content"), LV_FLEX_ALIGN_MAP["flex-start"]);
    });

    it("defaults trackCrossPlace to flex-start on wrap-reverse when align-content omitted", () => {
      const map = runPipe(FlexStyle, {
        display: "flex",
        "flex-wrap": "wrap-reverse",
      });
      assert.equal(map.get("align-content"), LV_FLEX_ALIGN_MAP["flex-start"]);
    });

    it("on wrap does not mirror align-items into trackCrossPlace", () => {
      const map = runPipe(FlexStyle, {
        display: "flex",
        "flex-wrap": "wrap",
        "align-items": "center",
      });
      assert.equal(map.get("align-items"), LV_FLEX_ALIGN_MAP.center);
      assert.equal(map.get("align-content"), LV_FLEX_ALIGN_MAP["flex-start"]);
      assert.notEqual(map.get("align-content"), map.get("align-items"));
    });

    it("on wrap-reverse does not mirror align-items into trackCrossPlace", () => {
      const map = runPipe(FlexStyle, {
        display: "flex",
        "flex-wrap": "wrap-reverse",
        "align-items": "center",
      });
      assert.equal(map.get("align-content"), LV_FLEX_ALIGN_MAP["flex-start"]);
    });

    it("on reverse (main-axis only) does not mirror align-items into trackCrossPlace", () => {
      const map = runPipe(FlexStyle, {
        display: "flex",
        "flex-wrap": "reverse",
        "align-items": "center",
      });
      assert.equal(map.get("align-content"), LV_FLEX_ALIGN_MAP["flex-start"]);
    });

    it("explicit align-content wins over nowrap align-items mirror", () => {
      const map = runPipe(FlexStyle, {
        display: "flex",
        "flex-wrap": "nowrap",
        "align-items": "center",
        "align-content": "space-between",
      });
      assert.equal(map.get("align-items"), LV_FLEX_ALIGN_MAP.center);
      assert.equal(
        map.get("align-content"),
        LV_FLEX_ALIGN_MAP["space-between"],
      );
    });

    it("explicit align-content wins over wrap flex-start default", () => {
      const map = runPipe(FlexStyle, {
        display: "flex",
        "flex-wrap": "wrap",
        "align-content": "center",
      });
      assert.equal(map.get("align-content"), LV_FLEX_ALIGN_MAP.center);
    });
  });

  describe("flex-grow normalization", () => {
    it('parses flex-grow "0" from numeric strings', () => {
      const map = runPipe(FlexStyle, { display: "flex", "flex-grow": "0" });
      assert.equal(map.get("flex-grow"), 0);
    });

    it("rejects negative flex-grow", () => {
      const map = runPipe(FlexStyle, { display: "flex", "flex-grow": -1 });
      assert.equal(map.has("flex-grow"), false);
    });
  });
});
