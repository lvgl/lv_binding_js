import { setStyle, handleEvent, styleGetterProp, EVENTTYPE_MAP, STYLE_TYPE } from '../config'

const bridge = globalThis.SJSJSBridge
const NativeSlider = bridge.NativeRender.NativeComponents.Slider

function setSliderProps(comp, newProps, oldProps) {
    const setter = {
        set style(styleSheet) {
            setStyle({ comp, styleSheet, compName: 'Slider', styleType: STYLE_TYPE.PART_MAIN, oldStyleSheet: oldProps.style });
        },
        set scrollbarStyle (styleSheet) {
            setStyle({ comp, styleSheet, compName: 'Slider', styleType: STYLE_TYPE.PART_SCROLLBAR, oldStyleSheet: oldProps.scrollbarStyle });
        },
        set onScrollbarPressedStyle (styleSheet) {
            setStyle({ comp, styleSheet, compName: 'Slider', styleType: STYLE_TYPE.PART_SCROLLBAR | STYLE_TYPE.STATE_PRESSED, oldStyleSheet: oldProps.onScrollbarPressedStyle });
        },
        set indicatorStyle (styleSheet) {
            setStyle({ comp, styleSheet, compName: 'Slider', styleType: STYLE_TYPE.PART_INDICATOR, oldStyleSheet: oldProps.indicatorStyle});
        },
        set onIndicatorPressedStyle (styleSheet) {
            setStyle({ comp, styleSheet, compName: 'Slider', styleType: STYLE_TYPE.PART_INDICATOR | STYLE_TYPE.STATE_PRESSED, oldStyleSheet: oldProps.onIndicatorPressedStyle });
        },
        set onPressedStyle (styleSheet) {
            setStyle({ comp, styleSheet, compName: "Slider", styleType: STYLE_TYPE.STATE_PRESSED, oldStyleSheet: oldProps.onPressedStyle });
        },
        set knobStyle (styleSheet) {
            setStyle({ comp, styleSheet, compName: "Slider", styleType: STYLE_TYPE.PART_KNOB, oldStyleSheet: oldProps.knobStyle });
        },
        set onKnobPressedStyle (styleSheet) {
            setStyle({ comp, styleSheet, compName: "Slider", styleType: STYLE_TYPE.PART_KNOB | STYLE_TYPE.STATE_PRESSED, oldStyleSheet: oldProps.onKnobPressedStyle});
        },
        set onChange (fn) {
            handleEvent(comp, fn, EVENTTYPE_MAP.EVENT_VALUE_CHANGED);
        },
        set range (arr) {
            if (!Array.isArray(arr)) return
            const [min, max] = arr
            if (min === oldProps.range?.[0] && max === oldProps.range?.[1]) return
            if (isNaN(min) || isNaN(max)) return
            comp.setRange([min, max])
        },
        set value (val) {
            if (isNaN(val)) return
            if (val == oldProps.value) return
            comp.setValue(val)
        },
        set align ({
            type,
            pos = [0, 0]
        }) {
            if (!type || (type === oldProps.align?.type && newProps.align?.pos?.[0] === oldProps.align?.pos?.[0] && newProps.align?.pos?.[1] === oldProps.align?.pos?.[1])) return
            comp.align(type, pos)
        },
        set alignTo ({
            type,
            pos = [0, 0],
            parent
        }) {
            if (!type || (type === oldProps.alignTo?.type && newProps.alignTo?.pos?.[0] === oldProps.alignTo?.pos?.[0] && newProps.alignTo?.pos?.[1] === oldProps.alignTo?.pos?.[1] && parent?.uid === oldProps.alignTo?.parent?.uid)) return
            comp.alignTo(type, pos, parent)
        }
    }
    Object.assign(setter, newProps);
    comp.dataset = {}
    Object.keys(newProps).forEach(prop => {
        const index = prop.indexOf('data-')
        if (index === 0) {
            comp.dataset[prop.substring(5)] = newProps[prop]
        }
    })
}
  
export class SliderComp extends NativeSlider {
    constructor ({ uid }) {
        super({ uid })
        this.uid = uid

        const style = super.style
        const that = this
        this.style = new Proxy(this, {
            get (obj, prop) {
                if (styleGetterProp.includes(prop)) {
                    return style[prop].call(that)
                }
            }
        })
    }
    setProps(newProps, oldProps) {
        setSliderProps(this, newProps, oldProps);
    }
    insertBefore(child, beforeChild) {
    }
    static tagName = "Slider";
    appendInitialChild(child) {
    }
    appendChild(child) {
        super.appendChild(child)
    }
    removeChild(child) {
        super.removeChild(child);
    }
    close () {
    }
    setStyle (style, type = 0x0000) {
        setStyle({ comp: this, styleSheet: style, compName: "Slider", styleType: type, oldStyleSheet: null, isInit: false })
    }
    moveToFront () {
        super.moveToFront()
    }
    moveToBackground () {
        super.moveToBackground()
    }
    scrollIntoView () {
        super.scrollIntoView()
    }
}