import { StyleProps } from "../../core/style";
import { UpdatePayload } from "../../core/reconciler/propDiffer";
import { setComponentProps, CommonProps, OnClickEvent } from "../common/index";
import {
  EVENTTYPE_MAP,
  STYLE_TYPE,
  handleEvent,
  setStyle,
  styleGetterProp,
} from "../config";

const bridge = globalThis[Symbol.for('lvgljs')];
const NativeMask = bridge.NativeRender.NativeComponents.Mask;

export type MaskProps = CommonProps & {
  onPressedStyle?: StyleProps;
  onClick?: (event: OnClickEvent) => void;
  onPressed?: (event: {
    target: any,
    currentTarget: any,
    stopPropogation: () => void,
  }) => void;
  onLongPressed?: (event: {
    target: any,
    currentTarget: any,
    stopPropogation: () => void,
  }) => void;
  onLongPressRepeat?: (event: {
    target: any,
    currentTarget: any,
    stopPropogation: () => void,
  }) => void;
};

const maskSetters = {
  onPressedStyle(comp, styleSheet, oldProps) {
    setStyle({
      comp,
      styleSheet,
      compName: "Mask",
      styleType: STYLE_TYPE.STATE_PRESSED,
      oldStyleSheet: oldProps.onPressedStyle,
    });
  },
  onClick(comp, fn) {
    handleEvent(comp, fn, EVENTTYPE_MAP.EVENT_CLICKED);
  },
  onPressed(comp, fn) {
    handleEvent(comp, fn, EVENTTYPE_MAP.EVENT_PRESSED);
  },
  onLongPressed(comp, fn) {
    handleEvent(comp, fn, EVENTTYPE_MAP.EVENT_LONG_PRESSED);
  },
  onLongPressRepeat(comp, fn) {
    handleEvent(comp, fn, EVENTTYPE_MAP.EVENT_LONG_PRESSED_REPEAT);
  },
};

export class MaskComp extends NativeMask {
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
  setProps(updatePayload: UpdatePayload<MaskProps>, oldProps: MaskProps) {
    setComponentProps(this, "Mask", updatePayload, oldProps, maskSetters);
  }
  insertBefore(child, beforeChild) {}
  static tagName = "Mask";
  appendInitialChild(child) {}
  appendChild(child) {
    super.appendChild(child);
  }
  removeChild(child) {
    super.removeChild(child);
  }
  close() {
    super.close();
  }
  setStyle(style, type = 0x0000) {
    setStyle({
      comp: this,
      styleSheet: style,
      compName: "Mask",
      styleType: type,
      oldStyleSheet: null,
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
