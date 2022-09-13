import { setStyle, handleEvent, styleGetterProp, EVENTTYPE_MAP, STYLE_TYPE } from '../config'
import { CommonComponentApi } from '../common/index'

const bridge = globalThis.SJSJSBridge
const NativeRoller = bridge.NativeRender.NativeComponents.Roller

function setRollerProps(comp, newProps, oldProps) {
    const setter = {
        ...CommonComponentApi({ compName: 'Roller', comp, newProps, oldProps }),
        selectedStyle (styleSheet) {
            setStyle({ comp, styleSheet, compName: 'Roller', styleType: STYLE_TYPE.PART_SELECTED, oldStyleSheet: oldProps.selectedStyle });
        },
        options (options) {
            if (options !== oldProps.options && Array.isArray(options)) {
                comp.setOptions(options, options.length, !!newProps.infinity)
            }
        },
        selectIndex (selectIndex) {
            if (selectIndex !== oldProps.selectIndex) {
                comp.setSelectIndex(selectIndex)
            }
        },
        visibleRowCount (count) {
            if (count !== oldProps.visibleRowCount) {
                comp.setVisibleRowCount(count)
            }
        },
        onChange (fn) {
            handleEvent(comp, fn, EVENTTYPE_MAP.EVENT_VALUE_CHANGED);
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