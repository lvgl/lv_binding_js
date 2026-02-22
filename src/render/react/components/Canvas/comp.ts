import { setComponentProps, CommonProps, OnClickEvent } from "../common/index";
import { UpdatePayload } from "../../core/reconciler/propDiffer";
import {
  EVENTTYPE_MAP,
  handleEvent,
  setStyle,
  styleGetterProp,
} from "../config";
import CanvasContext from "./context";

const bridge = globalThis[Symbol.for('lvgljs')];
const NativeButton = bridge.NativeRender.NativeComponents.Button;

export type CanvasProps = CommonProps & {
  onClick?: (event: OnClickEvent) => void;
  align?: { type: number; pos: [number, number] };
  alignTo?: { type: number; pos: [number, number]; parent: any };
};

const canvasSetters = {
  onClick(comp, fn) {
    handleEvent(comp, fn, EVENTTYPE_MAP.EVENT_CLICKED);
  },
};

export class CanvasComp extends NativeButton {
  uid: string;
  style: any;
  ctx: CanvasContext = null;

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
  setProps(updatePayload: UpdatePayload<CanvasProps>, oldProps: CanvasProps) {
    setComponentProps(this, "Canvas", updatePayload, oldProps, canvasSetters);
  }
  insertBefore(child, beforeChild) {}
  static tagName = "Canvas";
  appendInitialChild(child) {}
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
