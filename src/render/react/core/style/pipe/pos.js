import { ProcessPxOrPercent, ProcessPx, ProcessEnum } from "../util"

const obj = {
    'height': ProcessPxOrPercent,
    'width': ProcessPxOrPercent,
    'left': ProcessPxOrPercent,
    'top': ProcessPxOrPercent,
    'row-spacing': ProcessPx,
    'column-spacing': ProcessPx,
    'position': ProcessEnum({
        'absolute': 'absolute'
    })
}
const keys = Object.keys(obj)

export function PosStyle (style, result, compName) {
    keys.forEach(key => {
        if (style[key] !== void 0) {
            obj[key](key, style[key], result)
        }
    })
}