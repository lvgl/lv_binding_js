import { UpdatePayload } from "../../core/reconciler/propDiffer";
import { StyleProps } from "../../core/style";
import { setComponentProps, CommonProps } from "../common/index";
import { STYLE_TYPE, setStyle, styleGetterProp } from "../config";

const bridge = globalThis[Symbol.for('lvgljs')];
const NativeProgressBar = bridge.NativeRender.NativeComponents.ProgressBar;

export type ProgressBarProps = CommonProps & {
  value: number;
  range: number[];
  useAnimation?: boolean;
  indicatorStyle?: StyleProps;
};

const progressBarSetters = {
  indicatorStyle(comp, styleSheet, oldProps) {
    setStyle({
      comp,
      styleSheet,
      compName: "ProgressBar",
      styleType: STYLE_TYPE.PART_INDICATOR,
      oldStyleSheet: oldProps.indicatorStyle,
    });
  },
  range(comp, arr) {
    comp.setRange(arr[0], arr[1]);
  },
  value(comp, value) {
    comp.setValue(value, comp.useAnimation);
  },
  useAnimation(comp, useAnimation: boolean) {
    comp.useAnimation = useAnimation;
  },
};

export class ProgressBarComp extends NativeProgressBar {
  uid: string;
  style: any;
  useAnimation: boolean = false;
  
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
  setProps(updatePayload: UpdatePayload<ProgressBarProps>, oldProps: ProgressBarProps) {
    setComponentProps(this, "ProgressBar", updatePayload, oldProps, progressBarSetters);
  }
  insertBefore(child, beforeChild) {}
  static tagName = "ProgressBar";
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
