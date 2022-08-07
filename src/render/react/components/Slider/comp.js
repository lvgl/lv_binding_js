import { setStyle, handleEvent, unRegistEvent, EVENTTYPE_MAP } from '../config'

const bridge = globalThis.SJSJSBridge
const NativeSlider = bridge.NativeRender.NativeComponents.Slider

function setSliderProps(comp, newProps, oldProps) {
    const setter = {
        set style(styleSheet) {
            setStyle(comp, styleSheet, 'Slider', 0x0000, oldProps.style);
        },
        set scrollbarStyle (styleSheet) {
            setStyle(comp, styleSheet, 'Slider', 0x010000, oldProps.scrollbarStyle);
        },
        set onScrollbarPressedStyle (styleSheet) {
            setStyle(comp, styleSheet, 'Slider', 0x010000 | 0x0020, oldProps.onScrollbarPressedStyle);
        },
        set indicatorStyle (styleSheet) {
            setStyle(comp, styleSheet, 'Slider', 0x020000, oldProps.indicatorStyle);
        },
        set onIndicatorPressedStyle (styleSheet) {
            setStyle(comp, styleSheet, 'Slider', 0x020000 | 0x0020, oldProps.onIndicatorPressedStyle);
        },
        set onPressedStyle (styleSheet) {
            setStyle(comp, styleSheet, "Slider", 0x0020, oldProps.onPressedStyle);
        },
        set knobStyle (styleSheet) {
            setStyle(comp, styleSheet, "Slider", 0x030000, oldProps.knobStyle);
        },
        set onKnobPressedStyle (styleSheet) {
            setStyle(comp, styleSheet, "Slider", 0x030000 | 0x0020, oldProps.onKnobPressedStyle);
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
        set initalValue (val) {
            if (isNaN(val)) return
            if (val == oldProps.initalValue) return
            comp.setValue(val)
        },
        set align ({
            type,
            pos = [0, 0]
        }) {
            if (!type || (type === oldProps.align?.type && pos[0] === oldProps.align?.pos[0] && pos[1] === oldProps.align?.pos[1])) return
            comp.align(type, pos)
        },
        set alignTo ({
            type,
            pos = [0, 0],
            parent
        }) {
            if (!type || !parent || !parent.uid) return
            comp.alignTo(type, pos, parent.__proto__)
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
}