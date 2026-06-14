import type { ShadowStyleType } from "../type";
import { colorTransform, NormalizePx, NormalizePositivePx } from "../util";
import { StyleTransformResult } from "../batch";

export function ShadowStyle(
  style: ShadowStyleType,
  result: StyleTransformResult,
) {
  const batch = result.batch;
  batch.pushStyle(style, "shadow-width", NormalizePositivePx);
  batch.pushStyle(style, "shadow-color", colorTransform);
  batch.pushStyle(style, "shadow-offset-x", NormalizePx);
  batch.pushStyle(style, "shadow-offset-y", NormalizePx);
  batch.pushStyle(style, "shadow-spread", NormalizePositivePx);
}
