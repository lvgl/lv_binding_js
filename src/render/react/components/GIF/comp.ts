import { UpdatePayload } from "../../core/reconciler/propDiffer";
import { BUILT_IN_SYMBOL } from "../../core/style/symbol";
import { isValidUrl, fetchBinary } from "../../utils/helpers";
import { setComponentProps, CommonProps } from "../common/index";
import {
  EVENTTYPE_MAP,
  handleEvent,
  styleGetterProp,
} from "../config";
import path from 'tjs:path';

const bridge = globalThis[Symbol.for('lvgljs')];
const NativeGIF = bridge.NativeRender.NativeComponents.GIF;

export type GIFProps = CommonProps & {
  src: string;
}

const gifSetters = {
  onClick(comp, fn) {
    handleEvent(comp, fn, EVENTTYPE_MAP.EVENT_CLICKED);
  },
  src(comp, url) {
    if (url) {
      if (BUILT_IN_SYMBOL[url]) {
        comp.setSymbol(BUILT_IN_SYMBOL[url]);
        return;
      }
      if (!isValidUrl(url)) {
        if (!path.isAbsolute(url)) {
          url = path.resolve(__dirname, url);
        }
        tjs.readFile(url)
          .then((data) => {
            comp.setGIFBinary(data.buffer);
          })
          .catch((e) => {
            console.log("setGIF error", e);
          });
      } else {
        fetchBinary(url)
          .then((buffer) => comp.setGIFBinary(buffer))
          .catch(console.warn);
      }
    }
  },
};

export class GIFComp extends NativeGIF {
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
  setProps(updatePayload: UpdatePayload<GIFProps>, oldProps: GIFProps) {
    setComponentProps(this, "GIF", updatePayload, oldProps, gifSetters);
  }
  insertBefore(child, beforeChild) {}
  static tagName = "GIF";
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
      compName: "GIF",
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
