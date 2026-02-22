import { UpdatePayload } from "../../core/reconciler/propDiffer";
import { StyleProps } from "../../core/style";
import { setComponentProps, CommonProps, OnChangeEvent } from "../common/index";
import {
  EVENTTYPE_MAP,
  STYLE_TYPE,
  handleEvent,
  setStyle,
  styleGetterProp,
} from "../config";

const bridge = globalThis[Symbol.for('lvgljs')];
const NativeRoller = bridge.NativeRender.NativeComponents.Roller;

export type RollerProps = CommonProps & {
  selectedStyle?: StyleProps;
  options: string[];
  selectIndex: number;
  visibleRowCount: number;
  /** Makes the roller circular */
  infinity?: boolean;
  onChange?: (event: OnChangeEvent) => void;
};

const rollerSetters = {
  selectedStyle(comp, styleSheet, oldProps) {
    setStyle({
      comp,
      styleSheet,
      compName: "Roller",
      styleType: STYLE_TYPE.PART_SELECTED,
      oldStyleSheet: oldProps.selectedStyle,
    });
  },
  options(comp, options) {
    comp.setOptions(options, options.length, comp.infinity);
  },
  selectIndex(comp, selectIndex) {
    comp.setSelectIndex(selectIndex);
  },
  visibleRowCount(comp, count) {
    comp.setVisibleRowCount(count);
  },
  onChange(comp, fn) {
    handleEvent(comp, fn, EVENTTYPE_MAP.EVENT_VALUE_CHANGED);
  },
  infinity(comp, infinity: boolean) {
    comp.infinity = infinity;
  },
};

export class RollerComp extends NativeRoller {
  uid: string;
  style: any;
  infinity: boolean = false;
  
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
  setProps(updatePayload: UpdatePayload<RollerProps>, oldProps: RollerProps) {
    setComponentProps(this, "Roller", updatePayload, oldProps, rollerSetters);
  }
  insertBefore(child, beforeChild) {}
  static tagName = "Roller";
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
      compName: "Roller",
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
