import { ProcessColor, ProcessPx, ProcessPxOrPercent } from "../util"

const obj = {
    'line-width': ProcessPx,
    'line-color': ProcessColor,
}
const keys = Object.keys(obj)

export function LineStyle (style, result, compName) {
    keys.forEach(key => {
        if (style[key]) {
            obj[key](key, style[key], result)
        }
    })

    if (style['line-rounded']) {
        result['line-rounded'] = Boolean(result['line-rounded'])
    }
}