import {
  LV_LABEL_LONG_MODE_MAP,
  LV_TEXT_ALIGN_MAP,
  LV_TEXT_DECOR_MAP,
} from "../../lv_types";
import { STYLE_PROP, StyleTransformResult } from "../batch";
import type { TextStyleType } from "../type";
import { colorTransform, NormalizePositivePx, NormalizePx } from "../util";

/** Pixel sizes; index order must match builtin_font_list[] in native/core/style/font/font.hpp. */
const builtInFontList = [
  8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40, 42, 44, 46,
  48,
];

export function TextStyle(
  style: TextStyleType,
  result: StyleTransformResult
) {
  const batch = result.batch;
  batch.pushStyle(style, "text-color", colorTransform);
  batch.pushStyle(style, "letter-spacing", NormalizePx);
  batch.pushStyle(style, "line-spacing", NormalizePx);
  batch.pushStyleEnum(style, "text-overflow", LV_LABEL_LONG_MODE_MAP);
  batch.pushStyleEnum(style, "text-align", LV_TEXT_ALIGN_MAP);
  batch.pushStyleEnum(style, "text-decoration", LV_TEXT_DECOR_MAP);

  let size = NormalizePositivePx(style["font-size"]);
  if (size == null) return;

  if (size % 2 === 1) size += 1;
  size = Math.min(
    builtInFontList[builtInFontList.length - 1],
    Math.max(builtInFontList[0], size),
  );

  // Fractional sizes (e.g. 13.5) survive the even-rounding above and are not
  // in the list; skip instead of sending font index -1 to native.
  const fontIndex = builtInFontList.indexOf(size);
  if (fontIndex < 0) return;
  batch.push(STYLE_PROP["font-size"], fontIndex);
}
