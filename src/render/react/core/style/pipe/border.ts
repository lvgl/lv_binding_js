import { StyleTransformResult } from "../batch";
import { type BorderStyleType, LV_BORDER_SIDE_MAP } from "../type";
import { colorTransform, NormalizePositivePx } from "../util";

export function BorderStyle(
  style: BorderStyleType,
  result: StyleTransformResult,
) {
  const batch = result.batch;
  batch.pushStyle(style, "border-radius", NormalizePositivePx);
  batch.pushStyle(style, "border-width", NormalizePositivePx);
  batch.pushStyle(style, "border-color", colorTransform);
  batch.pushStyleEnum(style, "border-side", LV_BORDER_SIDE_MAP);
}