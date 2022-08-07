import { setStyle, handleEvent, EVENTTYPE_MAP, unRegistEvent } from '../config'

const bridge = globalThis.SJSJSBridge;
const NativeText = bridge.NativeRender.NativeComponents.Text

function setTextProps(comp, newProps, oldProps) {
    const setter = {
        set children(str) {
            const type = typeof str
            if ((type == 'string' || type == 'number') && oldProps.children !== str) {
                comp.setText(String(str));
            } else if (Array.isArray(str)) {
                const isStringArr = str.every(item => (typeof item === 'string' || typeof item === 'number'))
                if (isStringArr) {
                    comp.setText(str.join(""))
                }
            }
        },
        set style(styleSheet) {
            setStyle(comp, styleSheet, "Text", 0x0000, oldProps.style);
        },
        set onPressedStyle (styleSheet) {
            setStyle(comp, styleSheet, "Text", 0x0020, oldProps.onPressedStyle);
        },
        set onClick (fn) {
            handleEvent(comp, fn, EVENTTYPE_MAP.EVENT_CLICKED);
        },
        set onPressed (fn) {
            handleEvent (comp, fn, EVENTTYPE_MAP.EVENT_PRESSED);
        },
        set onLongPressed (fn) {
            handleEvent (comp, fn, EVENTTYPE_MAP.EVENT_LONG_PRESSED);
        },
        set onLongPressRepeat (fn) {
            handleEvent (comp, fn, EVENTTYPE_MAP.EVENT_LONG_PRESSED_REPEAT);
        },
        set align ({
            type,
            pos = [0, 0]
        }) {
            if (!type) return
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
  
export class TextComp extends NativeText {
    constructor ({ uid }) {
        super({ uid })
        this.uid = uid
    }
    setProps(newProps, oldProps) {
        setTextProps(this, newProps, oldProps);
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
}