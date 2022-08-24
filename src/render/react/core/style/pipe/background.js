import { ProcessColor, ProcessEnum } from "../util"

const obj = {
    'background-color': ProcessColor,
    'background-grad-color': ProcessColor,
    'background-grad-color-dir': ProcessEnum({
        'none': 0,
        'vertical': 1,
        'horizontal': 2,
    }),
}
const keys = Object.keys(obj)

export function BackgroundStyle (style, result, compName) {
    keys.forEach(key => {
        if (style[key]) {
            obj[key](key, style[key], result)
        }
    })
}