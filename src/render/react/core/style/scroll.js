

export function ScrollStyle (style, result) {
    if (style['overflow-scrolling']) {
        const obj = {
            'auto': 0,
            'touch': 1
        }

        const value = style['overflow-scrolling']

        if (obj[value] != void 0) {
            result['overflow-scrolling'] = obj[value]
        }
    } else if (style['overflow']) {
        const obj = {
            'hidden': 1,
            'scroll': 0,
            'auto': 0
        }

        const value = style['overflow']

        if (obj[value] != void 0) {
            result['overflow'] = obj[value]
        }
    }

    return result
}