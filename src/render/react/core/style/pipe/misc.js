import { ProcessColor } from '../util'

export function MiscStyle (style, result, compName) {
    if (style['display'] == 'none') {
        result['display'] = 'none'
    }
    if (style['recolor'] && compName === 'Image') {
        ProcessColor('recolor', style['recolor'], result)
    }
    if (style['style-transition-time']) {
        const value = style['style-transition-time']
        if (!isNaN(value)) {
            result['style-transition-time'] = value
        }
    }

    return result
}