import { StyleProps } from "../../core/style";
import { CommonComponentApi, CommonProps, OnChangeEvent } from "../common/index";
import {
  EVENTTYPE_MAP,
  STYLE_TYPE,
  handleEvent,
  setStyle,
  styleGetterProp,
  applyDataPropsToDataset,
} from "../config";

import { GetBridge } from "../../core/bridge";

const bridge = GetBridge();
const NativeView = bridge.NativeRender.NativeComponents.Textarea;

export type TextAreaProps = CommonProps & {
  placeholder: string;
  /** `password` mode changes text to `*` */
  mode?: "password" | "text";
  onFocusStyle: StyleProps;
  onChange?: (event: OnChangeEvent) => void;
  onFocus?: (event: {
    target: any,
    currentTarget: any,
    stopPropogation: () => void,
  }) => void;
  value: string;
  /** Virtual keyboard will auto raise up when focus on Input component */
  autoKeyBoard: boolean;
};

function setTextareaProps(comp, newProps: TextAreaProps, oldProps: Partial<TextAreaProps>) {
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
        styleType: STYLE_TYPE.STATE_FOCUSED,
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
  applyDataPropsToDataset(comp, newProps);
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
  setProps(newProps: TextAreaProps, oldProps: Partial<TextAreaProps>) {
    setTextareaProps(this, newProps, oldProps);
  }
  insertBefore(child, beforeChild) {}
  appendInitialChild(child) {}
  appendChild(child) {}
  close() {}
  setStyle(style, type = STYLE_TYPE.PART_MAIN) {
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
