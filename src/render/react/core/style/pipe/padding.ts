import type { PaddingStyleType, Px } from "../type";
import { NormalizePx } from "../util";
import { StyleBatch, StyleTransformResult } from "../batch";

const PADDING_KEYS = [
  "padding-left",
  "padding-top",
  "padding-right",
  "padding-bottom",
] as const;

function pushPadding(
  batch: StyleBatch,
  key: typeof PADDING_KEYS[number],
  value: Px,
) {
  batch.pushKeyValue(key, NormalizePx(value));
}

export function PaddingStyle(
  style: PaddingStyleType,
  result: StyleTransformResult,
) {
  const batch = result.batch;

  for (const key of PADDING_KEYS) {
    batch.pushStyle(style, key, NormalizePx);
  }

  const padding = style.padding;
  if (padding == null) return;

  if (typeof padding === "number") {
    const normalized = NormalizePx(padding);
    if (normalized == null) return;
    for (const key of PADDING_KEYS) {
      batch.pushKeyValue(key, normalized);
    }
    return;
  }

  const values = padding.split(/\s/).filter(Boolean);
  switch (values.length) {
    case 1:
      pushPadding(batch, PADDING_KEYS[0], values[0]);
      pushPadding(batch, PADDING_KEYS[2], values[0]);
      pushPadding(batch, PADDING_KEYS[1], values[0]);
      pushPadding(batch, PADDING_KEYS[3], values[0]);
      break;
    case 2:
      pushPadding(batch, PADDING_KEYS[0], values[1]);
      pushPadding(batch, PADDING_KEYS[2], values[1]);
      pushPadding(batch, PADDING_KEYS[1], values[0]);
      pushPadding(batch, PADDING_KEYS[3], values[0]);
      break;
    case 4:
      pushPadding(batch, PADDING_KEYS[1], values[0]);
      pushPadding(batch, PADDING_KEYS[2], values[1]);
      pushPadding(batch, PADDING_KEYS[3], values[2]);
      pushPadding(batch, PADDING_KEYS[0], values[3]);
      break;
    case 3:
      pushPadding(batch, PADDING_KEYS[1], values[0]);
      pushPadding(batch, PADDING_KEYS[0], values[1]);
      pushPadding(batch, PADDING_KEYS[2], values[1]);
      pushPadding(batch, PADDING_KEYS[3], values[2]);
      break;
  }
}
