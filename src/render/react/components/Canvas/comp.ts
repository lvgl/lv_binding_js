import { CommonProps, OnClickEvent } from "../common";
import {
  EVENTTYPE_MAP,
  STYLE_TYPE,
  handleEvent,
  setStyle,
  styleGetterProp,
  applyDataPropsToDataset,
} from "../config";
import CanvasContext from "./context";

import { GetBridge } from "../../core/bridge";

const bridge = GetBridge();
const NativeButton = bridge.NativeRender.NativeComponents.Button;

export type CanvasProps = CommonProps & {
  onClick?: (event: OnClickEvent) => void;
  align?: { type: number; pos: [number, number] };
  alignTo?: { type: number; pos: [number, number]; parent: any };
};

function setCanvasProps(comp, newProps: CanvasProps, oldProps: CanvasProps) {
  const setter = {
    set style(styleSheet) {
      setStyle({
        comp,
        styleSheet,
        compName: "Canvas",
        styleType: STYLE_TYPE.PART_MAIN,
        oldStyleSheet: oldProps.style,
      });
    },
    set onClick(fn) {
      handleEvent(comp, fn, EVENTTYPE_MAP.EVENT_CLICKED);
    },
    set align({ type, pos = [0, 0] }) {
      if (
        !type ||
        (type === oldProps.align?.type &&
          pos[0] === oldProps.align?.pos?.[0] &&
          pos[1] === oldProps.align?.pos?.[1])
      )
        return;
      comp.align(type, pos);
    },
    set alignTo({ type, pos = [0, 0], parent }) {
      if (
        !type ||
        (type === oldProps.alignTo?.type &&
          pos[0] === (oldProps.alignTo?.pos?.[0] || 0) &&
          pos[1] === (oldProps.alignTo?.pos?.[1] || 0) &&
          parent?.uid === oldProps.alignTo?.parent?.uid)
      )
        return;
      comp.alignTo(type, pos, parent);
    },
  };
  Object.assign(setter, newProps);
  applyDataPropsToDataset(comp, newProps);
}

export class CanvasComp extends NativeButton {
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
  setProps(newProps: CanvasProps, oldProps: CanvasProps) {
    setCanvasProps(this, newProps, oldProps);
  }
  insertBefore(child, beforeChild) {}
  static tagName = "Canvas";
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
      compName: "Canvas",
      styleType: type,
      oldStyleSheet: null,
      isInit: false,
    });
  }

  getContext() {
    if (!this.ctx) {
      this.ctx = new CanvasContext();
    }
    return this.ctx;
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
