import { StyleProps } from "../../core/style";
import { CommonComponentApi, CommonProps } from "../common/index";
import { STYLE_TYPE, handleEvent, setStyle, styleGetterProp, applyDataPropsToDataset } from "../config";

import { GetBridge } from "../../core/bridge";

const bridge = GetBridge();
const NativeProgressBar = bridge.NativeRender.NativeComponents.ProgressBar;

export type ProgressBarProps = CommonProps & {
  value: number;
  range: number[];
  animationTime?: number;
  useAnimation?: boolean;
  indicatorStyle?: StyleProps;
};

function setProgressBarProps(comp, newProps: ProgressBarProps, oldProps: Partial<ProgressBarProps>) {
  const setter = {
    ...CommonComponentApi({
      compName: "ProgressBar",
      comp,
      newProps,
      oldProps,
    }),
    style(styleSheet) {
      if (newProps.animationTime) {
        styleSheet["style-transition-time"] = newProps.animationTime;
      }
      setStyle({
        comp,
        styleSheet,
        compName: "ProgressBar",
        styleType: STYLE_TYPE.PART_MAIN,
        oldStyleSheet: oldProps.style,
      });
    },
    indicatorStyle(styleSheet) {
      setStyle({
        comp,
        styleSheet,
        compName: "ProgressBar",
        styleType: STYLE_TYPE.PART_INDICATOR,
        oldStyleSheet: oldProps.style,
      });
    },
    value(value) {
      if (value !== oldProps.value) {
        comp.setValue(value, !!newProps.useAnimation);
      }
    },
    range(arr) {
      if (arr?.[0] !== oldProps?.range?.[0] || arr?.[1] !== oldProps?.range?.[1]) {
        comp.setRange(arr[0], arr[1]);
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

export class ProgressBarComp extends NativeProgressBar {
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
  setProps(newProps: ProgressBarProps, oldProps: Partial<ProgressBarProps>) {
    setProgressBarProps(this, newProps, oldProps);
  }
  insertBefore(child, beforeChild) {}
  static tagName = "ProgressBar";
  appendInitialChild(child) {}
  appendChild(child) {}
  close() {
    super.close();
  }
  setStyle(style, type = STYLE_TYPE.PART_MAIN) {
    setStyle({
      comp: this,
      styleSheet: style,
      compName: "ProgressBar",
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
