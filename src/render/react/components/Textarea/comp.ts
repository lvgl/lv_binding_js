import { CommonComponentApi, CommonProps } from "../common/index";
import {
  EVENTTYPE_MAP,
  handleEvent,
  setStyle,
  styleGetterProp,
} from "../config";

const bridge = globalThis[Symbol.for('lvgljs')];
const NativeView = bridge.NativeRender.NativeComponents.Textarea;

export type TextAreaProps = CommonProps & {
  placeholder: string;
  mode: "password";
  onFocusStyle: Record<string, any>;
  onChange: (e: Event) => void;
  onFocus: (e: Event) => void;
  value: string;
  autoKeyBoard: boolean;
};

function setTextareaProps(comp, newProps: TextAreaProps, oldProps: TextAreaProps) {
  const setter = {
    ...CommonComponentApi({ compName: "Textarea", comp, newProps, oldProps }),
    placeholder(str) {
      if (str !== oldProps.placeholder) {
        comp.setPlaceHolder(str);
      }
    },
    mode(mode) {
      if (mode === "password") {
        comp.setPasswordMode(true);
      } else if (oldProps.mode === "password") {
        comp.setPasswordMode(false);
      }
    },
    onFocusStyle(styleSheet) {
      setStyle({
        comp,
        styleSheet,
        compName: "Textarea",
        styleType: 0x0002,
        oldStyleSheet: oldProps.onFocusStyle,
      });
    },
    onChange(fn) {
      handleEvent(comp, fn, EVENTTYPE_MAP.EVENT_VALUE_CHANGED);
    },
    onFocus(fn) {
      handleEvent(comp, fn, EVENTTYPE_MAP.EVENT_FOCUSED);
    },
    value(str) {
      if (str !== oldProps.value) {
        comp.setText(str);
      }
    },
    autoKeyBoard(payload) {
      if (payload !== oldProps?.autoKeyBoard) {
        comp.setAutoKeyboard(payload);
      }
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

export class TextareaComp extends NativeView {
  constructor({ uid }) {
    super({ uid });
    this.uid = uid;

    super.setOneLine(false);

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
  setProps(newProps: TextAreaProps, oldProps: TextAreaProps) {
    setTextareaProps(this, newProps, oldProps);
  }
  insertBefore(child, beforeChild) {}
  appendInitialChild(child) {}
  appendChild(child) {}
  removeChild(child) {}
  close() {}
  setStyle(style, type = 0x0000) {
    setStyle({
      comp: this,
      styleSheet: style,
      compName: "Textarea",
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
