import { setStyle, handleEvent, EVENTTYPE_MAP, styleGetterProp } from '../config'

const bridge = globalThis.SJSJSBridge;
const NativeText = bridge.NativeRender.NativeComponents.Text

const defaultStyle = {
    'color': 'black',
}

const defaultOnPressedStyle= {
    'color': 'black',
}

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
            setStyle({ comp, styleSheet, compName: "Text", styleType: 0x0000, oldStyleSheet: oldProps.style, defaultStyle });
        },
        set onPressedStyle (styleSheet) {
            setStyle({ comp, styleSheet, compName: "Text", styleType: 0x0020, oldStyleSheet: oldProps.onPressedStyle, defaultStyle: defaultOnPressedStyle });
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
    setStyle (style, type = 0x0000) {
        setStyle({ comp: this, styleSheet: style, compName: "Text", styleType: type, oldStyleSheet: {}, isInit: false })
    }
}