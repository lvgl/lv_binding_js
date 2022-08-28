import { setStyle, handleEvent, EVENTTYPE_MAP, styleGetterProp } from '../config'

const bridge = globalThis.SJSJSBridge;
const NativeView = bridge.NativeRender.NativeComponents.Keyboard

const modes = {
    'lower': 0,
    'upper': 1,
    'special': 2,
    'number': 3
}

function setKeyboardProps(comp, newProps, oldProps) {
    const setter = {
        set mode (mode) {
            if (mode !== oldProps.mode && modes[mode]) {
                comp.setMode(modes[mode])
            }
        },
        set textarea (textarea) {
            if (textarea?.uid !== oldProps.textarea?.uid) {
                comp.setTextarea(textarea)
            }
        },
        set style(styleSheet) {
            setStyle({comp, styleSheet, compName: "Keyboard", styleType: 0x0000, oldStyleSheet: oldProps.style });
        },
        set onChange (fn) {
            handleEvent(comp, fn, EVENTTYPE_MAP.EVENT_VALUE_CHANGED);
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
    Object.assign(setter, { style: {}, focusStyle: {}, ...newProps });
    comp.dataset = {}
    Object.keys(newProps).forEach(prop => {
        const index = prop.indexOf('data-')
        if (index === 0) {
            comp.dataset[prop.substring(5)] = newProps[prop]
        }
    })
}
  
export class KeyboardComp extends NativeView {
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
        setKeyboardProps(this, newProps, oldProps);
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
        setStyle({ comp: this, styleSheet: style, compName: "Keyboard", styleType: type, oldStyleSheet: {}, isInit: false })
    }
}