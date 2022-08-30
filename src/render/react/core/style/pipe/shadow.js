import { ProcessColor, ProcessPx, ProcessPxOrPercent } from "../util"

const obj = {
    'shadow-width': ProcessPx,
    'shadow-color': ProcessColor,
    'shadow-offset-x': ProcessPx,
    'shadow-offset-y': ProcessPx,
    'shadow-spread': ProcessPx
}
const keys = Object.keys(obj)

export function ShadowStyle (style, result, compName) {
    keys.forEach(key => {
        if (style[key] !== void 0) {
            obj[key](key, style[key], result)
        }
    })
}