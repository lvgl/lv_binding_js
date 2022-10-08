import { setStyle, handleEvent, EVENTTYPE_MAP, styleGetterProp } from '../config'
import { CommonComponentApi } from '../common/index'

const bridge = globalThis.SJSJSBridge;
const NativeView = bridge.NativeRender.NativeComponents.Textarea

function setInputProps(comp, newProps, oldProps) {
    const setter = {
        ...CommonComponentApi({ compName: 'Input', comp, newProps, oldProps }),
        placeholder (str) {
            if (str !== oldProps.placeholder) {
                comp.setPlaceHolder(str)  
            }
        },
        mode (mode) {
            if (mode == oldProps.mode) return
            if (mode === 'password') {
                comp.setPasswordMode(true)
            } else if (oldProps.mode === 'password') {
                comp.setPasswordMode(false)
            }
        },
        maxlength (len) {
            if (len === oldProps.maxlength) return
            comp.setMaxLength(len)
        },
        onChange (fn) {
            handleEvent(comp, fn, EVENTTYPE_MAP.EVENT_VALUE_CHANGED);
        },
        onFocus (fn) {
            handleEvent(comp, fn, EVENTTYPE_MAP.EVENT_FOCUSED);
        },
        onBlur (fn) {
            handleEvent(comp, fn, EVENTTYPE_MAP.EVENT_DEFOCUSED);
        },
        onFocusStyle (styleSheet) {
            setStyle({ comp, compName: "Input", styleType: 0x0002, oldStyleSheet: oldProps.onFocusStyle, styleSheet });
        },
        value (str) {
            if (str !== oldProps.value) {
                comp.setText(str)
            }
        },

    }
    Object.keys(setter).forEach(key => {
        if (newProps[key]) {
            setter[key](newProps[key])
        }
    })
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
        super.close()
    }
    setStyle (style, type = 0x0000) {
        setStyle({ comp: this, styleSheet: style, compName: "Input", styleType: type, oldStyleSheet: null, isInit: false })
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