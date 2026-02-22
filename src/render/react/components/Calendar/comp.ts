import { UpdatePayload } from "../../core/reconciler/propDiffer";
import { setComponentProps, CommonProps, OnChangeEvent } from "../common/index";
import {
  EVENTTYPE_MAP,
  handleEvent,
  setStyle,
  styleGetterProp,
} from "../config";

const bridge = globalThis[Symbol.for('lvgljs')];
const NativeCalendar = bridge.NativeRender.NativeComponents.Calendar;

export type CalendarProps = CommonProps & {
  today?: string;
  shownMonth?: string;
  highLightDates?: string[];
  onChange?: (event: OnChangeEvent) => void;
};

const calendarSetters = {
  onChange(comp, fn) {
    handleEvent(comp, fn, EVENTTYPE_MAP.EVENT_VALUE_CHANGED);
  },
  today(comp, today) {
    const date = new Date(today);
    comp.setToday(date.getFullYear(), date.getMonth() + 1, date.getDate());
  },
  shownMonth(comp, month) {
    const date = new Date(month);
    comp.setShownMonth(date.getFullYear(), date.getMonth() + 1);
  },
  highLightDates(comp, dates) {
    dates = dates.map((item) => {
      const date = new Date(item);
      return [date.getFullYear(), date.getMonth() + 1, date.getDate()];
    });
    comp.setHighlightDates(dates, dates.length);
  },
};

export class CalendarComp extends NativeCalendar {
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
  setProps(updatePayload: UpdatePayload<CalendarProps>, oldProps: CalendarProps) {
    setComponentProps(this, "Calendar", updatePayload, oldProps, calendarSetters);
  }
  insertBefore(child, beforeChild) {}
  static tagName = "Calendar";
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
      compName: "Calendar",
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
