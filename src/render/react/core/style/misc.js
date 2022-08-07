import { ProcessColor, } from './util'

export function MiscStyle (style, result, compName) {
    if (style['display'] == 'none') {
        result['display'] = 'none'
    }
    if (style['recolor'] && compName === 'Image') {
        ProcessColor('recolor', style['recolor'], result)
    }

    return result
}