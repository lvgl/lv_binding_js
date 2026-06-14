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
import { LV_DIR_MAP } from "../../core/lv_types";

const bridge = GetBridge();
const NativeTabs = bridge.NativeRender.NativeComponents.TabView;

export type TabsProps = CommonProps & {
  tabs: string[];
  tabPosition: "left" | "top" | "right" | "bottom";
  tabSize?: number;
};

function setTabsProps(comp, newProps: TabsProps, oldProps: Partial<TabsProps>) {
  const setter = {
    ...CommonComponentApi({ compName: "Tabs", comp, newProps, oldProps }),
    onClick(fn) {
      handleEvent(comp, fn, EVENTTYPE_MAP.EVENT_CLICKED);
    },
    onPressed(fn) {
      handleEvent(comp, fn, EVENTTYPE_MAP.EVENT_PRESSED);
    },
    onLongPressed(fn) {
      handleEvent(comp, fn, EVENTTYPE_MAP.EVENT_LONG_PRESSED);
    },
    onLongPressRepeat(fn) {
      handleEvent(comp, fn, EVENTTYPE_MAP.EVENT_LONG_PRESSED_REPEAT);
    },
  };
  Object.keys(setter).forEach((key) => {
    if (newProps.hasOwnProperty(key)) {
      setter[key](newProps[key]);
    }
  });
  applyDataPropsToDataset(comp, newProps);
}

const tabPositionObj = {
  left: LV_DIR_MAP.left,
  top: LV_DIR_MAP.top,
  right: LV_DIR_MAP.right,
  bottom: LV_DIR_MAP.bottom,
};

export class TabsComp extends NativeTabs {
  constructor({ uid, tabPosition, tabSize = 0 }) {
    tabPosition = tabPositionObj[tabPosition] || tabPositionObj.top;
    super({ uid, tabPosition, tabSize });
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
    this.currentAppendIndex = 0;
  }
  setProps(newProps: TabsProps, oldProps: Partial<TabsProps>) {
    this.tabs = newProps.tabs;
    setTabsProps(this, newProps, oldProps);
  }
  insertBefore(child, beforeChild) {}
  static tagName = "Tabs";
  appendInitialChild(child) {
    this.appendChild(child);
  }
  appendChild(child) {
    this.setTab(this.tabs[this.currentAppendIndex] || "", child);
    this.currentAppendIndex++;
  }
  close() {
    super.close();
  }
  setStyle(style, type = STYLE_TYPE.PART_MAIN) {
    setStyle({
      comp: this,
      styleSheet: style,
      compName: "Tabs",
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
