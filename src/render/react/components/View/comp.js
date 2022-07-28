import { getUid, setStyle, handleOnClick } from '../config'
import { unRegistEvent } from '../../core/event'

const bridge = globalThis.SJSJSBridge;
const NativeView = bridge.NativeRender.NativeComponents.View

function setViewProps(comp, newProps, oldProps) {
    const setter = {
        set style(styleSheet) {
            setStyle(comp, styleSheet, 0x0000);
        },
        set onClick (fn) {
            handleOnClick(comp, fn);
        },
        set onPressStyle (styleSheet) {
            setStyle(comp, styleSheet, 0x0020);
        }
    }
    Object.assign(setter, newProps);
}
  
export class ViewComp extends NativeView {
    constructor (props) {
        const uid = getUid()
        super({ uid })
        this.uid = uid
    }
    setProps(newProps, oldProps) {
        setViewProps(this, newProps, oldProps);
    }
    insertBefore(child, beforeChild) {
        this.insertChildBefore(child, beforeChild)
    }
    appendInitialChild(child) {
        this.appendChild(child);
    }
    appendChild(child) {
        super.appendChild(child)
    }
    removeChild(child) {
        super.removeChild(child);
    }
    unMount () {
        unRegistEvent(this.uid)
    }
}