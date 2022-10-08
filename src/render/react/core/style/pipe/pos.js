import { ProcessPxOrPercent, ProcessPx, ProcessEnum } from "../util"

const obj = {
    'height': ProcessPxOrPercent,
    'max-height': ProcessPxOrPercent,
    'min-height': ProcessPxOrPercent,
    'width': ProcessPxOrPercent,
    'max-width': ProcessPxOrPercent,
    'min-width': ProcessPxOrPercent,
    'left': ProcessPxOrPercent,
    'top': ProcessPxOrPercent,
    'row-spacing': ProcessPxOrPercent,
    'column-spacing': ProcessPxOrPercent,
    'position': ProcessEnum({
        'absolute': 'absolute',
        'fixed': 'fixed'
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