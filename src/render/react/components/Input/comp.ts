import { UpdatePayload } from "../../core/reconciler/propDiffer";
import { StyleProps } from "../../core/style";
import { setComponentProps, CommonProps, OnChangeEvent } from "../common/index";
import {
  EVENTTYPE_MAP,
  handleEvent,
  setStyle,
  styleGetterProp,
} from "../config";

const bridge = globalThis[Symbol.for('lvgljs')];
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

const inputSetters = {
  placeholder(comp, str) {
    comp.setPlaceHolder(str);
  },
  mode(comp, mode) {
    comp.setPasswordMode(!!(mode === "password"));
  },
  maxlength(comp, len) {
    comp.setMaxLength(len);
  },
  onChange(comp, fn) {
    handleEvent(comp, fn, EVENTTYPE_MAP.EVENT_VALUE_CHANGED);
  },
  onFocus(comp, fn) {
    handleEvent(comp, fn, EVENTTYPE_MAP.EVENT_FOCUSED);
  },
  onBlur(comp, fn) {
    handleEvent(comp, fn, EVENTTYPE_MAP.EVENT_DEFOCUSED);
  },
  onFocusStyle(comp, styleSheet, oldProps) {
    setStyle({
      comp,
      compName: "Input",
      styleType: 0x0002,
      oldStyleSheet: oldProps.onFocusStyle,
      styleSheet,
    });
  },
  value(comp, str) {
    comp.setText(str);
  },
  autoKeyBoard(comp, payload) {
    comp.setAutoKeyboard(payload);
  },
};

/** A one line mode of Textarea */
export class InputComp extends NativeView {
  uid: string;
  style: any;
  
  constructor({ uid }) {
    super({ uid });
    this.uid = uid;

    super.setOneLine(true);

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
  setProps(updatePayload: UpdatePayload<InputProps>, oldProps: InputProps) {
    setComponentProps(this, "Input", updatePayload, oldProps, inputSetters);
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
