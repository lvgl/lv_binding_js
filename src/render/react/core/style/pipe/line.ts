import type { LineStyleType } from "../type";
import { colorTransform, NormalizeBoolean, NormalizePositivePx } from "../util";
import { StyleTransformResult } from "../batch";

export function LineStyle(
  style: LineStyleType,
  result: StyleTransformResult,
) {
  const batch = result.batch;
  batch.pushStyle(style, "line-width", NormalizePositivePx);
  batch.pushStyle(style, "line-color", colorTransform);
  batch.pushStyle(style, "line-rounded", NormalizeBoolean);
}
