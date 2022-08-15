import { setStyle, handleEvent, styleGetterProp, EVENTTYPE_MAP } from '../config'

const bridge = globalThis.SJSJSBridge;
const NativeComp = bridge.NativeRender.NativeComponents.Window

function setWindowProps(comp, newProps, oldProps) {
    const setter = {
        set style(styleSheet) {
            setStyle({ comp, styleSheet, compName: 'Window', styleType: 0x0000, oldStyleSheet: oldProps.style});
        },
        set onPressedStyle (styleSheet) {
            setStyle({comp, styleSheet, compName: "Window", styleType: 0x0020, oldStyleSheet: oldProps.onPressedStyle});
        },
        set title (title) {
            if (oldProps.title != title) {
                comp.setTitle(title);
            }
        },
        set onClick (fn) {
            handleEvent(comp, fn, EVENTTYPE_MAP.EVENT_CLICKED);
        },
        set onPressed (fn) {
            handleEvent (comp, fn, EVENTTYPE_MAP.EVENT_PRESSED);
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

export class Window extends NativeComp {
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
        setWindowProps(this, newProps, oldProps);
    }
    insertBefore(child, beforeChild) {
    }
    appendInitialChild(child) {
        this.appendChild(child);
    }
    appendChild(child) {
        super.appendChild(child);
    }
    removeChild(child) {
        super.removeChild(child);
    }
    close () {
    }
    setStyle (style, type = 0x0000) {
        setStyle({ comp: this, styleSheet: style, compName: "Window", styleType: type, oldStyleSheet: {}, isInit: false })
    }
}