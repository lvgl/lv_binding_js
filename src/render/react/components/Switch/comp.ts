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
const NativeComp = bridge.NativeRender.NativeComponents.Switch;

export type SwitchProps = CommonProps & {
  checkedStyle?: StyleProps;
  onChange?: (event: OnChangeEvent) => void;
  checked?: boolean;
  disabled?: boolean;
};

const switchSetters = {
  checkedStyle(comp, styleSheet, oldProps) {
    setStyle({
      comp,
      styleSheet,
      compName: "Switch",
      styleType: STYLE_TYPE.STATE_CHECKED,
      oldStyleSheet: oldProps.checkedStyle,
    });
  },
  onChange(comp, fn) {
    handleEvent(comp, fn, EVENTTYPE_MAP.EVENT_VALUE_CHANGED);
  },
  checked(comp, val) {
    comp.setChecked(val);
  },
  disabled(comp, val) {
    comp.setDisabled(val);
  },
};

export class SwitchComp extends NativeComp {
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
  setProps(updatePayload: UpdatePayload<SwitchProps>, oldProps: SwitchProps) {
    setComponentProps(this, "Switch", updatePayload, oldProps, switchSetters);
  }
  insertBefore(child, beforeChild) {
    super.insertChildBefore(child, beforeChild);
  }
  appendInitialChild(child) {
    this.appendChild(child);
  }
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
      compName: "Switch",
      styleType: type,
      oldStyleSheet: {},
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
