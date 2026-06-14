import {
  type LvStylePropId,
  LvStylePropKindMap,
  NATIVE_STYLE_PROP_INTM as STYLE_PROP,
  NativeStylePropIntmKey,
} from "../style_prop";
import { StylePropKeyPack, StylePropValueKind } from "../style_prop_value_kind";
import { NormalizeEnum } from "./util";
export { STYLE_PROP };

export const BATCH_DEFAULT_CAPACITY = 512;
export const BATCH_KEY_BYTES = 4;
export const BATCH_MAX_BYTES = BATCH_DEFAULT_CAPACITY * BATCH_KEY_BYTES;

export class StyleBatch {
  private buffer: ArrayBuffer;
  private values: StylePropValue[] = [];
  private count = 0;
  private keys: Uint32Array;

  constructor(maxBytes = BATCH_MAX_BYTES) {
    this.buffer = new ArrayBuffer(0, { maxByteLength: maxBytes });
    this.keys = new Uint32Array(this.buffer);
  }

  push(propId: LvStylePropId, valueRaw: StylePropValue): boolean {
    if (valueRaw == null) {
      return true;
    }
    const kind = LvStylePropKindMap[propId];
    if (kind === undefined) {
      return true;
    }
    let value = valueRaw;
    if (kind === StylePropValueKind.Num || kind === StylePropValueKind.Color) {
      value = Number(value);
    }
    // Central NaN gate: also covers CSS-kind scalar numbers (img-rotate,
    // img-scaleX/Y, chart-scaleX/Y). Numbers nested in CSS arrays (grid-template,
    // img-origin) are NOT seen here; their producers must return null instead.
    if (typeof value === "number" && Number.isNaN(value)) {
      return true;
    }
    const packedKey = StylePropKeyPack(propId, kind);
    const newCount = this.count + 1;
    try {
      this.buffer.resize(newCount * BATCH_KEY_BYTES);
    } catch {
      console.log(
        `Allocate style batch for newCount:${newCount} failed as no more space in the buffer maxByteLength:${this.buffer.maxByteLength}`,
      );
      this.buffer = new ArrayBuffer(0, { maxByteLength: 0 });
      this.values = [];
      return false;
    }
    this.keys[this.count] = packedKey;
    this.values.push(value);
    this.count = newCount;
    return true;
  }

  pushKeyValue(key: NativeStylePropIntmKey, value: StylePropValue): boolean {
    return this.push(STYLE_PROP[key], value);
  }

  /** Reads style[key] and pushes it under the same-named prop id after normalizing. */
  pushStyle<S, K extends NativeStylePropIntmKey & keyof S>(
    style: S,
    key: K,
    normalize: (value: S[K]) => StylePropValue,
  ): boolean {
    return this.push(STYLE_PROP[key], normalize(style[key]));
  }

  /** Like pushStyle, but normalizes via NormalizeEnum(map, style[key]). */
  pushStyleEnum<
    S,
    K extends NativeStylePropIntmKey & keyof S,
    M extends Record<string, number | string>,
  >(style: S, key: K, map: M): boolean {
    return this.pushStyle(style, key, (v) =>
      NormalizeEnum(map, v as keyof M | string | null | undefined),
    );
  }

  get(): NativeStyleBatch {
    return {
      // This is needed to ensure keys is refreshed with underlying buffer
      keys: new Uint32Array(this.buffer),
      values: this.values,
    };
  }
}

/** Side-channel for transition data; not enumerated as a string key on result. */
export type StyleTransformResult = {
  batch: StyleBatch;
  transition?: NativeStylePropTransition;
};
