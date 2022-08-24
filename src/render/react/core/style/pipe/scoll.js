import { ProcessEnum, ProcessPx, ProcessColor } from "../util"

const obj = {
    'overflow': ProcessEnum({
        'hidden': 1,
        'scroll': 0,
        'auto': 0
    }),
    'overflow-scrolling': ProcessEnum({
        'auto': 0,
        'touch': 1
    }),
}
const keys = Object.keys(obj)

export function ScrollStyle (style, result, compName) {
    keys.forEach(key => {
        if (style[key]) {
            obj[key](key, style[key], result)
        }
    })
}