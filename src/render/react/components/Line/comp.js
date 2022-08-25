import { setStyle, handleEvent, styleGetterProp, EVENTTYPE_MAP } from '../config'

const bridge = globalThis.SJSJSBridge
const NativeLine = bridge.NativeRender.NativeComponents.Line

function setLineProps(comp, newProps, oldProps) {
    const setter = {
        set style(styleSheet) {
            setStyle({ comp, styleSheet, compName: 'Line', styleType: 0x0000, oldStyleSheet: oldProps.style });
        },
        set points (points) {
            if (Array.isArray(points) && points !== oldProps?.points || points?.length !== oldProps?.points?.length) {
                comp.setPoints (points, points.length)
            }
        },
        set align ({
            type,
            pos = [0, 0]
        }) {
            if (!type || (type === oldProps.align?.type && pos[0] === oldProps.align?.pos?.[0] && pos[1] === oldProps.align?.pos?.[1])) return
            comp.align(type, pos)
        },
        set alignTo ({
            type,
            pos = [0, 0],
            parent
        }) {
            if (!type || (type === oldProps.alignTo?.type && pos[0] === (oldProps.alignTo?.pos?.[0] || 0) && pos[1] === (oldProps.alignTo?.pos?.[1] || 0) && parent?.uid === oldProps.alignTo?.parent?.uid)) return
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
  
export class LineComp extends NativeLine {
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
        setLineProps(this, newProps, oldProps);
    }
    insertBefore(child, beforeChild) {
    }
    static tagName = "Line";
    appendInitialChild(child) {
    }
    appendChild(child) {
        super.appendChild(child)
    }
    removeChild(child) {
        super.removeChild(child);
    }
    close () {
    }
    setStyle (style, type = 0x0000) {
        setStyle({ comp: this, styleSheet: style, compName: "Line", styleType: type, oldStyleSheet: null, isInit: false })
    }
}