// Style prop types (StyleProps) and hand-written runtime maps that cannot be generated from LVGL enums.
// Generated enum maps live in ../lv_types.ts; transition maps in ../style_prop.ts.
import * as lv_conf from "../lv_conf";
import {
  type AnimPathKey,
  type DirMapKey,
  type FlexAlignMapKey,
  type GradDirMapKey,
  type GridAlignMapKey,
  type LabelLongModeMapKey,
  type ScrollSnapMapKey,
  type TextAlignMapKey,
  type TextDecorMapKey,
} from "../lv_types";
import type { builtinColor } from "./color";

/** CSS border-side keyword -> LVGL lv_border_side_t (includes composites) */
export const LV_BORDER_SIDE_MAP = {
  left: lv_conf.LV_BORDER_SIDE_LEFT,
  right: lv_conf.LV_BORDER_SIDE_RIGHT,
  top: lv_conf.LV_BORDER_SIDE_TOP,
  bottom: lv_conf.LV_BORDER_SIDE_BOTTOM,
  full: lv_conf.LV_BORDER_SIDE_FULL,
  "top-right": lv_conf.LV_BORDER_SIDE_TOP | lv_conf.LV_BORDER_SIDE_RIGHT,
  "top-bottom": lv_conf.LV_BORDER_SIDE_TOP | lv_conf.LV_BORDER_SIDE_BOTTOM,
  "top-left": lv_conf.LV_BORDER_SIDE_TOP | lv_conf.LV_BORDER_SIDE_LEFT,
  "right-bottom": lv_conf.LV_BORDER_SIDE_RIGHT | lv_conf.LV_BORDER_SIDE_BOTTOM,
  "right-left": lv_conf.LV_BORDER_SIDE_RIGHT | lv_conf.LV_BORDER_SIDE_LEFT,
  "bottom-left": lv_conf.LV_BORDER_SIDE_BOTTOM | lv_conf.LV_BORDER_SIDE_LEFT,
} as const;

export type BorderSideMapKey = keyof typeof LV_BORDER_SIDE_MAP;

/** CompSetOverflow in native/core/style/style.cpp: truthy clears LV_OBJ_FLAG_SCROLLABLE. */
const SCROLL_OVERFLOW_SCROLLABLE = 0;
const SCROLL_OVERFLOW_HIDDEN = 1;

/** CSS overflow -> CompSetStyle scroll handler flag (not an LVGL enum) */
export const SCROLL_OVERFLOW_MAP = {
  hidden: SCROLL_OVERFLOW_HIDDEN,
  scroll: SCROLL_OVERFLOW_SCROLLABLE,
  auto: SCROLL_OVERFLOW_SCROLLABLE,
} as const;

export type ScrollOverflowMapKey = keyof typeof SCROLL_OVERFLOW_MAP;

/** CompSetOverFlowScrolling in native/core/style/style.cpp: truthy sets LV_OBJ_FLAG_SCROLL_MOMENTUM. */
const SCROLL_MOMENTUM_OFF = 0;
const SCROLL_MOMENTUM_ON = 1;

/** overflow-scrolling -> scroll momentum handler flag (not an LVGL enum) */
export const SCROLL_MOMENTUM_MAP = {
  auto: SCROLL_MOMENTUM_OFF,
  touch: SCROLL_MOMENTUM_ON,
} as const;

export type ScrollMomentumMapKey = keyof typeof SCROLL_MOMENTUM_MAP;

// `(string & {})` keeps the template-literal hints in IDE completions while
// still accepting any string; a bare `| string` would collapse the union.
/** Length with px unit, e.g. "12px" or "-3.5px". */
export type PxString = `${number}px` | (string & {});
export type Px = number | PxString | null | undefined;

/** Length with px or % unit, e.g. "12px" or "50%". */
export type PxOrPercentString =
  | `${number}px`
  | `${number}%`
  | "auto"
  | (string & {});
export type PxOrPercent = number | PxOrPercentString | null | undefined;

/** Duration with ms or s unit, e.g. "200ms" or "1.5s". */
export type TimeString = `${number}ms` | `${number}s` | (string & {});
export type Time = number | TimeString | null | undefined;

/** Angle with deg unit, e.g. "90deg" or "-45deg". */
export type DegString = `${number}deg` | (string & {});
export type Deg = number | DegString | null | undefined;

/**
 * Unitless zoom/scale factor, e.g. 1 or "1.5".
 * Not a top-level StyleProps field; NormalizeScale uses this when trans.ts
 * parses scale()/scaleX()/scaleY() tokens inside `transform`.
 */
export type Scale = number | (string & {}) | null | undefined;

/** Opacity factor 0-1, e.g. 0.5 or "0.5". Values > 1 map to LV_OPA_COVER. */
export type Opacity = number | (string & {}) | null | undefined;

/** LVGL flex-grow (uint8): 0 = no grow; integers >= 1 share free space by ratio. */
export type FlexGrow = number | (string & {});

/** Grid cell line index (0-based) or span count; accepts unitless numeric strings from JSX. */
export type GridCellIndex = number | (string & {});

/** Either one of the builtin named colors or a hex code, e.g. `#ffffff`. */
export type ColorType = keyof typeof builtinColor | `#${string}`;

/** CSS box-alignment space distribution keywords */
type CssSpaceDistribution = "space-evenly" | "space-around" | "space-between";

export type ArcStyleType = {
  /** Value in pixels */
  "arc-width"?: Px;
  "arc-color"?: ColorType;
  "arc-rounded"?: boolean;
  "arc-image"?: string | null;
};

export type BackgroundStyleType = {
  "background-color"?: ColorType;
  "background-grad-color"?: ColorType;
  "background-grad-color-dir"?: GradDirMapKey;
  /** Loaded asynchronously in {@link PostProcessStyle}. */
  "background-image"?: string | null;
};

export type BorderStyleType = {
  "border-radius"?: Px;
  "border-width"?: Px;
  "border-color"?: ColorType;
  "border-side"?: BorderSideMapKey;
};

/** CSS display keyword passthrough to native CompSetDisplay (flex/grid/none are handled). */
export const CSS_DISPLAY_MAP = {
  flex: "flex",
  grid: "grid",
  block: "block",
  inline: "inline",
  none: "none",
} as const;

export type CssDisplayMapKey = keyof typeof CSS_DISPLAY_MAP;

export type DisplayStyleType = {
  display?: CssDisplayMapKey;
};

export type FlexDirection = "row" | "column";
export type FlexWrap = "nowrap" | "wrap" | "wrap-reverse" | "reverse";

/**
 * FlexWrap keyword -> LV_FLEX_FLOW_MAP key suffix.
 * `reverse` reverses the main axis; `wrap-reverse` wraps and reverses
 * cross-axis line order (CSS flex-wrap: wrap-reverse).
 */
export const LV_WRAP_MAP = {
  nowrap: "",
  wrap: "_wrap",
  "wrap-reverse": "_wrap_reverse",
  reverse: "_reverse",
} as const;

export type FlexStyleType = {
  display?: "flex";
  "flex-direction"?: FlexDirection;
  /**
   * `reverse` = main-axis reverse (LV_FLEX_FLOW_ROW_REVERSE / _COLUMN_REVERSE).
   * `wrap-reverse` = CSS flex-wrap: wrap-reverse (LV_FLEX_FLOW_*_WRAP_REVERSE).
   */
  "flex-wrap"?: FlexWrap;
  "justify-content"?: FlexAlignMapKey;
  "align-items"?: FlexAlignMapKey;
  "align-content"?: Exclude<FlexAlignMapKey, "flex-start">;
  "flex-grow"?: FlexGrow;
};

export type GridStyleType = {
  display?: "grid";
  "grid-template-columns"?: string;
  "grid-template-rows"?: string;
  "justify-content"?: GridAlignMapKey;
  "align-items"?: GridAlignMapKey;
  "grid-child"?: boolean;
  "justify-self"?: Exclude<GridAlignMapKey, CssSpaceDistribution>;
  "align-self"?: Exclude<GridAlignMapKey, CssSpaceDistribution>;
  "grid-column-pos"?: GridCellIndex;
  "grid-row-pos"?: GridCellIndex;
  "grid-column-span"?: GridCellIndex;
  "grid-row-span"?: GridCellIndex;
};

export type LineStyleType = {
  "line-width"?: Px;
  "line-color"?: ColorType;
  "line-rounded"?: boolean;
};

export type MiscStyleType = {
  "style-transition-time"?: Time;
  recolor?: ColorType;
};

export type OpacityStyleProp = {
  opacity?: Opacity;
  "background-opacity"?: Opacity;
  "border-opacity"?: Opacity;
  "outline-opacity"?: Opacity;
  "recolor-opacity"?: Opacity;
  "shadow-opacity"?: Opacity;
  "arc-opacity"?: Opacity;
};

export type OutlineStyleType = {
  "outline-width"?: Px;
  "outline-color"?: ColorType;
  "outline-padding"?: PxOrPercent;
};

/** One token in a padding shorthand (px number or "Npx" string). */
type PxLen = number | PxString;

export type PaddingStyleType = {
  padding?:
    | Px
    | `${PxLen} ${PxLen}`
    | `${PxLen} ${PxLen} ${PxLen}`
    | `${PxLen} ${PxLen} ${PxLen} ${PxLen}`;
  "padding-left"?: Px;
  "padding-top"?: Px;
  "padding-right"?: Px;
  "padding-bottom"?: Px;
};

/** CSS position keyword passthrough to native CompSetPosition. */
export const CSS_POSITION_MAP = {
  absolute: "absolute",
  fixed: "fixed",
} as const;

export type CssPositionMapKey = keyof typeof CSS_POSITION_MAP;

export type PosStyleType = {
  height?: PxOrPercent;
  "max-height"?: PxOrPercent;
  "min-height"?: PxOrPercent;
  width?: PxOrPercent;
  "max-width"?: PxOrPercent;
  "min-width"?: PxOrPercent;
  left?: PxOrPercent;
  top?: PxOrPercent;
  "row-spacing"?: PxOrPercent;
  "column-spacing"?: PxOrPercent;
  position?: CssPositionMapKey;
};

export type ScrollStyleType = {
  overflow?: ScrollOverflowMapKey;
  "overflow-scrolling"?: ScrollMomentumMapKey;
  /**
   * Documented in doc/style/scroll.md but not wired: no LV_STYLE_* handler or
   * ScrollStyle pipe stage yet; use lv_obj_set_scroll_dir in native if needed.
   */
  "scroll-dir"?: DirMapKey;
  "scroll-snap-x"?: ScrollSnapMapKey;
  "scroll-snap-y"?: ScrollSnapMapKey;
  "scroll-enable-snap"?: boolean;
};

export type ShadowStyleType = {
  "shadow-width"?: Px;
  "shadow-color"?: ColorType;
  "shadow-offset-x"?: Px;
  "shadow-offset-y"?: Px;
  "shadow-spread"?: Px;
};

export type TextStyleType = {
  "text-color"?: ColorType;
  "letter-spacing"?: Px;
  "line-spacing"?: Px;
  "text-overflow"?: LabelLongModeMapKey;
  "text-align"?: TextAlignMapKey;
  "text-decoration"?: TextDecorMapKey;
  "font-size"?: Px;
};

export type TransStyleType = {
  "transition-property"?: string;
  "transition-duration"?: Time;
  "transition-timing-function"?: AnimPathKey;
  "transition-delay"?: Time;
  transform?: string;
  "transform-origin"?: string;
};

/**
 * Runtime style sheets are always partial; pipes normalize missing keys to skip.
 *
 * Display/Flex/Grid must stay a union: intersecting them would collapse
 * `display` to `never` and over-narrow shared keys such as `justify-content`
 * (FlexAlignMapKey vs GridAlignMapKey).
 */
export type StyleType = Partial<
  ArcStyleType &
    BackgroundStyleType &
    BorderStyleType &
    LineStyleType &
    MiscStyleType &
    OpacityStyleProp &
    OutlineStyleType &
    PaddingStyleType &
    PosStyleType &
    ScrollStyleType &
    ShadowStyleType &
    TextStyleType &
    TransStyleType
> &
  (DisplayStyleType | FlexStyleType | GridStyleType);

export type StyleProps = StyleType | StyleType[];

export function IsNullish(value: unknown): value is null | undefined {
  return value == null;
}

/**
 * Shared "skip this value" guard for Normalize* functions: nullish or NaN.
 * The `null | undefined` predicate is a benign lie for NaN (callers return
 * null on true, so the narrowed type is never used); on false the value is
 * correctly narrowed to non-nullish.
 */
export function IsNullishOrNaN(value: unknown): value is null | undefined {
  return value == null || (typeof value === "number" && Number.isNaN(value));
}
