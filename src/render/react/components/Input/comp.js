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

function setInputProps(comp, newProps, oldProps) {
    const setter = {
        set placeholder (str) {
            if (str !== oldProps.placeholder) {
                comp.setPlaceHolder(str)  
            }
        },
        set style(styleSheet) {
            console.log(222, styleSheet === oldProps.style)
            setStyle({ comp, styleSheet, compName: "Input", styleType: 0x0000, oldStyleSheet: oldProps.style, defaultStyle });
        },
        set onChange (fn) {
            handleEvent(comp, fn, EVENTTYPE_MAP.EVENT_VALUE_CHANGED);
        },
        set onFocus (fn) {
            handleEvent(comp, fn, EVENTTYPE_MAP.EVENT_FOCUSED);
        },
        set focusStyle (styleSheet) {
            setStyle({ comp, defaultStyle: defaultFocusStyle, compName: "Input", styleType: 0x0002, oldStyleSheet: oldProps.focusStyle, styleSheet });
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
            if (!type || (type === oldProps.align?.type && pos[0] === oldProps.align?.pos[0] && pos[1] === oldProps.align?.pos[1] && parent === oldProps.align?.parent)) return
            comp.alignTo(type, pos, parent)
        }
    }
    Object.assign(setter, { style: defaultStyle, focusStyle: defaultFocusStyle }, newProps);
    comp.dataset = {}
    Object.keys(newProps).forEach(prop => {
        const index = prop.indexOf('data-')
        if (index === 0) {
            comp.dataset[prop.substring(5)] = newProps[prop]
        }
    })
}
  
export class InputComp extends NativeView {
    constructor ({ uid }) {
        super({ uid })
        this.uid = uid

        super.setOneLine(true)

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
        setInputProps(this, newProps, oldProps);
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
        setStyle({ comp: this, styleSheet: style, compName: "Input", styleType: type, oldStyleSheet: null, isInit: false })
    }
}