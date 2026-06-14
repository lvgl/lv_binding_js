import * as lv_conf from "../../core/lv_conf";
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
const NativeArc = bridge.NativeRender.NativeComponents.Arc;

const modes = {
  normal: lv_conf.LV_ARC_MODE_NORMAL,
  symmetrical: lv_conf.LV_ARC_MODE_SYMMETRICAL,
  reverse: lv_conf.LV_ARC_MODE_REVERSE,
};

export type ArcProps = CommonProps & {
  indicatorStyle?: StyleProps;
  onIndicatorPressedStyle?: StyleProps;
  onPressedStyle?: StyleProps;
  knobStyle?: StyleProps;
  onKnobPressedStyle?: StyleProps;
  onChange?: (event: OnChangeEvent) => void;
  range?: [number, number];
  value?: number;
  startAngle?: number;
  endAngle?: number;
  backgroundStartAngle?: number;
  backgroundEndAngle?: number;
  rotation?: number;
  mode?: "normal" | "symmetrical" | "reverse";
  changeRate?: number;
};

function setArcProps(comp, newProps: ArcProps, oldProps: ArcProps) {
  const setter = {
    ...CommonComponentApi({ compName: "Arc", comp, newProps, oldProps }),
    indicatorStyle(styleSheet) {
      setStyle({
        comp,
        styleSheet,
        compName: "Arc",
        styleType: STYLE_TYPE.PART_INDICATOR,
        oldStyleSheet: oldProps.indicatorStyle,
      });
    },
    onIndicatorPressedStyle(styleSheet) {
      setStyle({
        comp,
        styleSheet,
        compName: "Arc",
        styleType: STYLE_TYPE.PART_INDICATOR | STYLE_TYPE.STATE_PRESSED,
        oldStyleSheet: oldProps.onIndicatorPressedStyle,
      });
    },
    onPressedStyle(styleSheet) {
      setStyle({
        comp,
        styleSheet,
        compName: "Arc",
        styleType: STYLE_TYPE.STATE_PRESSED,
        oldStyleSheet: oldProps.onPressedStyle,
      });
    },
    knobStyle(styleSheet) {
      setStyle({
        comp,
        styleSheet,
        compName: "Arc",
        styleType: STYLE_TYPE.PART_KNOB,
        oldStyleSheet: oldProps.knobStyle,
      });
    },
    onKnobPressedStyle(styleSheet) {
      setStyle({
        comp,
        styleSheet,
        compName: "Arc",
        styleType: STYLE_TYPE.PART_KNOB | STYLE_TYPE.STATE_PRESSED,
        oldStyleSheet: oldProps.onKnobPressedStyle,
      });
    },
    onChange(fn) {
      handleEvent(comp, fn, EVENTTYPE_MAP.EVENT_VALUE_CHANGED);
    },
    range(arr) {
      if (!Array.isArray(arr)) return;
      const [min, max] = arr;
      if (min === oldProps.range?.[0] && max === oldProps.range?.[1]) return;
      if (isNaN(min) || isNaN(max)) return;
      comp.setRange([min, max]);
    },
    value(val) {
      if (isNaN(val)) return;
      if (val == oldProps.value) return;
      comp.setValue(val);
    },
    startAngle(val) {
      if (isNaN(val)) return;
      if (val == oldProps.startAngle) return;
      comp.setStartAngle(val);
    },
    endAngle(val) {
      if (isNaN(val)) return;
      if (val == oldProps.endAngle) return;
      comp.setEndAngle(val);
    },
    backgroundStartAngle(val) {
      if (isNaN(val)) return;
      if (val == oldProps.backgroundStartAngle) return;
      comp.setBackgroundStartAngle(val);
    },
    backgroundEndAngle(val) {
      if (isNaN(val)) return;
      if (val == oldProps.backgroundEndAngle) return;
      comp.setBackgroundEndAngle(val);
    },
    rotation(val) {
      if (isNaN(val)) return;
      if (val == oldProps.rotation) return;
      comp.setRotation(val);
    },
    mode(val) {
      if (val !== oldProps.mode && typeof modes[val] !== "undefined") {
        comp.setMode(modes[val]);
      }
    },
    changeRate(val) {
      if (isNaN(val)) return;
      if (val == oldProps.changeRate) return;
      comp.setChangeRate(val);
    },
  };
  Object.keys(setter).forEach((key) => {
    if (newProps.hasOwnProperty(key)) {
      setter[key](newProps[key]);
    }
  });
  applyDataPropsToDataset(comp, newProps);
}

export class ArcComp extends NativeArc {
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
  setProps(newProps: ArcProps, oldProps: ArcProps) {
    setArcProps(this, newProps, oldProps);
  }
  insertBefore(child, beforeChild) {}
  static tagName = "Arc";
  appendInitialChild(child) {}
  appendChild(child) {}
  close() {
    super.close();
  }
  setStyle(style, type = STYLE_TYPE.PART_MAIN) {
    setStyle({
      comp: this,
      styleSheet: style,
      compName: "Arc",
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
