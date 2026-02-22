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
const NativeView = bridge.NativeRender.NativeComponents.Checkbox;

export type CheckboxProps = CommonProps & {
  checked?: boolean;
  disabled?: boolean;
  text?: string;
  checkedStyle?: StyleProps;
  indicatorStyle?: StyleProps;
  indicatorCheckedStyle?: StyleProps;
  onChange?: (event: OnChangeEvent) => void;
};

const checkboxSetters = {
  checked(comp, val) {
    comp.setChecked(val);
  },
  disabled(comp, val) {
    comp.setDisabled(val);
  },
  text(comp, val) {
    comp.setText(val);
  },
  checkedStyle(comp, styleSheet, oldProps) {
    setStyle({
      comp,
      styleSheet,
      compName: "Checkbox",
      styleType: STYLE_TYPE.STATE_CHECKED,
      oldStyleSheet: oldProps.checkedStyle,
    });
  },
  indicatorStyle(comp, styleSheet, oldProps) {
    setStyle({
      comp,
      styleSheet,
      compName: "Checkbox",
      styleType: STYLE_TYPE.PART_INDICATOR,
      oldStyleSheet: oldProps.indicatorStyle,
    });
  },
  indicatorCheckedStyle(comp, styleSheet, oldProps) {
    setStyle({
      comp,
      styleSheet,
      compName: "Checkbox",
      styleType: STYLE_TYPE.PART_INDICATOR | STYLE_TYPE.STATE_CHECKED,
      oldStyleSheet: oldProps.indicatorCheckedStyle,
    });
  },
  onChange(comp, fn) {
    handleEvent(comp, fn, EVENTTYPE_MAP.EVENT_VALUE_CHANGED);
  },
};

export class CheckboxComp extends NativeView {
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
  setProps(updatePayload: UpdatePayload<CheckboxProps>, oldProps: CheckboxProps) {
    setComponentProps(this, "Checkbox", updatePayload, oldProps, checkboxSetters);
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
      compName: "Checkbox",
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
