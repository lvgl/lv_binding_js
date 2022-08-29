import { setStyle, handleEvent, EVENTTYPE_MAP, styleGetterProp, STYLETYPE } from '../config'

const bridge = globalThis.SJSJSBridge;
const NativeView = bridge.NativeRender.NativeComponents.Checkbox

function setCheckboxProps(comp, newProps, oldProps) {
    const setter = {
        set checked (val) {
            if (val !== oldProps.checked) {
                comp.setChecked(val)
            }
        },
        set disabled (val) {
            if (val !== oldProps.disabled) {
                comp.setDisabled(val)
            }
        },
        set text (val) {
            if (val !== oldProps.text) {
                comp.setText(val)
            }
        },
        set style(styleSheet) {
            setStyle({comp, styleSheet, compName: "Checkbox", styleType: STYLETYPE.PART_MAIN, oldStyleSheet: oldProps.style});
        },
        set checkedStyle (styleSheet) {
            setStyle({comp, styleSheet, compName: "Checkbox", styleType: STYLETYPE.STATE_CHECKED, oldStyleSheet: oldProps.checkedStyle});
        },
        set indicatorStyle (styleSheet) {
            setStyle({comp, styleSheet, compName: "Checkbox", styleType: STYLETYPE.PART_INDICATOR, oldStyleSheet: oldProps.indicatorStyle});
        },
        set indicatorCheckedStyle (styleSheet) {
            setStyle({comp, styleSheet, compName: "Checkbox", styleType: STYLETYPE.PART_INDICATOR | STYLETYPE.STATE_CHECKED, oldStyleSheet: oldProps.indicatorCheckedStyle});
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
  
export class CheckboxComp extends NativeView {
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
        setCheckboxProps(this, newProps, oldProps);
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
        setStyle({ comp: this, styleSheet: style, compName: "Checkbox", styleType: type, oldStyleSheet: {}, isInit: false })
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