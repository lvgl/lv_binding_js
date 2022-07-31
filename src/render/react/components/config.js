
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

export function setStyle (comp, obj, compName, type, oldObj) {
    if (!obj) return
    obj = Array.isArray(obj) ? obj : [obj]
    oldObj = Array.isArray(oldObj) ? oldObj : [oldObj]
    const maybeChange = obj.every((item, i) => item != oldObj[i])
    if (!maybeChange) return

    obj = obj.map(item => StyleSheet.transform(item, compName))
    obj = Object.assign(...obj)

    const keys = Object.keys(obj)
    
    comp.setStyle(obj, keys, keys.length, type)
}