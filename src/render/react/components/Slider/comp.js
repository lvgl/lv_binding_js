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
        set indicatorStyle (styleSheet) {
            setStyle(comp, styleSheet, 'Slider', 0x020000, oldProps.indicatorStyle);
        },
        set onPressedStyle (styleSheet) {
            setStyle(comp, styleSheet, "Slider", 0x0020, oldProps.onPressedStyle);
        },
        set knobStyle (styleSheet) {
            setStyle(comp, styleSheet, "Slider", 0x030000, oldProps.knobStyle);
        },
        set onChange (fn) {
            handleEvent(comp, fn, EVENTTYPE_MAP.EVENT_VALUE_CHANGED);
        },
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