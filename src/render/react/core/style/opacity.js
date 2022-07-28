function NormalizeOpacity (value) {
    if (isNaN(value) || value > 1) return 255
    if (value < 0) return 0
    return Math.floor(value * 255)
}

export function OpacityStyle (style, result, compName) {
    if (style['opacity']) {
        if (compName === "Image") {
            result['img-opacity'] = NormalizeOpacity(style['opacity'])
        } else {
            result['opacity'] = NormalizeOpacity(style['opacity'])
        }
    } else if (style['border-opacity']) {
        result['opacity'] = NormalizeOpacity(style['opacity'])
    } else if (style['outline-opacity']) {
        result['outline-opacity'] = NormalizeOpacity(style['outline-opacity'])
    }

    return result
}