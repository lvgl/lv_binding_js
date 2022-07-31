
export function MiscStyle (style, result, compName) {
    if (style.display == 'none') {
        result['display'] = 'none'
    }

    return result
}