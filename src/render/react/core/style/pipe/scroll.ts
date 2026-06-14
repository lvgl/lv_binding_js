import { LV_SCROLL_SNAP_MAP } from "../../lv_types";
import {
  SCROLL_MOMENTUM_MAP,
  SCROLL_OVERFLOW_MAP,
  type ScrollStyleType,
} from "../type";
import { NormalizeBoolean } from "../util";
import { StyleTransformResult } from "../batch";

/** scroll-dir is typed on ScrollStyleType but not applied here (no native style prop yet). */
export function ScrollStyle(
  style: ScrollStyleType,
  result: StyleTransformResult,
) {
  const batch = result.batch;
  batch.pushStyleEnum(style, "overflow", SCROLL_OVERFLOW_MAP);
  batch.pushStyleEnum(style, "overflow-scrolling", SCROLL_MOMENTUM_MAP);
  batch.pushStyleEnum(style, "scroll-snap-x", LV_SCROLL_SNAP_MAP);
  batch.pushStyleEnum(style, "scroll-snap-y", LV_SCROLL_SNAP_MAP);
  batch.pushStyle(style, "scroll-enable-snap", NormalizeBoolean);
}
