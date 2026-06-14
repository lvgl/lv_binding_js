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
const NativeText = bridge.NativeRender.NativeComponents.Text;

export type TextProps = CommonProps & {
  children: string | number | (string | number)[];
};

function setTextProps(comp, newProps: TextProps, oldProps: Partial<TextProps>) {
  const setter = {
    ...CommonComponentApi({ compName: "Text", comp, newProps, oldProps }),
    children(str) {
      const type = typeof str;
      if ((type == "string" || type == "number") && oldProps.children !== str) {
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
  Object.keys(setter).forEach((key) => {
    if (newProps.hasOwnProperty(key)) {
      setter[key](newProps[key]);
    }
  });
  applyDataPropsToDataset(comp, newProps);
}

export class TextComp extends NativeText {
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
  setProps(newProps: TextProps, oldProps: Partial<TextProps>) {
    setTextProps(this, newProps, oldProps);
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
