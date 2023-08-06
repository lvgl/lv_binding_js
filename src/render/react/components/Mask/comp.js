import { CommonComponentApi } from "../common/index";
import {
  EVENTTYPE_MAP,
  STYLE_TYPE,
  handleEvent,
  setStyle,
  styleGetterProp,
} from "../config";

const bridge = globalThis.SJSJSBridge;
const NativeMask = bridge.NativeRender.NativeComponents.Mask;

function setMaskProps(comp, newProps, oldProps) {
  const setter = {
    ...CommonComponentApi({ compName: "Mask", comp, newProps, oldProps }),
    onPressedStyle(styleSheet) {
      setStyle({
        comp,
        styleSheet,
        compName: "Mask",
        styleType: STYLE_TYPE.STATE_PRESSED,
        oldStyleSheet: oldProps.onPressedStyle,
      });
    },
    onClick(fn) {
      handleEvent(comp, fn, EVENTTYPE_MAP.EVENT_CLICKED);
    },
    onPressed(fn) {
      handleEvent(comp, fn, EVENTTYPE_MAP.EVENT_PRESSED);
    },
    onLongPressed(fn) {
      handleEvent(comp, fn, EVENTTYPE_MAP.EVENT_LONG_PRESSED);
    },
    onLongPressRepeat(fn) {
      handleEvent(comp, fn, EVENTTYPE_MAP.EVENT_LONG_PRESSED_REPEAT);
    },
  };
  Object.keys(setter).forEach((key) => {
    if (newProps.hasOwnProperty(key)) {
      setter[key](newProps[key]);
    }
  });
  comp.dataset = {};
  Object.keys(newProps).forEach((prop) => {
    const index = prop.indexOf("data-");
    if (index === 0) {
      comp.dataset[prop.substring(5)] = newProps[prop];
    }
  });
}

export class MaskComp extends NativeMask {
  constructor({ uid }) {
    super({ uid });
    this.uid = uid;

    const style = super.style;
    const that = this;
    this.style = new Proxy(this, {
      get(obj, prop) {
        if (styleGetterProp.includes(prop)) {
          return style[prop].call(that);
        }
      },
    });
  }
  setProps(newProps, oldProps) {
    setMaskProps(this, newProps, oldProps);
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
