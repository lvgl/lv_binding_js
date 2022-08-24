import { ProcessColor, ProcessPx, ProcessPxOrPercent } from "../util"

const obj = {
    'outline-width': ProcessPx,
    'outline-color': ProcessColor,
    'outline-padding': ProcessPxOrPercent,
}
const keys = Object.keys(obj)

export function OutlineStyle (style, result, compName) {
    keys.forEach(key => {
        if (style[key]) {
            obj[key](key, style[key], result)
        }
    })
}