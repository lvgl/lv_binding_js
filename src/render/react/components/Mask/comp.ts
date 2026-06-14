import { StyleProps } from "../../core/style";
import { CommonComponentApi, CommonProps, OnClickEvent } from "../common/index";
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

function setMaskProps(comp, newProps: MaskProps, oldProps: MaskProps) {
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
  applyDataPropsToDataset(comp, newProps);
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
  setProps(newProps: MaskProps, oldProps: MaskProps) {
    setMaskProps(this, newProps, oldProps);
  }
  insertBefore(child, beforeChild) {}
  static tagName = "Mask";
  appendInitialChild(child) {}
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
      compName: "Mask",
      styleType: type,
      oldStyleSheet: null,
      isInit: false,
    });
  }
  moveToFront() {}
  moveToBackground() {}
  scrollIntoView() {}
}
