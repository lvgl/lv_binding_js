import { StyleBatch, type StyleTransformResult } from "./batch";
import {
  NATIVE_STYLE_PROP_INTM as STYLE_PROP,
  type NativeStylePropIntmKey,
} from "../style_prop";
import { StylePropKeyUnpackId } from "../style_prop_value_kind";

const PROP_ID_TO_KEY = new Map<number, NativeStylePropIntmKey>();
for (const [key, id] of Object.entries(STYLE_PROP)) {
  const propId = id as number;
  if (!PROP_ID_TO_KEY.has(propId)) {
    PROP_ID_TO_KEY.set(propId, key as NativeStylePropIntmKey);
  }
}

export function createPipeResult(): StyleTransformResult {
  return { batch: new StyleBatch() };
}

/** Decode a StyleBatch into prop-key -> value (last write wins). */
export function batchToMap(
  batch: NativeStyleBatch,
): Map<NativeStylePropIntmKey, StylePropValue> {
  const map = new Map<NativeStylePropIntmKey, StylePropValue>();
  for (let i = 0; i < batch.values.length; i++) {
    const propId = StylePropKeyUnpackId(batch.keys[i]);
    const key = PROP_ID_TO_KEY.get(propId);
    if (key) {
      map.set(key, batch.values[i]);
    }
  }
  return map;
}

/** Run one pipe stage and return decoded batch entries. */
export function runPipe<S>(
  pipe: (style: S, result: StyleTransformResult, compName?: string) => void,
  style: S,
  compName?: string,
): Map<NativeStylePropIntmKey, StylePropValue> {
  return runPipeFull(pipe, style, compName).map;
}

/** Run one pipe stage; returns batch map and full result (e.g. transition side-channel). */
export function runPipeFull<S>(
  pipe: (style: S, result: StyleTransformResult, compName?: string) => void,
  style: S,
  compName?: string,
): { map: Map<NativeStylePropIntmKey, StylePropValue>; result: StyleTransformResult } {
  const result = createPipeResult();
  pipe(style, result, compName);
  return { map: batchToMap(result.batch.get()), result };
}
