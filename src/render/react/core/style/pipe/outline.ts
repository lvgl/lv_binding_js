import { StyleTransformResult } from "../batch";
import type { OutlineStyleType } from "../type";
import { colorTransform, NormalizeCoord, NormalizePositivePx } from "../util";

export function OutlineStyle(style: OutlineStyleType, result: StyleTransformResult) {
  const batch = result.batch;
  batch.pushStyle(style, "outline-width", NormalizePositivePx);
  batch.pushStyle(style, "outline-color", colorTransform);
  batch.pushStyle(style, "outline-padding", NormalizeCoord);
}
