import { getUid, setStyle, handleOnClick } from '../config'
import { unRegistEvent } from '../../core/event'

const bridge = globalThis.SJSJSBridge;
const NativeText = bridge.NativeRender.NativeComponents.Text

function setTextProps(comp, newProps, oldProps) {
    const setter = {
        set style(styleSheet) {
            setStyle(comp, styleSheet);
        },
        set children(str) {
            if (typeof str == 'string' && oldProps.children !== str) {
                comp.setText(str);
            }
        },
        set onClick (fn) {
            handleOnClick(comp, fn);
        }
    }
    Object.assign(setter, newProps);
}
  
export class TextComp extends NativeText {
    constructor (props) {
        const uid = getUid()
        super({ uid })
        this.uid = uid
    }
    setProps(newProps, oldProps) {
        setTextProps(this, newProps, oldProps);
    }
    insertBefore(child, beforeChild) {
    }
    appendInitialChild(child) {
    }
    appendChild(child) {
    }
    removeChild(child) {
    }
    unMount () {
        unRegistEvent(this.uid)
    }
}