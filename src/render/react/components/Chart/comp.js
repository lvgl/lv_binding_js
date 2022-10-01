import { setStyle, handleEvent, styleGetterProp, EVENTTYPE_MAP, STYLE_TYPE } from '../config'
import { CommonComponentApi } from '../common/index'

const bridge = globalThis.SJSJSBridge
const NativeChart = bridge.NativeRender.NativeComponents.Chart

const chartType = {
    'none': 0,
    'line': 1,
    'bar': 2,
    'scatter': 3
}

function setChartProps(comp, newProps, oldProps) {
    const setter = {
        ...CommonComponentApi({ compName: 'Chart', comp, newProps, oldProps }),
        onPressedStyle (styleSheet) {
            setStyle({ comp, styleSheet, compName: "Chart", styleType: STYLE_TYPE.STATE_PRESSED, oldStyleSheet: oldProps.onPressedStyle });
        },
        onClick (fn) {
            handleEvent(comp, fn, EVENTTYPE_MAP.EVENT_CLICKED);
        },
        onPressed (fn) {
            handleEvent (comp, fn, EVENTTYPE_MAP.EVENT_PRESSED);
        },
        onLongPressed (fn) {
            handleEvent (comp, fn, EVENTTYPE_MAP.EVENT_LONG_PRESSED);
        },
        onLongPressRepeat (fn) {
            handleEvent (comp, fn, EVENTTYPE_MAP.EVENT_LONG_PRESSED_REPEAT);
        },
        type (type) {
            if (chartType[type] !== void 0) {
                comp.setType(chartType[type])
            }
        },
        divLineCount (arr) {
            if (arr?.[0] !== oldProps?.divLineCount?.[0] || arr?.[1] !== oldProps?.divLineCount?.[1]) {
                comp.setDivLineCount(arr)
            }
        },
        pointNum (num) {
            if (num !== oldProps?.pointNum) {
                comp.setPointNum(num)
            }
        },
        leftAxisOption (options) {
            if (options.majorLen == void 0 || options.minorLen == void 0 || options.majorNum == void 0 || options.minorNum == void 0 || !options.drawSize) {
                return
            }
            if (options != oldProps?.leftAxisOption) {
                comp.setLeftAxisOption(
                    options
                )
            }
        },
        leftAxisData(data) {
            if (data !== oldProps?.leftAxisData && Array.isArray(data)) {
                comp.setLeftAxisData(data)
            }
        },
        bottomAxisOption (options) {
            if (options.majorLen == void 0 || options.minorLen == void 0 || options.majorNum == void 0 || options.minorNum == void 0 || !options.drawSize) {
                return
            }

            if (options != oldProps?.bottomAxisOption) {
                comp.setBottomAxisOption(options)
            }
        },
        bottomAxisData(data) {
            if (data !== oldProps?.bottomAxisData && Array.isArray(data)) {
                comp.setBottomAxisData(data)
            }
        },
        rightAxisOption (options) {
            if (options.majorLen == void 0 || options.minorLen == void 0 || options.majorNum == void 0 || options.minorNum == void 0 || !options.drawSize) {
                return
            }

            if (options != oldProps?.rightAxisOption) {
                comp.setRightAxis(options)
            }
        },
        rightAxisData(data) {
            if (data !== oldProps?.rightAxisData && Array.isArray(data)) {
                comp.setRightAxisData(data)
            }
        },
        topAxisOption (options) {
            if (options.majorLen == void 0 || options.minorLen == void 0 || options.majorNum == void 0 || options.minorNum == void 0 || !options.drawSize) {
                return
            }

            if (options != oldProps?.topAxisOption) {
                comp.setTopAxis(options)
            }
        },
        topAxisData(data) {
            if (data !== oldProps?.topAxisData && Array.isArray(data)) {
                comp.setTopAxisData(data)
            }
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
  
export class ChartComp extends NativeChart {
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
        setChartProps(this, newProps, oldProps);
    }
    insertBefore(child, beforeChild) {
    }
    static tagName = "Chart";
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
        setStyle({ comp: this, styleSheet: style, compName: "Chart", styleType: type, oldStyleSheet: null, isInit: false })
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