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
const NativeComp = bridge.NativeRender.NativeComponents.Switch;

export type SwitchProps = CommonProps & {
  checkedStyle?: StyleProps;
  onChange?: (event: OnChangeEvent) => void;
  checked?: boolean;
  disabled?: boolean;
};

function setSwitchProps(comp, newProps: SwitchProps, oldProps: SwitchProps) {
  const setter = {
    ...CommonComponentApi({ compName: "Switch", comp, newProps, oldProps }),
    checkedStyle(styleSheet) {
      setStyle({
        comp,
        styleSheet,
        compName: "Switch",
        styleType: STYLE_TYPE.STATE_CHECKED,
        oldStyleSheet: oldProps.checkedStyle,
      });
    },
    onChange(fn) {
      handleEvent(comp, fn, EVENTTYPE_MAP.EVENT_VALUE_CHANGED);
    },
    checked(val) {
      if (isNaN(val)) return;
      if (val == oldProps.checked) return;
      comp.setChecked(val);
    },
    disabled(val) {
      if (val !== oldProps.disabled) {
        comp.setDisabled(val);
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

export class SwitchComp extends NativeComp {
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
  setProps(newProps, oldProps) {
    setSwitchProps(this, newProps, oldProps);
  }
  insertBefore(child, beforeChild) {}
  appendInitialChild(child) {}
  appendChild(child) {}
  close() {
    super.close();
  }
  setStyle(style, type = STYLE_TYPE.PART_MAIN) {
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
