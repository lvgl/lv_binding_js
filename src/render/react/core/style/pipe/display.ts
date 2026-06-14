import { CSS_DISPLAY_MAP, type DisplayStyleType } from "../type";
import { StyleTransformResult } from "../batch";

export function DisplayStyle(
  style: DisplayStyleType,
  result: StyleTransformResult,
) {
  result.batch.pushStyleEnum(style, "display", CSS_DISPLAY_MAP);
}
