import { LV_SIZE_CONTENT, lv_pct } from "../lv_conf_macros";
import {
  type Deg,
  type FlexGrow,
  type GridCellIndex,
  IsNullishOrNaN,
  type Opacity,
  type Px,
  type PxOrPercent,
  type Scale,
  type Time,
} from "./type";
export { colorTransform } from "./color";

/** deps/lvgl/src/misc/lv_color.h - LV_OPA_COVER */
const LV_OPA_COVER = 255;
/** deps/lvgl/src/misc/lv_style.h - LV_IMG_ZOOM_NONE */
const LV_IMG_ZOOM_NONE = 256;

// Contract: every Normalize* function maps nullish and NaN input to null,
// never NaN. Callers outside the batch path (CSS composite payloads,
// transition side-channel, future consumers) can rely on a `!== null` check.
// StyleBatch.push additionally drops NaN as a defense-in-depth gate.

// -?(?:\d+\.?\d*|\.\d+) accepts CSS-style decimals like ".5" and "-.5".
const RE_NUM_UNITLESS = /^(-?(?:\d+\.?\d*|\.\d+))$/;
const RE_NUM_PX = /^(-?(?:\d+\.?\d*|\.\d+))(px)?$/;
const RE_NUM_DEG = /^(-?(?:\d+\.?\d*|\.\d+))(deg)?$/;
// % suffix required (unlike px's optional suffix) so bare "50" is px, not percent.
const RE_NUM_PERCENT = /^(-?(?:\d+\.?\d*|\.\d+))%$/;
// Suffix required (unlike px's optional suffix) so "5s" and "100ms" stay distinct;
// try ms before s. Bare strings fall back to RE_NUM_UNITLESS in NormalizeTime.
const RE_NUM_MS = /^(-?(?:\d+\.?\d*|\.\d+))ms$/;
const RE_NUM_S = /^(-?(?:\d+\.?\d*|\.\d+))s$/;

function parseSuffixed(
  value: number | string | null | undefined,
  reg: RegExp = RE_NUM_UNITLESS,
): number | null {
  if (IsNullishOrNaN(value)) return null;
  if (typeof value === "number") return value;
  const num = Number(value.trim().match(reg)?.[1]);
  return Number.isNaN(num) ? null : num;
}

function excludeNegative(num: number | null): number | null {
  if (num == null || num < 0) return null;
  return num;
}

/** Non-negative px lengths (e.g. font-size, width). Rejects negative numbers. */
export function NormalizePositivePx(value: Px): number | null {
  return excludeNegative(parseSuffixed(value, RE_NUM_PX));
}

/** Signed px lengths (e.g. translate, shadow offset, letter-spacing). */
export function NormalizePx(value: Px): number | null {
  return parseSuffixed(value, RE_NUM_PX);
}

// NormalizeCoord has three paths that cannot share one parseSuffixed call:
// - "auto" (trimmed) -> LV_SIZE_CONTENT
// - number -> excludeNegative
// - string -> parse signed px/%, then excludeNegative before lv_pct
// Negative numbers and negative px/% strings all return null (unlike NormalizePx).
// TODO: decide whether left/top should accept negative coords.
export function NormalizeCoord(value: PxOrPercent): number | null {
  if (IsNullishOrNaN(value)) return null;
  if (typeof value === "number") return excludeNegative(value);
  if (value.trim() === "auto") return LV_SIZE_CONTENT;

  const px = excludeNegative(parseSuffixed(value, RE_NUM_PX));
  if (px != null) return px;

  const pct = excludeNegative(parseSuffixed(value, RE_NUM_PERCENT));
  if (pct != null) return lv_pct(pct);

  return null;
}

export function NormalizeEnum<T extends Record<string, number | string>>(
  map: T,
  value: keyof T | string | null | undefined,
): T[keyof T] | null {
  if (IsNullishOrNaN(value) || !(value in map)) {
    return null;
  }
  return map[value as keyof T];
}

export function NormalizeEnumDefault<T extends Record<string, number | string>>(
  map: T,
  value: keyof T | string | null | undefined,
  defaultValue: T[keyof T],
): T[keyof T] {
  const normalized = NormalizeEnum(map, value);
  if (normalized === null) {
    return defaultValue;
  }
  return normalized;
}

// Numbers are already in ms. Strings: ms suffix, then s (* 1000), then unitless
// fallback (treated as ms, same as a bare number).
// Deliberate behavior change: NormalizeTime(0) returns 0 instead of null
// (the old `!value` check conflated falsy with invalid). Callers in trans.ts
// use `?? 0`, so the final transition tuple is identical.
export function NormalizeTime(value: Time): number | null {
  if (IsNullishOrNaN(value)) return null;
  if (typeof value === "number") return value;
  const ms = parseSuffixed(value, RE_NUM_MS);
  if (ms != null) return ms;
  const sec = parseSuffixed(value, RE_NUM_S);
  if (sec != null) return sec * 1000;
  return parseSuffixed(value, RE_NUM_UNITLESS);
}

export function NormalizeOpacity(value: Opacity): number | null {
  const num = parseSuffixed(value);
  if (num == null) return null;
  if (num > 1) return LV_OPA_COVER;
  if (num <= 0) return 0;
  return Math.floor(num * LV_OPA_COVER);
}

export function NormalizeScale(value: Scale): number | null {
  const num = parseSuffixed(value);
  if (num == null) return null;
  return Math.floor(num * LV_IMG_ZOOM_NONE);
}

export function NormalizeDeg(value: Deg): number | null {
  return parseSuffixed(value, RE_NUM_DEG);
}

function parseUnitlessInteger(
  value: number | string | null | undefined,
): number | null {
  const num =
    typeof value === "number" ? value : parseSuffixed(value, RE_NUM_UNITLESS);
  if (num == null || !Number.isInteger(num)) return null;
  return num;
}

/** LVGL flex-grow: 0 disables grow; non-negative integers only. */
export function NormalizeFlexGrow(
  value: FlexGrow | null | undefined,
): number | null {
  if (IsNullishOrNaN(value)) return null;
  const num = parseUnitlessInteger(value);
  if (num == null || num < 0) return null;
  return num;
}

/** Grid line index (0-based); non-negative integers only. */
export function NormalizeGridCellPos(
  value: GridCellIndex | null | undefined,
): number | null {
  if (IsNullishOrNaN(value)) return null;
  const num = parseUnitlessInteger(value);
  if (num == null || num < 0) return null;
  return num;
}

/** Grid span; positive integers only (default 1 in grid pipe when omitted). */
export function NormalizeGridCellSpan(
  value: GridCellIndex | null | undefined,
): number | null {
  if (IsNullishOrNaN(value)) return null;
  const num = parseUnitlessInteger(value);
  if (num == null || num < 1) return null;
  return num;
}

export function NormalizeBoolean(value: boolean | null | undefined): boolean {
  return !!value;
}
