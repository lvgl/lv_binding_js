import { LV_GRID_CONTENT, LV_GRID_FR } from "../../lv_conf_macros";
import { LV_GRID_ALIGN_MAP } from "../../lv_types";
import { STYLE_PROP, StyleTransformResult } from "../batch";
import type { GridStyleType } from "../type";
import {
  NormalizeEnumDefault,
  NormalizeGridCellPos,
  NormalizeGridCellSpan,
  NormalizePositivePx,
} from "../util";

const FR_REG = /([\d]+)fr$/;

function parseGridTemplate(template: string): number[] {
  return template
    .split(/\s/)
    .filter(Boolean)
    .map((track) => {
      if (track === "auto") return LV_GRID_CONTENT;
      const fr = track.match(FR_REG)?.[1];
      if (fr != null) return LV_GRID_FR(Number(fr));
      return NormalizePositivePx(track);
    })
    .filter((v): v is number => v !== null);
}

export function GridStyle(style: GridStyleType, result: StyleTransformResult) {
  const batch = result.batch;

  if (style.display === "grid") {
    const columns = style["grid-template-columns"];
    const rows = style["grid-template-rows"];
    if (!columns || !rows) return;
    const templateColumns = parseGridTemplate(columns);
    const templateRows = parseGridTemplate(rows);

    batch.push(STYLE_PROP.display, "grid");
    batch.push(STYLE_PROP["grid-template"], [templateColumns, templateRows]);
    batch.push(STYLE_PROP["grid-align"], [
      NormalizeEnumDefault(
        LV_GRID_ALIGN_MAP,
        style["justify-content"],
        LV_GRID_ALIGN_MAP.start,
      ),
      NormalizeEnumDefault(
        LV_GRID_ALIGN_MAP,
        style["align-items"],
        LV_GRID_ALIGN_MAP.start,
      ),
    ]);
  }

  if (!style["grid-child"]) return;

  const gridColumnPos = NormalizeGridCellPos(style["grid-column-pos"]);
  const gridRowPos = NormalizeGridCellPos(style["grid-row-pos"]);
  const gridColumnSpan =
    NormalizeGridCellSpan(style["grid-column-span"]) ?? 1;
  const gridRowSpan = NormalizeGridCellSpan(style["grid-row-span"]) ?? 1;
  if (gridColumnPos == null || gridRowPos == null) {
    return;
  }

  batch.push(STYLE_PROP["grid-child"], [
    NormalizeEnumDefault(
      LV_GRID_ALIGN_MAP,
      style["justify-self"],
      LV_GRID_ALIGN_MAP.start,
    ),
    gridColumnPos,
    gridColumnSpan,
    NormalizeEnumDefault(
      LV_GRID_ALIGN_MAP,
      style["align-self"],
      LV_GRID_ALIGN_MAP.start,
    ),
    gridRowPos,
    gridRowSpan,
  ]);
}
