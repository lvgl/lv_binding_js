import { setComponentProps, CommonProps } from "../common/index";
import { UpdatePayload } from "../../core/reconciler/propDiffer";
import {
  EVENTTYPE_MAP,
  handleEvent,
  styleGetterProp,
} from "../config";

const bridge = globalThis[Symbol.for('lvgljs')];
const NativeTabs = bridge.NativeRender.NativeComponents.TabView;

export type TabsProps = CommonProps & {
  tabs: string[];
  tabPosition: "left" | "top" | "right" | "bottom";
  tabSize?: number;
};

const tabsSetters = {
  onClick(comp, fn) {
    handleEvent(comp, fn, EVENTTYPE_MAP.EVENT_CLICKED);
  },
  onPressed(comp, fn) {
    handleEvent(comp, fn, EVENTTYPE_MAP.EVENT_PRESSED);
  },
  onLongPressed(comp, fn) {
    handleEvent(comp, fn, EVENTTYPE_MAP.EVENT_LONG_PRESSED);
  },
  onLongPressRepeat(comp, fn) {
    handleEvent(comp, fn, EVENTTYPE_MAP.EVENT_LONG_PRESSED_REPEAT);
  },
};

const tabPositionObj = {
  left: 1 << 0,
  top: 1 << 2,
  right: 1 << 1,
  bottom: 1 << 3,
};

export class TabsComp extends NativeTabs {
  uid: string;
  style: any;
  
  constructor({ uid, tabPosition, tabSize = 0 }) {
    tabPosition = tabPositionObj[tabPosition] || tabPositionObj.top;
    super({ uid, tabPosition, tabSize });
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
    this.currentAppendIndex = 0;
  }
  setProps(updatePayload: UpdatePayload<TabsProps>, oldProps: TabsProps) {
    if (updatePayload?.tabs) {
      this.tabs = updatePayload.tabs;
    }
    setComponentProps(this, "Tabs", updatePayload, oldProps, tabsSetters);
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
  removeChild(child) {}
  close() {
    super.close();
  }
  setStyle(style, type = 0x0000) {
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
