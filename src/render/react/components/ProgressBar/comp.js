import { setStyle, handleEvent, styleGetterProp, STYLETYPE } from '../config'

const bridge = globalThis.SJSJSBridge
const NativeProgressBar = bridge.NativeRender.NativeComponents.ProgressBar

function setProgressBarProps(comp, newProps, oldProps) {
    const setter = {
        set style(styleSheet) {
            if (newProps.animationTime) {
                styleSheet['style-transition-time'] = newProps.animationTime
            }
            setStyle({ comp, styleSheet, compName: 'ProgressBar', styleType: STYLETYPE.PART_MAIN, oldStyleSheet: oldProps.style });
        },
        set indicatorStyle (styleSheet) {
            setStyle({ comp, styleSheet, compName: 'ProgressBar', styleType: STYLETYPE.PART_INDICATOR, oldStyleSheet: oldProps.style });
        },
        set value (value) {
            if (value !== oldProps.value) {
                comp.setValue(value, !!newProps.useAnimation)
            }
        },
        set range (arr) {
            if (arr?.[0] !== oldProps?.arr?.[0] || arr?.[1] !== oldProps?.arr?.[1]) {
                comp.setRange(arr[0], arr[1])
            }
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
  
export class ProgressBarComp extends NativeProgressBar {
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
        setProgressBarProps(this, newProps, oldProps);
    }
    insertBefore(child, beforeChild) {
    }
    static tagName = "ProgressBar";
    appendInitialChild(child) {
    }
    appendChild(child) {
    }
    removeChild(child) {
    }
    close () {
    }
    setStyle (style, type = 0x0000) {
        setStyle({ comp: this, styleSheet: style, compName: "ProgressBar", styleType: type, oldStyleSheet: null, isInit: false })
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