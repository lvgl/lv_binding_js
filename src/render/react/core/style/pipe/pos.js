import { ProcessPxOrPercent, ProcessPx } from "../util"

const obj = {
    'height': ProcessPxOrPercent,
    'width': ProcessPxOrPercent,
    'left': ProcessPxOrPercent,
    'top': ProcessPxOrPercent,
    'row-spacing': ProcessPx,
    'column-spacing': ProcessPx,
}
const keys = Object.keys(obj)

export function PosStyle (style, result, compName) {
    keys.forEach(key => {
        if (style[key]) {
            obj[key](key, style[key], result)
        }
    })
}