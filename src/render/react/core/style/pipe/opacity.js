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
    }
    if (style['border-opacity']) {
        result['border-opacity'] = NormalizeOpacity(style['border-opacity'])
    }
    if (style['outline-opacity']) {
        result['outline-opacity'] = NormalizeOpacity(style['outline-opacity'])
    } 
    if (style['recolor-opacity'] && compName === 'Image') {
        result['recolor-opacity'] = NormalizeOpacity(style['recolor-opacity'])
    }
    if (style['shadow-opacity']) {
        result['shadow-opacity'] = NormalizeOpacity(style['shadow-opacity'])
    }

    return result
}