import { GetBridge } from '../bridge';

const bridge = GetBridge();
const dimensions = bridge.NativeRender.dimensions;

export const Dimensions = dimensions;
