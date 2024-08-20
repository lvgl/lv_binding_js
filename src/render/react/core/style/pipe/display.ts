import { ProcessColor, ProcessPx, ProcessPxOrPercent } from "../util";

export type DisplayStyleType = {
  "display"?: "flex" | "block" | "inline" | "none";
}

export function DisplayStyle(style: DisplayStyleType, result, compName) {
  if (style["display"]) {
    result["display"] = style["display"];
  }
}
