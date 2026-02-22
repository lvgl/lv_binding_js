import { setComponentProps, CommonProps } from "../common/index";
import { UpdatePayload } from "../../core/reconciler/propDiffer";
import {
  styleGetterProp,
  setStyle,
} from "../config";

const bridge = globalThis[Symbol.for('lvgljs')];
const NativeComp = bridge.NativeRender.NativeComponents.Window;

export type WindowProps = CommonProps & {
  title: string;
};

const windowSetters = {
  title(comp, title) {
    comp.setTitle(title);
  },
};

export class Window extends NativeComp {
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
  setProps(updatePayload: UpdatePayload<WindowProps>, oldProps: WindowProps) {
    setComponentProps(this, "Window", updatePayload, oldProps, windowSetters);
  }
  insertBefore(child, beforeChild) {}
  appendInitialChild(child) {
    this.appendChild(child);
  }
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
      compName: "Window",
      styleType: type,
      oldStyleSheet: {},
      isInit: false,
    });
  }
}
