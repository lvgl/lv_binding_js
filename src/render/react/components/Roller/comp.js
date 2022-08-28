import { setStyle, handleEvent, styleGetterProp, EVENTTYPE_MAP, STYLETYPE } from '../config'

const bridge = globalThis.SJSJSBridge
const NativeRoller = bridge.NativeRender.NativeComponents.Roller

function setRollerProps(comp, newProps, oldProps) {
    const setter = {
        set style(styleSheet) {
            setStyle({ comp, styleSheet, compName: 'Roller', styleType: STYLETYPE.PART_MAIN, oldStyleSheet: oldProps.style });
        },
        set selectedStyle (styleSheet) {
            setStyle({ comp, styleSheet, compName: 'Roller', styleType: STYLETYPE.PART_SELECTED, oldStyleSheet: oldProps.selectedStyle });
        },
        set options (options) {
            if (options !== oldProps.options && Array.isArray(options)) {
                comp.setOptions(options, options.length, !!newProps.infinity)
            }
        },
        set selectIndex (selectIndex) {
            if (selectIndex !== oldProps.selectIndex) {
                comp.setSelectIndex(selectIndex)
            }
        },
        set visibleRowCount (count) {
            if (count !== oldProps.visibleRowCount) {
                comp.setVisibleRowCount(count)
            }
        },
        set onChange (fn) {
            handleEvent(comp, fn, EVENTTYPE_MAP.EVENT_VALUE_CHANGED);
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
  
export class RollerComp extends NativeRoller {
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
        setRollerProps(this, newProps, oldProps);
    }
    insertBefore(child, beforeChild) {
    }
    static tagName = "Roller";
    appendInitialChild(child) {
    }
    appendChild(child) {
    }
    removeChild(child) {
    }
    close () {
    }
    setStyle (style, type = 0x0000) {
        setStyle({ comp: this, styleSheet: style, compName: "Roller", styleType: type, oldStyleSheet: null, isInit: false })
    }
}