import { LV_FLEX_ALIGN_MAP, LV_FLEX_FLOW_MAP } from "../../lv_types";
import { STYLE_PROP, StyleTransformResult } from "../batch";
import { type FlexStyleType, LV_WRAP_MAP } from "../type";
import { NormalizeEnum, NormalizeFlexGrow } from "../util";

export function FlexStyle(style: FlexStyleType, result: StyleTransformResult) {
  if (style.display !== "flex") return;

  const batch = result.batch;
  const flexDirection = style["flex-direction"] || "row";
  const flexWrap = style["flex-wrap"] || "nowrap";
  const flexFlow = LV_FLEX_FLOW_MAP[`${flexDirection}${LV_WRAP_MAP[flexWrap]}`];

  batch.push(STYLE_PROP["flex-flow"], flexFlow);
  batch.pushStyleEnum(style, "justify-content", LV_FLEX_ALIGN_MAP);
  batch.pushStyleEnum(style, "align-items", LV_FLEX_ALIGN_MAP);

  const alignContent =
    style["align-content"] ||
    (flexWrap === "nowrap" ? style["align-items"] : "flex-start");
  batch.push(
    STYLE_PROP["align-content"],
    NormalizeEnum(LV_FLEX_ALIGN_MAP, alignContent),
  );
  batch.pushStyle(style, "flex-grow", NormalizeFlexGrow);
}
