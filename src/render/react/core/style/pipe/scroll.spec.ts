import assert from "node:assert/strict";
import { describe, it } from "node:test";

import "../../lv.setup.spec";
import { LV_SCROLL_SNAP_MAP } from "../../lv_types";
import {
  SCROLL_MOMENTUM_MAP,
  SCROLL_OVERFLOW_MAP,
} from "../type";
import { runPipe } from "../pipe.harness";
import { ScrollStyle } from "./scroll";

describe("ScrollStyle pipe", () => {
  it("pushes overflow and momentum enums", () => {
    const map = runPipe(ScrollStyle, {
      overflow: "hidden",
      "overflow-scrolling": "touch",
    });
    assert.equal(map.get("overflow"), SCROLL_OVERFLOW_MAP.hidden);
    assert.equal(
      map.get("overflow-scrolling"),
      SCROLL_MOMENTUM_MAP.touch,
    );
  });

  it("pushes scroll snap enums and enable flag", () => {
    const map = runPipe(ScrollStyle, {
      "scroll-snap-x": "snap_center",
      "scroll-snap-y": "none",
      "scroll-enable-snap": true,
    });
    assert.equal(map.get("scroll-snap-x"), LV_SCROLL_SNAP_MAP.snap_center);
    assert.equal(map.get("scroll-snap-y"), LV_SCROLL_SNAP_MAP.none);
    assert.equal(map.get("scroll-enable-snap"), true);
  });

  it("maps overflow scroll and auto to scrollable flag", () => {
    const scroll = runPipe(ScrollStyle, { overflow: "scroll" });
    const auto = runPipe(ScrollStyle, { overflow: "auto" });
    assert.equal(scroll.get("overflow"), SCROLL_OVERFLOW_MAP.scroll);
    assert.equal(auto.get("overflow"), SCROLL_OVERFLOW_MAP.auto);
  });

  it("omits unknown overflow values", () => {
    const map = runPipe(ScrollStyle, { overflow: "visible" as "hidden" });
    assert.equal(map.has("overflow"), false);
  });

  it("pushes scroll-enable-snap false explicitly", () => {
    const map = runPipe(ScrollStyle, { "scroll-enable-snap": false });
    assert.equal(map.get("scroll-enable-snap"), false);
  });

  it("maps overflow-scrolling auto to momentum off", () => {
    const map = runPipe(ScrollStyle, { "overflow-scrolling": "auto" });
    assert.equal(map.get("overflow-scrolling"), SCROLL_MOMENTUM_MAP.auto);
  });
});
