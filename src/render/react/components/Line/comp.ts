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
const NativeLine = bridge.NativeRender.NativeComponents.Line;

export type LineProps = CommonProps & {
  points: [number, number][];
};

function setLineProps(comp, newProps: LineProps, oldProps: Partial<LineProps>) {
  const setter = {
    ...CommonComponentApi({ compName: "Keyboard", comp, newProps, oldProps }),
    points(points) {
      if (
        (Array.isArray(points) && points !== oldProps?.points) ||
        points?.length !== oldProps?.points?.length
      ) {
        comp.setPoints(points, points.length);
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

export class LineComp extends NativeLine {
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
  setProps(newProps: LineProps, oldProps: Partial<LineProps>) {
    setLineProps(this, newProps, oldProps);
  }
  insertBefore(child, beforeChild) {}
  static tagName = "Line";
  appendInitialChild(child) {}
  appendChild(child) {}
  close() {
    super.close();
  }
  setStyle(style, type = STYLE_TYPE.PART_MAIN) {
    setStyle({
      comp: this,
      styleSheet: style,
      compName: "Line",
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
