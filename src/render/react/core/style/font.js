const builtInFontList = [8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40, 42, 44, 46, 48]

const TextOverFlowObj = {
    'ellipsis': 1,
    'clip': 4,
    'auto': 0,
    'scroll': 2,
    'circular': 3
}

export function FontStyle (style, result) {
    if (style['font-size']) {
        let size = style['font-size']

        if (typeof size == 'string') {
            const reg = /(\d+\.?\d*)(px)?$/
            size = size.replace(/(^\s*)|(\s*$)/g, "").match(reg)?.[1]
        }

        if (isNaN(size)) return result

        if (size % 2 == 1) {
            size += 1
        }
        size = Math.min(builtInFontList[builtInFontList.length - 1], Math.max(builtInFontList[0], size))
        
        result['font-size'] = builtInFontList.indexOf(size)
    }

    if (style['text-overflow']) {
        const value = style['text-overflow']

        if (TextOverFlowObj[value]) {
            result['text-overflow'] = TextOverFlowObj[value]
        }
    }

    return result
}