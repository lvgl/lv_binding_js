
import StyleSheet from '../core/style'

export { handleEvent } from '../core/event'
export { unRegistEvent, EVENTTYPE_MAP } from '../core/event'

const components = new Map;

export const getComponentByTagName = (tagName) => {
    const config = components.get(tagName);
    if (!config) {
      throw `Unknown component ${tagName}`;
    }
    return config;
};
  
export function registerComponent(
    config
) {
    if (components.has(config.tagName)) {
        throw `A component with tagName: ${config.tagName} already exists. This base component will be ignored`;
    }
    components.set(config.tagName, config);
    return config.tagName;
}

export function registerComponents(
    configs
) {
    configs.forEach(config => {
        if (components.has(config.tagName)) {
            throw `A component with tagName: ${config.tagName} already exists. This base component will be ignored`;
        }
        components.set(config.tagName, config);
    })
}

export function setStyle (comp, obj, compName, type, oldObj, isInit = true) {
    if (!obj) return
    obj = Array.isArray(obj) ? obj : [obj]
    oldObj = Array.isArray(oldObj) ? oldObj : [oldObj]
    const maybeChange = obj.some((item, i) => item !== oldObj[i])

    if (!maybeChange) return
    obj = Object.assign({}, ...obj)
    obj = StyleSheet.transform(obj, compName)

    const keys = Object.keys(obj)
    
    comp.nativeSetStyle(obj, keys, keys.length, type, isInit)
}

export const EAlignType = {
    'ALIGN_DEFAULT': 0,
    'ALIGN_TOP_LEFT': 1,
    'ALIGN_TOP_MID': 2,
    'ALIGN_TOP_RIGHT': 3,
    'ALIGN_BOTTOM_LEFT': 4,
    'ALIGN_BOTTOM_MID': 5,
    'ALIGN_BOTTOM_RIGHT': 6,
    'ALIGN_LEFT_MID': 7,
    'ALIGN_RIGHT_MID': 8,
    'ALIGN_CENTER': 9,

    'ALIGN_OUT_TOP_LEFT': 10,
    'ALIGN_OUT_TOP_MID': 11,
    'ALIGN_OUT_TOP_RIGHT': 12,
    'ALIGN_OUT_BOTTOM_LEFT': 13,
    'ALIGN_OUT_BOTTOM_MID': 14,
    'ALIGN_OUT_BOTTOM_RIGHT': 15,
    'ALIGN_OUT_LEFT_TOP': 16,
    'ALIGN_OUT_LEFT_MID': 17,
    'ALIGN_OUT_LEFT_BOTTOM': 18,
    'ALIGN_OUT_RIGHT_TOP': 19,
    'ALIGN_OUT_RIGHT_MID': 20,
    'ALIGN_OUT_RIGHT_BOTTOM': 21
}

export const styleGetterProp = ['height', 'width', 'left', 'top']