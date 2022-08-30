import { setStyle, handleEvent, EVENTTYPE_MAP, styleGetterProp, STYLE_TYPE } from '../config'

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
        set placeholder (str) {
            if (str !== oldProps.placeholder) {
                comp.setPlaceHolder(str)  
            }
        },
        // set mode (mode) {
        //     if (mode === 'password') {
        //         comp.setPasswordMode(true)
        //     } else if (oldProps.mode === 'password') {
        //         comp.setPasswordMode(false)
        //     }
        // },
        set style(styleSheet) {
            setStyle({ comp, styleSheet, compName: "Text", styleType: STYLE_TYPE.PART_MAIN, oldStyleSheet: oldProps.style });
        },
        set scrollbarStyle (styleSheet) {
            setStyle({ comp, styleSheet, compName: "View", styleType: STYLE_TYPE.PART_SCROLLBAR, oldStyleSheet: oldProps.scrollbarStyle });
        },
        set scrollbarScrollingStyle (styleSheet) {
            setStyle({ comp, styleSheet, compName: "View", styleType: STYLE_TYPE.PART_SCROLLBAR || STYLE_TYPE.STATE_SCROLLED, oldStyleSheet: oldProps.scrollbarScrollingStyle });
        },
        set onPressedStyle (styleSheet) {
            setStyle({ comp, styleSheet, compName: "Text", styleType: STYLE_TYPE.STATE_PRESSED, oldStyleSheet: oldProps.onPressedStyle });
        },
        set onClick (fn) {
            handleEvent(comp, fn, EVENTTYPE_MAP.EVENT_CLICKED);
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