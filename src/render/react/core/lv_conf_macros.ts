import { LV_COORD_MAX } from "./lv_conf";

// deps/lvgl/src/misc/lv_area.h

/** Runtime shift; equals LV_COORD_TYPE_SHIFT (29U) when LV_COORD_MAX is (1 << 29) - 1. */
export const LV_COORD_TYPE_SHIFT = 31 - Math.clz32(LV_COORD_MAX + 1);

export const LV_COORD_TYPE_MASK = 3 << LV_COORD_TYPE_SHIFT;
export const LV_COORD_TYPE_PX = 0 << LV_COORD_TYPE_SHIFT;
export const LV_COORD_TYPE_SPEC = 1 << LV_COORD_TYPE_SHIFT;
export const LV_COORD_TYPE_PX_NEG = 3 << LV_COORD_TYPE_SHIFT;

export { LV_COORD_MAX };
export const LV_COORD_MIN = -LV_COORD_MAX;

export function LV_COORD_TYPE(x: number): number {
  return x & LV_COORD_TYPE_MASK;
}

export function LV_COORD_PLAIN(x: number): number {
  return x & ~LV_COORD_TYPE_MASK;
}

export function LV_COORD_IS_PX(x: number): boolean {
  const t = LV_COORD_TYPE(x);
  return t === LV_COORD_TYPE_PX || t === LV_COORD_TYPE_PX_NEG;
}

export function LV_COORD_IS_SPEC(x: number): boolean {
  return LV_COORD_TYPE(x) === LV_COORD_TYPE_SPEC;
}

/** #define LV_COORD_SET_SPEC(x) ((x) | LV_COORD_TYPE_SPEC) */
export function LV_COORD_SET_SPEC(x: number): number {
  return x | LV_COORD_TYPE_SPEC;
}

/** #define LV_SIZE_CONTENT LV_COORD_SET_SPEC(LV_COORD_MAX) */
export const LV_SIZE_CONTENT = LV_COORD_SET_SPEC(LV_COORD_MAX);

export const LV_PCT_STORED_MAX = LV_COORD_MAX - 1;
export const LV_PCT_POS_MAX = LV_PCT_STORED_MAX / 2;

function lvClamp(x: number, lo: number, hi: number): number {
  return Math.min(Math.max(x, lo), hi);
}

/**
 * #define LV_PCT(x) (LV_COORD_SET_SPEC(((x) < 0 ? (LV_PCT_POS_MAX - LV_MAX((x), -LV_PCT_POS_MAX)) : LV_MIN((x), LV_PCT_POS_MAX))))
 * Percentage values are stored in a special coord range (see lv_area.h).
 */
export function lv_pct(x: number): number {
  const plain =
    x < 0
      ? LV_PCT_POS_MAX - lvClamp(x, -LV_PCT_POS_MAX, LV_PCT_POS_MAX)
      : Math.min(x, LV_PCT_POS_MAX);
  return LV_COORD_SET_SPEC(plain);
}

/** #define LV_COORD_IS_PCT(x) ((LV_COORD_IS_SPEC(x) && LV_COORD_PLAIN(x) <= LV_PCT_STORED_MAX)) */
export function LV_COORD_IS_PCT(x: number): boolean {
  return LV_COORD_IS_SPEC(x) && LV_COORD_PLAIN(x) <= LV_PCT_STORED_MAX;
}

/** #define LV_COORD_GET_PCT(x) (LV_COORD_PLAIN(x) > LV_PCT_POS_MAX ? LV_PCT_POS_MAX - LV_COORD_PLAIN(x) : LV_COORD_PLAIN(x)) */
export function LV_COORD_GET_PCT(x: number): number {
  const plain = LV_COORD_PLAIN(x);
  return plain > LV_PCT_POS_MAX ? LV_PCT_POS_MAX - plain : plain;
}

// deps/lvgl/src/layouts/grid/lv_grid.h

/** #define LV_GRID_FR(x) (LV_COORD_MAX - 100 + x) */
export function LV_GRID_FR(x: number): number {
  return LV_COORD_MAX - 100 + x;
}

/** #define LV_GRID_CONTENT (LV_COORD_MAX - 101) */
export const LV_GRID_CONTENT = LV_COORD_MAX - 101;

/** #define LV_GRID_TEMPLATE_LAST (LV_COORD_MAX) */
export const LV_GRID_TEMPLATE_LAST = LV_COORD_MAX;
