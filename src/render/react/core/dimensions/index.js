const bridge = globalThis[Symbol.for('lvgljs')];
const dimensions = bridge.NativeRender.dimensions;

export const Dimensions = dimensions;
