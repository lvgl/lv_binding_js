import { LvStylePropId } from "./style_prop";

/**
 * Use the highest 2 bits of lv_style_prop_t to store the value kind to save memory and reduce cost,
 * lv_style_prop_t only used the lower 16 bits, so the highest 2 bits is free to use.
 * When we passing from QuickJS to C++, the passed number is a JSValue that can always store uint32_t.
 * So there is no data loss when storing this value kind to lv_style_prop_t.
 * In future, we can even optimize the passed (prop/value) array to use Uint32Array or Uint64Array.
 */
export enum StylePropValueKind {
  Num = 0,
  Color = 1,
  Ptr = 2,
  CSS = 3,
}

export const STYLE_PROP_VALUE_KIND_SHIFT = 30;
export const STYLE_PROP_VALUE_KIND_MASK = 0x3 << STYLE_PROP_VALUE_KIND_SHIFT;

export function StylePropKeyPack(
  propId: LvStylePropId,
  kind: StylePropValueKind,
): number {
  const propIdMasked = propId & ~STYLE_PROP_VALUE_KIND_MASK;
  const kindShifted =
    (kind << STYLE_PROP_VALUE_KIND_SHIFT) & STYLE_PROP_VALUE_KIND_MASK;
  return (propIdMasked | kindShifted) >>> 0;
}

export function StylePropKeyUnpackId(propId: number): LvStylePropId {
  return (propId & ~STYLE_PROP_VALUE_KIND_MASK) as LvStylePropId;
}

export function StylePropKeyUnpackKind(propId: number): StylePropValueKind {
  return ((propId & STYLE_PROP_VALUE_KIND_MASK) >>>
    STYLE_PROP_VALUE_KIND_SHIFT) as StylePropValueKind;
}
