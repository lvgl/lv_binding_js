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

export type InputProps = CommonProps & {
  placeholder: string;
  /** `password` mode changes text to `*` */
  mode?: "password" | "text";
  /** Maximum number of characters */
  maxlength: number;
  onChange?: (event: OnChangeEvent) => void;
  onFocus?: (event: {
    target: any,
    currentTarget: any,
    stopPropogation: () => void,
  }) => void;
  onBlur?: (event: {
    target: any,
    currentTarget: any,
    stopPropogation: () => void,
  }) => void;
  onFocusStyle: StyleProps;
  value: string;
  /** Virtual keyboard will auto raise up when focus on Input component */
  autoKeyBoard: boolean;
};

function setInputProps(comp, newProps: InputProps, oldProps: Partial<InputProps>) {
  const setter = {
    ...CommonComponentApi({ compName: "Input", comp, newProps, oldProps }),
    placeholder(str) {
      if (str !== oldProps.placeholder) {
        comp.setPlaceHolder(str);
      }
    },
    mode(mode) {
      if (mode == oldProps.mode) return;
      if (mode === "password") {
        comp.setPasswordMode(true);
      } else if (oldProps.mode === "password") {
        comp.setPasswordMode(false);
      }
    },
    maxlength(len) {
      if (len === oldProps.maxlength) return;
      comp.setMaxLength(len);
    },
    onChange(fn) {
      handleEvent(comp, fn, EVENTTYPE_MAP.EVENT_VALUE_CHANGED);
    },
    onFocus(fn) {
      handleEvent(comp, fn, EVENTTYPE_MAP.EVENT_FOCUSED);
    },
    onBlur(fn) {
      handleEvent(comp, fn, EVENTTYPE_MAP.EVENT_DEFOCUSED);
    },
    onFocusStyle(styleSheet) {
      setStyle({
        comp,
        compName: "Input",
        styleType: STYLE_TYPE.STATE_FOCUSED,
        oldStyleSheet: oldProps.onFocusStyle,
        styleSheet,
      });
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

/** A one line mode of Textarea */
export class InputComp extends NativeView {
  constructor({ uid }) {
    super({ uid });
    this.uid = uid;

    super.setOneLine(true);

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
  setProps(newProps: InputProps, oldProps: Partial<InputProps>) {
    setInputProps(this, newProps, oldProps);
  }
  insertBefore(child, beforeChild) {}
  appendInitialChild(child) {}
  appendChild(child) {}
  close() {
    super.close();
  }
  setStyle(style, type = STYLE_TYPE.PART_MAIN) {
    setStyle({
      comp: this,
      styleSheet: style,
      compName: "Input",
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
