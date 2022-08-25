import { setStyle, handleEvent, EVENTTYPE_MAP, styleGetterProp } from '../config'

const bridge = globalThis.SJSJSBridge;
const NativeComp = bridge.NativeRender.NativeComponents.Switch

function setSwitchProps(comp, newProps, oldProps) {
    const setter = {
        set style(styleSheet) {
            setStyle({comp, styleSheet, compName: "Switch", styleType: 0x0000, oldStyleSheet: oldProps.style});
        },
        set onChange (fn) {
            handleEvent(comp, fn, EVENTTYPE_MAP.EVENT_VALUE_CHANGED);
        },
        set checked (val) {
            if (isNaN(val)) return
            if (val == oldProps.value) return
            comp.setChecked(val)
        },
        set disabled (val) {
            if (val !== oldProps.disabled) {
                comp.setDisabled(val)
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
  
export class SwitchComp extends NativeComp {
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
        setSwitchProps(this, newProps, oldProps);
    }
    insertBefore(child, beforeChild) {
        this.insertChildBefore(child, beforeChild);
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
        setStyle({ comp: this, styleSheet: style, compName: "Switch", styleType: type, oldStyleSheet: {}, isInit: false })
    }
}