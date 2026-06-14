import { CSS_POSITION_MAP, type PosStyleType } from "../type";
import { NormalizeCoord } from "../util";
import { StyleTransformResult } from "../batch";

const COORD_KEYS = [
  "height",
  "max-height",
  "min-height",
  "width",
  "max-width",
  "min-width",
  "left",
  "top",
  "row-spacing",
  "column-spacing",
] as const;

export function PosStyle(style: PosStyleType, result: StyleTransformResult) {
  const batch = result.batch;

  for (const key of COORD_KEYS) {
    batch.pushStyle(style, key, NormalizeCoord);
  }
  batch.pushStyleEnum(style, "position", CSS_POSITION_MAP);
}
