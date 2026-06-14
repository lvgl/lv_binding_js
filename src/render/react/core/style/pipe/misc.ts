import type { MiscStyleType } from "../type";
import { StyleTransformResult } from "../batch";
import { colorTransform, NormalizeTime } from "../util";

export function MiscStyle(
  style: MiscStyleType,
  result: StyleTransformResult,
  compName?: string,
) {
  const batch = result.batch;
  if (compName === "Image") {
    batch.pushStyle(style, "recolor", colorTransform);
  }
  batch.pushStyle(style, "style-transition-time", NormalizeTime);
}
