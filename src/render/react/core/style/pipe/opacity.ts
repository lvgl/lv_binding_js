import type { OpacityStyleProp } from "../type";
import { NormalizeOpacity } from "../util";
import { STYLE_PROP, StyleTransformResult } from "../batch";

export function OpacityStyle(
  style: OpacityStyleProp,
  result: StyleTransformResult,
  compName?: string,
) {
  const batch = result.batch;
  batch.push(
    compName === "Image" ? STYLE_PROP["img-opacity"] : STYLE_PROP.opacity,
    NormalizeOpacity(style.opacity),
  );
  batch.pushStyle(style, "background-opacity", NormalizeOpacity);
  batch.pushStyle(style, "border-opacity", NormalizeOpacity);
  batch.pushStyle(style, "outline-opacity", NormalizeOpacity);
  if (compName === "Image") {
    batch.pushStyle(style, "recolor-opacity", NormalizeOpacity);
  }
  batch.pushStyle(style, "shadow-opacity", NormalizeOpacity);
  if (compName === "Arc") {
    batch.pushStyle(style, "arc-opacity", NormalizeOpacity);
  }
}
