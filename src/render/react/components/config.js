
import { registEvent, unRegistEvent, EVENTTYPE_MAP } from '../core/event'
import StyleSheet from '../core/style'

const components = new Map;

let id = 1;

export const getUid = () => {
    return String(id++);
}

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

export function setStyle (comp, obj) {
    obj = Array.isArray(obj) ? obj : [obj]

    obj = obj.map(item => StyleSheet.transform(item))
    obj = Object.assign(...obj)

    const keys = Object.keys(obj)
    
    comp.setStyle(obj, keys, keys.length)
}

export function handleOnClick (comp, fn) {
    if (fn) {
        registEvent(comp.uid, EVENTTYPE_MAP.EVENT_PRESSED, fn)
        comp.addEventListener(EVENTTYPE_MAP.EVENT_PRESSED)
    } else {
        unRegistEvent(comp.uid, EVENTTYPE_MAP.EVENT_PRESSED)
        comp.removeEventListener(EVENTTYPE_MAP.EVENT_PRESSED)
    }
}