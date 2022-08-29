import { setStyle, handleEvent, EVENTTYPE_MAP, styleGetterProp } from '../config'

const bridge = globalThis.SJSJSBridge;
const NativeView = bridge.NativeRender.NativeComponents.Textarea

function setTextareaProps(comp, newProps, oldProps) {
    const setter = {
        set placeholder (str) {
            if (str !== oldProps.placeholder) {
                comp.setPlaceHolder(str)  
            }
        },
        set mode (mode) {
            if (mode === 'password') {
                comp.setPasswordMode(true)
            } else if (oldProps.mode === 'password') {
                comp.setPasswordMode(false)
            }
        },
        set style(styleSheet) {
            setStyle({ comp, styleSheet, compName: "Textarea", styleType: 0x0000, oldStyleSheet: oldProps.style });
        },
        set focusStyle (styleSheet) {
            setStyle({ comp, styleSheet, compName: "Textarea", styleType: 0x0002, oldStyleSheet: oldProps.focusStyle });
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
    Object.assign(setter, { ...newProps });
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
        setStyle({ comp: this, styleSheet: style, compName: "Textarea", styleType: type, oldStyleSheet: {}, isInit: false })
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