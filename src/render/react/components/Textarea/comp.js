import { setStyle, handleEvent, EVENTTYPE_MAP, styleGetterProp } from '../config'

const bridge = globalThis.SJSJSBridge;
const NativeView = bridge.NativeRender.NativeComponents.Textarea

const defaultStyle = {
    'border-radius': 4,
    'padding': 4,
    'border-width': '2px',
    'border-color': '#37474F',
    'border-opacity': 0.4
}

const defaultFocusStyle = {
    'border-radius': 4,
    'padding': 4,
    'border-width': '2px',
    'border-color': 'blue',
    'border-opacity': 0.4
}

function setTextareaProps(comp, newProps, oldProps) {
    const setter = {
        set style(styleSheet) {
            setStyle(comp, Array.isArray(styleSheet) ? [defaultStyle, ...styleSheet] : [defaultStyle, styleSheet], "Input", 0x0000, oldProps.style);
        },
        set focusStyle (styleSheet) {
            setStyle(comp, Array.isArray(styleSheet) ? [defaultFocusStyle, ...styleSheet] : [defaultFocusStyle, styleSheet], "Input", 0x0002, oldProps.focusStyle);
        },
        set onChange (fn) {
            handleEvent(comp, fn, EVENTTYPE_MAP.EVENT_VALUE_CHANGED);
        },
        set onFocus (fn) {
            handleEvent(comp, fn, EVENTTYPE_MAP.EVENT_FOCUSED);
        },
        set value (str) {
            if (str !== oldProps.value) {
                comp.setText(str)
            }
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
    Object.assign(setter, { style: {}, focusStyle: {}, ...newProps });
    comp.dataset = {}
    Object.keys(newProps).forEach(prop => {
        const index = prop.indexOf('data-')
        if (index === 0) {
            comp.dataset[prop.substring(5)] = newProps[prop]
        }
    })
}
  
export class TextareaComp extends NativeView {
    constructor ({ uid }) {
        super({ uid })
        this.uid = uid

        super.setOneLine(false)

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
        setTextareaProps(this, newProps, oldProps);
    }
    insertBefore(child, beforeChild) {
    }
    appendInitialChild(child) {
    }
    appendChild(child) {
    }
    removeChild(child) {
    }
    close () {
    }
    setStyle (style, type = 0x0000) {
        setStyle(this, style, "Textarea", type, {}, false)
    }
}