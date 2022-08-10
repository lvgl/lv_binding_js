import { setStyle, handleEvent, EVENTTYPE_MAP, unRegistEvent } from '../config'

const bridge = globalThis.SJSJSBridge;
const NativeComp = bridge.NativeRender.NativeComponents.Switch

function setSwitchProps(comp, newProps, oldProps) {
    const setter = {
        set style(styleSheet) {
            setStyle(comp, styleSheet, "Switch", 0x0000, oldProps.style);
        },
        set onChange (fn) {
            handleEvent(comp, fn, EVENTTYPE_MAP.EVENT_VALUE_CHANGED);
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
  
export class SwitchComp extends NativeComp {
    constructor ({ uid }) {
        super({ uid })
        this.uid = uid
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
        setStyle(this, style, "Switch", type, {}, false)
    }
    get style () {
        return super.style
    }
}