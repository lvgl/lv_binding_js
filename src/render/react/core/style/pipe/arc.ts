import {
  colorTransform,
  NormalizePositivePx,
  NormalizeBoolean,
} from "../util";
import type { ArcStyleType } from "../type";
import { StyleTransformResult } from "../batch";

export function ArcStyle(
  style: ArcStyleType,
  result: StyleTransformResult,
) {
  const batch = result.batch;
  batch.pushStyle(style, "arc-width", NormalizePositivePx);
  batch.pushStyle(style, "arc-color", colorTransform);
  batch.pushStyle(style, "arc-rounded", NormalizeBoolean);
}
