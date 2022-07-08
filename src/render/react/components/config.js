
import { registEvent, unRegistEvent } from '../core/event'

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
    const styleObj = Array.isArray(obj) ? Object.assign(...obj) : obj
    let str = StyleSheet.transform(styleObj)
    str = `#${comp.uid} {${str}}`

    comp.setStyle(str)
}

export function handleOnClick (comp, fn) {
    if (fn) {
        registEvent(comp.uid, 'click', fn)
        comp.addEventListener('click')
    } else {
        unRegistEvent(comp.uid, 'click')
        comp.removeEventListener('click')
    }
}