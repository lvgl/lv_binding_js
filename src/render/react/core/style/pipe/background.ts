import { LV_GRAD_DIR_MAP } from "../../lv_types";
import type { BackgroundStyleType } from "../type";
import { StyleTransformResult } from "../batch";
import { colorTransform } from "../util";

export function BackgroundStyle(
  style: BackgroundStyleType,
  result: StyleTransformResult,
) {
  const batch = result.batch;
  batch.pushStyle(style, "background-color", colorTransform);
  batch.pushStyle(style, "background-grad-color", colorTransform);
  batch.pushStyleEnum(style, "background-grad-color-dir", LV_GRAD_DIR_MAP);
}
