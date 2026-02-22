import { UpdatePayload } from "../../core/reconciler/propDiffer";
import { setComponentProps, CommonProps } from "../common/index";
import {
  setStyle,
  styleGetterProp,
} from "../config";

const bridge = globalThis[Symbol.for('lvgljs')];
const NativeText = bridge.NativeRender.NativeComponents.Text;

export type TextProps = CommonProps & {
  children: string | number | (string | number)[];
};

const textSetters = {
  children(comp: typeof NativeText, str: string | number | (string | number)[]) {
    const type = typeof str;
    if ((type == "string" || type == "number")) {
      comp.setText(String(str));
    } else if (Array.isArray(str)) {
      const isStringArr = str.every(
        (item) => typeof item === "string" || typeof item === "number",
      );
      if (isStringArr) {
        comp.setText(str.join(""));
      }
    }
  },
};

export class TextComp extends NativeText {
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
  setProps(updatePayload: UpdatePayload<TextProps>, oldProps: TextProps) {
    setComponentProps(this, "Text", updatePayload, oldProps, textSetters);
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
      compName: "Text",
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
