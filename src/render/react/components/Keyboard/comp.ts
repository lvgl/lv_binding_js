import { UpdatePayload } from "../../core/reconciler/propDiffer";
import { setComponentProps, CommonProps } from "../common/index";
import {
  EVENTTYPE_MAP,
  handleEvent,
  setStyle,
  styleGetterProp,
} from "../config";
import { InputComp } from "../Input/comp";

const bridge = globalThis[Symbol.for('lvgljs')];
const NativeView = bridge.NativeRender.NativeComponents.Keyboard;

const modes = {
  lower: 0,
  upper: 1,
  special: 2,
  number: 3,
};

export type KeyboardProps = CommonProps & {
  /** Sets keyboard mode:
   * - lower, Display lower case letters
   * - upper, Display upper case letters
   * - special, Display special characters
   * - number, Display numbers, +/- sign, and decimal dot
  */
  mode: typeof modes;
  textarea: InputComp;
  onClose?: () => void;
  onOk?: () => void;
};

const keyboardSetters = {
  mode(comp, mode) {
    comp.setMode(modes[mode]);
  },
  textarea(comp, textarea) {
    comp.setTextarea(textarea);
  },
  onClose(comp, fn) {
    handleEvent(comp, fn, EVENTTYPE_MAP.EVENT_CANCEL);
  },
  onOk(comp, fn) {
    handleEvent(comp, fn, EVENTTYPE_MAP.EVENT_READY);
  },
};

export class KeyboardComp extends NativeView {
  uid: string;
  style: any;
  
  constructor({ uid }) {
    super({ uid });
    this.uid = uid;

    const style = super.style;
    const that = this;
    this.style = new Proxy(this, {
      get(obj, prop) {
        const propStr = String(prop);
        if (styleGetterProp.includes(propStr)) {
          return style[propStr].call(that);
        }
      },
    });
  }
  setProps(updatePayload: UpdatePayload<KeyboardProps>, oldProps: KeyboardProps) {
    setComponentProps(this, "Keyboard", updatePayload, oldProps, keyboardSetters);
  }
  insertBefore(child, beforeChild) {}
  appendInitialChild(child) {}
  appendChild(child) {}
  removeChild(child) {}
  close() {
    super.close();
  }
  setStyle(style, type = 0x0000) {
    setStyle({
      comp: this,
      styleSheet: style,
      compName: "Keyboard",
      styleType: type,
      oldStyleSheet: {},
      isInit: false,
    });
  }
  moveToFront() {
    super.moveToFront();
  }
  moveToBackground() {
    super.moveToBackground();
  }
  scrollIntoView() {
    super.scrollIntoView();
  }
}
