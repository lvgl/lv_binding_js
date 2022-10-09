import { setStyle, handleEvent, styleGetterProp, EVENTTYPE_MAP } from '../config'
import { CommonComponentApi } from '../common/index'

const bridge = globalThis.SJSJSBridge
const NativeCalendar = bridge.NativeRender.NativeComponents.Calendar

function setCalendarProps(comp, newProps, oldProps) {
    const setter = {
        ...CommonComponentApi({ compName: 'Calendar', comp, newProps, oldProps }),
        onChange (fn) {
            handleEvent(comp, fn, EVENTTYPE_MAP.EVENT_VALUE_CHANGED);
        },
        today (today) {
            if (today && today !== oldProps.today) {
                const date = new Date(today)
                comp.setToday(date.getFullYear(), date.getMonth() + 1, date.getDate())
            }
        },
        shownMonth (month) {
            if (month && month !== oldProps.shownMonth) {
                const date = new Date(month)
                comp.setShownMonth(date.getFullYear(), date.getMonth() + 1)
            }
        },
        highLightDates (dates) {
            if (Array.isArray(dates) && dates !== oldProps.highLightDates) {
                dates = dates.map(item => {
                    const date = new Date(item)
                    return [date.getFullYear(), date.getMonth() + 1, date.getDate()]
                })
                comp.setHighlightDates(dates, dates.length)
            }
        },
    }
    Object.keys(setter).forEach(key => {
        if (newProps.hasOwnProperty(key)) {
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
        super.close()
    }
    setStyle (style, type = 0x0000) {
        setStyle({ comp: this, styleSheet: style, compName: "Calendar", styleType: type, oldStyleSheet: null, isInit: false })
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