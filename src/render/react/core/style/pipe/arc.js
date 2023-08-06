import { ProcessBoolean, ProcessColor, ProcessPx } from "../util";

const obj = {
  "arc-width": ProcessPx,
  "arc-color": ProcessColor,
  "arc-rounded": ProcessBoolean,
};
const keys = Object.keys(obj);

export function ArcStyle(style, result, compName) {
  keys.forEach((key) => {
    if (style[key] !== void 0) {
      obj[key](key, style[key], result);
    }
  });
}
