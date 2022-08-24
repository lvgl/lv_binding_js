import { ProcessPx } from '../util'

const keys = ['padding-left', 'padding-top', 'padding-right', 'padding-bottom']

export function PaddingStyle (style, result, compName) {
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
                case 2:
                    ProcessPx(keys[0], values[1], result)
                    ProcessPx(keys[2], values[1], result)
                    ProcessPx(keys[1], values[0], result)
                    ProcessPx(keys[3], values[0], result)
                case 4:
                    ProcessPx(keys[0], values[0], result)
                    ProcessPx(keys[1], values[1], result)
                    ProcessPx(keys[2], values[2], result)
                    ProcessPx(keys[3], values[3], result)
                case 3:
                    ProcessPx(keys[1], values[0], result)
                    ProcessPx(keys[0], values[1], result)
                    ProcessPx(keys[2], values[1], result)
                    ProcessPx(keys[3], values[2], result)
            }
        }
    }

    keys.forEach(key => {
        if (style[key]) {
            ProcessPx(key, style[key], result)
        }
    })

    return result
}