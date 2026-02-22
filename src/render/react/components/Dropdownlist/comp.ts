import { UpdatePayload } from "../../core/reconciler/propDiffer";
import { setComponentProps, CommonProps, OnChangeEvent } from "../common/index";
import {
  EDropdownListArrowDirection,
  EDropdownlistDirection,
  EVENTTYPE_MAP,
  handleEvent,
  setStyle,
  styleGetterProp,
} from "../config";

const bridge = globalThis[Symbol.for('lvgljs')];
const NativeDropdownlist = bridge.NativeRender.NativeComponents.Dropdownlist;

export type DropdownListProps = CommonProps & {
  items: string[];
  arrow: typeof EDropdownListArrowDirection[keyof typeof EDropdownListArrowDirection];
  selectIndex: number;
  /** If the text is null the selected option is displayed on the items */
  text?: string;
  direction: typeof EDropdownlistDirection[keyof typeof EDropdownlistDirection];
  highlightSelect: boolean;
  onChange?: (event: OnChangeEvent) => void;
};

const dropdownlistSetters = {
  items(comp, items) {
    comp.setItems(items, items.length);
  },
  arrow(comp, arrow) {
    comp.setArrowDir(arrow);
  },
  selectIndex(comp, selectIndex) {
    comp.setselectIndex(selectIndex);
  },
  text(comp, text) {
    comp.setText(text);
  },
  direction(comp, direction) {
    comp.setDir(direction);
  },
  highlightSelect(comp, payload) {
    comp.setHighLightSelect(payload);
  },
  onChange(comp, fn) {
    handleEvent(comp, fn, EVENTTYPE_MAP.EVENT_VALUE_CHANGED);
  },
};

export class DropdownlistComp extends NativeDropdownlist {
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
  setProps(updatePayload: UpdatePayload<DropdownListProps>, oldProps: DropdownListProps) {
    setComponentProps(this, "Dropdownlist", updatePayload, oldProps, dropdownlistSetters);
  }
  insertBefore(child, beforeChild) {}
  static tagName = "Dropdownlist";
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
      compName: "Dropdownlist",
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
