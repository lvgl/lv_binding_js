import { ProcessPx } from '../util'

const keys = ['padding-left', 'padding-top', 'padding-right', 'padding-bottom']

export function PaddingStyle (style, result, compName) {
    keys.forEach(key => {
        if (style[key] !== void 0) {
            ProcessPx(key, style[key], result)
        }
    })

    if (style['padding']) {
        const value = style['padding']
        if (typeof value == 'number') {
            keys.forEach(styleKey => {
                result[styleKey] = value
            })
        } else if (typeof value == 'string') {
            const values = value.split(/\s/)
            const len = values.length
            switch (len) {
                case 1:
                    ProcessPx(keys[0], values[0], result)
                    ProcessPx(keys[2], values[0], result)
                    ProcessPx(keys[1], values[0], result)
                    ProcessPx(keys[3], values[0], result)
                    break
                case 2:
                    ProcessPx(keys[0], values[1], result)
                    ProcessPx(keys[2], values[1], result)
                    ProcessPx(keys[1], values[0], result)
                    ProcessPx(keys[3], values[0], result)
                    break
                case 4:
                    ProcessPx(keys[1], values[0], result)
                    ProcessPx(keys[2], values[1], result)
                    ProcessPx(keys[3], values[2], result)
                    ProcessPx(keys[0], values[3], result)
                    break
                case 3:
                    ProcessPx(keys[1], values[0], result)
                    ProcessPx(keys[0], values[1], result)
                    ProcessPx(keys[2], values[1], result)
                    ProcessPx(keys[3], values[2], result)
                    break
            }
        }
    }
    return result
}