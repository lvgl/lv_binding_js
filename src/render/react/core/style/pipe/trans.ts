import { ANIM_PATH } from "../../lv_types";
import {
  type LvStylePropId,
  TRANSITION_PROP,
  TRANSITION_PROP_ALIAS,
  TRANSITION_TYPO_HINTS,
} from "../../style_prop";
import { STYLE_PROP, StyleTransformResult } from "../batch";
import type { TransStyleType } from "../type";
import {
  NormalizeDeg,
  NormalizePx,
  NormalizeScale,
  NormalizeTime,
} from "../util";

/** lv_img widgets (Image, GIF) use img-* props -> lv_image_set_*; not style transform. */
function usesImgTransform(compName?: string) {
  return compName === "Image" || compName === "GIF";
}

const transformSupportKeys = [
  "translate",
  "translate-x",
  "translate-y",
  "scale",
  "scaleX",
  "scaleY",
  "rotate",
  "transform-width",
  "transform-height",
];

function resolveTransitionProp(name: string): LvStylePropId | undefined {
  const typo =
    TRANSITION_TYPO_HINTS[name as keyof typeof TRANSITION_TYPO_HINTS];
  if (typo) name = typo;
  const alias =
    TRANSITION_PROP_ALIAS[name as keyof typeof TRANSITION_PROP_ALIAS];
  if (alias) name = alias;
  return TRANSITION_PROP[name as keyof typeof TRANSITION_PROP];
}

export function TransStyle(
  style: TransStyleType,
  result: StyleTransformResult,
  compName?: string,
) {
  const batch = result.batch;

  if (style["transition-property"]) {
    const properties = style["transition-property"]
      .split(",")
      .map((item) => item.replace(/\s/g, ""))
      .map((item) => resolveTransitionProp(item))
      .filter((item): item is LvStylePropId => item !== undefined);

    const funcKey = style["transition-timing-function"] || "linear";
    result.transition = [
      properties.length,
      properties,
      NormalizeTime(style["transition-duration"]) ?? 0,
      ANIM_PATH[funcKey] ?? ANIM_PATH.linear,
      NormalizeTime(style["transition-delay"]) ?? 0,
    ];
  }

  // No early return here: transform-origin below must apply even when
  // `transform` is absent or unparseable.
  if (style["transform"]) {
    const value = style["transform"];
    const matches = value.match(/[a-zA-Z\-]+\([^\(]+\)/g) ?? [];
    const reg = /^([a-zA-Z\-]+)\((.+)\)$/;
    for (const item of matches) {
      const matched = item.match(reg);
      if (!matched) continue;
      const prop = matched[1];
      const val = matched[2];
      if (!transformSupportKeys.includes(prop) || !val) continue;

      if (prop === "translate") {
        const parts = val.split(",");
        batch.push(STYLE_PROP.translateX, NormalizePx(parts[0]));
        batch.push(STYLE_PROP.translateY, NormalizePx(parts[1]));
      } else if (prop === "translate-x" || prop === "translate-y") {
        batch.push(
          prop === "translate-x"
            ? STYLE_PROP.translateX
            : STYLE_PROP.translateY,
          NormalizePx(val),
        );
      } else if (prop === "scale") {
        const norm = NormalizeScale(val);
        if (usesImgTransform(compName)) {
          batch.push(STYLE_PROP["img-scaleX"], norm);
          batch.push(STYLE_PROP["img-scaleY"], norm);
        } else {
          batch.push(STYLE_PROP.scaleX, norm);
          batch.push(STYLE_PROP.scaleY, norm);
        }
      } else if (prop === "rotate") {
        const prefix = usesImgTransform(compName) ? "img-" : "";
        batch.push(STYLE_PROP[`${prefix}rotate`], NormalizeDeg(val));
      } else if (prop === "scaleX" || prop === "scaleY") {
        const prefix = usesImgTransform(compName) ? "img-" : compName === "Chart" ? "chart-" : "";
        batch.push(STYLE_PROP[`${prefix}${prop}`], NormalizeScale(val));
      } else if (prop === "transform-width" || prop === "transform-height") {
        batch.push(STYLE_PROP[prop], NormalizePx(val));
      }
    }
  }

  if (style["transform-origin"] && usesImgTransform(compName)) {
    const [x, y] = style["transform-origin"].trim()?.split(" ");
    batch.push(STYLE_PROP["img-origin"], [NormalizePx(x), NormalizePx(y)]);
  }
}
