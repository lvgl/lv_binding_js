import { setStyle, handleEvent, styleGetterProp, EVENTTYPE_MAP } from '../config'

const bridge = globalThis.SJSJSBridge
const NativeCalendar = bridge.NativeRender.NativeComponents.Calendar

function setCalendarProps(comp, newProps, oldProps) {
    const setter = {
        set style(styleSheet) {
            setStyle({ comp, styleSheet, compName: 'Calendar', styleType: 0x0000, oldStyleSheet: oldProps.style });
        },
        set onChange (fn) {
            handleEvent(comp, fn, EVENTTYPE_MAP.EVENT_VALUE_CHANGED);
        },
        set today (today) {
            if (today && today !== oldProps.today) {
                const date = new Date(today)
                comp.setToday(date.getFullYear(), date.getMonth() + 1, date.getDate())
            }
        },
        set shownMonth (month) {
            if (month && month !== oldProps.shownMonth) {
                const date = new Date(month)
                comp.setShownMonth(date.getFullYear(), date.getMonth() + 1)
            }
        },
        set highLightDates (dates) {
            if (Array.isArray(dates) && dates !== oldProps.highLightDates) {
                dates = dates.map(item => {
                    const date = new Date(item)
                    return [date.getFullYear(), date.getMonth() + 1, date.getDate()]
                })
                comp.setHighlightDates(dates, dates.length)
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
  
export class CalendarComp extends NativeCalendar {
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
        setCalendarProps(this, newProps, oldProps);
    }
    insertBefore(child, beforeChild) {
    }
    static tagName = "Calendar";
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
        setStyle({ comp: this, styleSheet: style, compName: "Calendar", styleType: type, oldStyleSheet: null, isInit: false })
    }
}