import { setStyle, handleEvent, EVENTTYPE_MAP, styleGetterProp } from '../config'

const bridge = globalThis.SJSJSBridge;
const NativeView = bridge.NativeRender.NativeComponents.Keyboard

function setKeyboardProps(comp, newProps, oldProps) {
    const setter = {
        set inputbox (comp) {
            comp.setTextarea(comp)
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