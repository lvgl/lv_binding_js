import { ProcessPx, ProcessPxOrPercent, ProcessEnum, ProcessColor } from './util'
import { FontStyle } from './font'
import { ScrollStyle } from './scroll'
import { OpacityStyle } from './opacity'
import { MiscStyle } from './misc'
import { TransStyle } from './trans'

// normal
function NormalStyle (style, result) {
    const keys = Object.keys(style)

    const obj = {
        'height': ProcessPxOrPercent,
        'width': ProcessPxOrPercent,
        'left': ProcessPxOrPercent,
        'top': ProcessPxOrPercent,
        'background-color': ProcessColor,
        'background-grad-color': ProcessColor,
        'background-grad-color-dir': ProcessEnum({
            'none': 0,
            'vertical': 1,
            'horizontal': 2,
        }),
        'padding-left': ProcessPx,
        'padding-right': ProcessPx,
        'padding-top': ProcessPx,
        'padding-bottom': ProcessPx,
        'border-radius': ProcessPx,
        'border-width': ProcessPx,
        'border-color': ProcessColor,
        'border-side': ProcessEnum({
            left: 0x04,
            right: 0x08,
            full: 0x0F,
            top: 0x02,
            bottom: 0x01,
        }),
        'outline-width': ProcessPx,
        'outline-color': ProcessColor,
        'outline-padding': ProcessPxOrPercent,
        'font-size': ProcessPx,
        'text-color': ProcessColor,
        'letter-spacing': ProcessPx
    }

    keys.forEach(key => {
        if (obj[key]) {
            obj[key](key, style[key], result)
        }
    })

    return result
}

function AbbreviationStyle (style, result) {
    const keys = Object.keys(style)

    const obj = {
        'padding': ['padding-left', 'padding-top', 'padding-right', 'padding-bottom'],
    }

    keys.forEach(key => {
        if (obj[key]) {
            const value = style[key]
            const styleKeys = obj[key]
            if (typeof value == 'number') {
                styleKeys.forEach(styleKey => {
                    result[styleKey] = value
                })
            } else if (typeof value == 'string') {
                const values = value.split(/\s/)
                const len = values.length
                switch (len) {
                    case 1:
                        ProcessPx(styleKeys[0], values[0], result)
                        ProcessPx(styleKeys[2], values[0], result)
                        ProcessPx(styleKeys[1], values[0], result)
                        ProcessPx(styleKeys[3], values[0], result)
                    case 2:
                        ProcessPx(styleKeys[0], values[1], result)
                        ProcessPx(styleKeys[2], values[1], result)
                        ProcessPx(styleKeys[1], values[0], result)
                        ProcessPx(styleKeys[3], values[0], result)
                    case 4:
                        ProcessPx(styleKeys[0], values[0], result)
                        ProcessPx(styleKeys[1], values[1], result)
                        ProcessPx(styleKeys[2], values[2], result)
                        ProcessPx(styleKeys[3], values[3], result)
                    case 3:
                        ProcessPx(styleKeys[1], values[0], result)
                        ProcessPx(styleKeys[0], values[1], result)
                        ProcessPx(styleKeys[2], values[1], result)
                        ProcessPx(styleKeys[3], values[2], result)
                }
            }
        }
    })
    return result
}

function FlexStyle (style, result) {
    if (style.display !== 'flex') return result

    let flexFlow = 0x00
    const flexDirection = style['flex-direction'] || 'row'
    const flexWrap = style['flex-wrap'] || 'nowrap'
    
    const flexFlowObj = {
        'row_nowrap': 0x00,
        'column_nowrap': 1 << 0,
        'row_wrap': 0x00 | 1 << 2,
        'column_wrap': 1 << 0 | 1 << 2,
        'row_wrap-reverse': 0x00 | 1 << 2 | 1 << 3,
        'column_wrap-reverse': 1 << 0 | 1 << 2 | 1 << 3,
        'row_reverse': 0x00 | 1 << 3,
        'column_reverse': 0x00 | 1 << 3
    }

    if (flexFlowObj[`${flexDirection}_${flexWrap}`]) {
        flexFlow = flexFlowObj[`${flexDirection}_${flexWrap}`]
    }
    result['flex-flow'] = flexFlow

    let mainPlace = 0
    let crossPlace = 0
    let trackCrossPlace = 0
    const justifyContent = style['justify-content']
    const alignItems = style['align-items']
    const alignContent = style['align-content'] || 'center'
    const flexAlignObj = {
        'flex-start': 0,
        'flex-end': 1,
        'center': 2,
        'space-evenly': 3,
        'space-around': 4,
        'space-between': 5
    }
    if (flexAlignObj[justifyContent]) {
        mainPlace = flexAlignObj[justifyContent]
    }
    if (flexAlignObj[alignItems]) {
        crossPlace = flexAlignObj[alignItems]
    }
    trackCrossPlace = alignContent ? flexAlignObj[alignContent] : crossPlace
    // result['flex-align'] = [mainPlace, crossPlace, trackCrossPlace]
    if (justifyContent) {
        result['justify-content'] = mainPlace
    }
    if (alignItems) {
        result['align-items'] = crossPlace
    }
    if (alignContent) {
        result['align-content'] = trackCrossPlace
    }
    if (!isNaN(style['flex-grow'])) {
        result['flex-grow'] = style['flex-grow']
    }
    return result
}

function GridStyle (style, result) {

}

class StyleSheet {
    static transformStyle;

    static pipeline (args) {
        StyleSheet.transformStyle = (style, compName) => {
            const result = args.reduce(
                (prev, func) => func(style, prev, compName),
                {}
            )
            return result
        } 
    }

    static transform(style, compName) {
        const result = StyleSheet.transformStyle(style, compName)

        return result
    }

    static create () {
        return new Proxy({ __dirty: true }, {
            set (obj, prop, value) {
                if (prop !== '__dirty') {
                    obj[prop] = value;
                    obj.__dirty = true
                } else {
                    obj.__dirty = value
                }
            }
        })
    }
}

StyleSheet.pipeline([
    NormalStyle,
    AbbreviationStyle,
    FlexStyle,
    FontStyle,
    ScrollStyle,
    OpacityStyle,
    MiscStyle,
    TransStyle
])

export default StyleSheet