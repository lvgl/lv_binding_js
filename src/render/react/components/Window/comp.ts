import { CommonComponentApi, CommonProps } from "../common/index";
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
const NativeComp = bridge.NativeRender.NativeComponents.Window;

export type WindowProps = CommonProps & {
  title: string;
};

function setWindowProps(comp, newProps: WindowProps, oldProps: Partial<WindowProps>) {
  const setter = {
    ...CommonComponentApi({ compName: "Window", comp, newProps, oldProps }),
    title(title) {
      if (oldProps.title != title) {
        comp.setTitle(title);
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

export class Window extends NativeComp {
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
  setProps(newProps: WindowProps, oldProps: Partial<WindowProps>) {
    setWindowProps(this, newProps, oldProps);
  }
  insertBefore(child, beforeChild) {}
  appendInitialChild(child) {
    this.appendChild(child);
  }
  appendChild(child) {
    super.appendChild(child);
  }
  close() {
    super.close();
  }
  setStyle(style, type = STYLE_TYPE.PART_MAIN) {
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
