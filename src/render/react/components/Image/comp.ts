import { UpdatePayload } from "../../core/reconciler/propDiffer";
import { BUILT_IN_SYMBOL } from "../../core/style/symbol";
import { isValidUrl, fetchBinary } from "../../utils/helpers";
import { setComponentProps, CommonProps } from "../common/index";
import {
  EVENTTYPE_MAP,
  handleEvent,
  setStyle,
  styleGetterProp,
} from "../config";
import path from 'tjs:path';

const bridge = globalThis[Symbol.for('lvgljs')];
const NativeImage = bridge.NativeRender.NativeComponents.Image;

export type ImageProps = CommonProps & {
  /** GIF loading resource, support network url, local path, buildtin symbol */
  src: string;
};

const imageSetters = {
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
          url = path.resolve(url);
        }
        tjs.readFile(url)
          .then((data) => {
            comp.setImageBinary(data.buffer);
          })
          .catch((e) => {
            console.log("setImage error", e);
          });
      } else {
        fetchBinary(url)
          .then((buffer) => comp.setImageBinary(buffer))
          .catch(console.warn);
      }
    }
  },
};

export class ImageComp extends NativeImage {
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
  setProps(updatePayload: UpdatePayload<ImageProps>, oldProps: ImageProps) {
    setComponentProps(this, "Image", updatePayload, oldProps, imageSetters);
  }
  insertBefore(child, beforeChild) {}
  static tagName = "Image";
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
      compName: "Image",
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
