import { setStyle, handleEvent, styleGetterProp, EVENTTYPE_MAP, STYLE_TYPE } from '../config'

export const CommonComponentApi = function ({ compName, comp, newProps, oldProps }) {
    return {
        style(styleSheet) {
            setStyle({ comp, styleSheet, compName, styleType: STYLE_TYPE.PART_MAIN, oldStyleSheet: oldProps.style });
        },
        align ({
            type,
            pos = [0, 0]
        }) {
            if (!type || (type === oldProps.align?.type && newProps.align?.pos?.[0] === oldProps.align?.pos?.[0] && newProps.align?.pos?.[1] === oldProps.align?.pos?.[1])) return
            comp.align(type, pos)
        },
        alignTo ({
            type,
            pos = [0, 0],
            parent
        }) {
            if (!type || (type === oldProps.alignTo?.type && newProps.alignTo?.pos?.[0] === oldProps.alignTo?.pos?.[0] && newProps.alignTo?.pos?.[1] === oldProps.alignTo?.pos?.[1] && parent?.uid === oldProps.alignTo?.parent?.uid)) return
            comp.alignTo(type, pos, parent)
        },
        scrollbarStyle (styleSheet) {
            setStyle({ comp, styleSheet, compName, styleType: STYLE_TYPE.PART_SCROLLBAR, oldStyleSheet: oldProps.scrollbarStyle });
        },
        onScrollbarPressedStyle (styleSheet) {
            setStyle({ comp, styleSheet, compName, styleType: STYLE_TYPE.PART_SCROLLBAR | STYLE_TYPE.STATE_PRESSED, oldStyleSheet: oldProps.onScrollbarPressedStyle });
        },
        onScrollbarScrollingStyle (styleSheet) {
            setStyle({ comp, styleSheet, compName, styleType: STYLE_TYPE.PART_SCROLLBAR | STYLE_TYPE.STATE_SCROLLED, oldStyleSheet: oldProps.scrollbarScrollingStyle });
        },
        onPressedStyle (styleSheet) {
            setStyle({ comp, styleSheet, compName, styleType: STYLE_TYPE.STATE_PRESSED, oldStyleSheet: oldProps.onPressedStyle });
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
        onPressLost (fn) {
            handleEvent (comp, fn, EVENTTYPE_MAP.EVENT_PRESS_LOST);
        },
        onReleased (fn) {
            handleEvent (comp, fn, EVENTTYPE_MAP.EVENT_RELEASED);
        }
    }
}