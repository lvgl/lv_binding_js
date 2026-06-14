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
const NativeCalendar = bridge.NativeRender.NativeComponents.Calendar;

export type CalendarProps = CommonProps & {
  today?: string;
  shownMonth?: string;
  highLightDates?: string[];
  onChange?: (event: OnChangeEvent) => void;
};

function setCalendarProps(comp, newProps: CalendarProps, oldProps: CalendarProps) {
  const setter = {
    ...CommonComponentApi({ compName: "Calendar", comp, newProps, oldProps }),
    onChange(fn) {
      handleEvent(comp, fn, EVENTTYPE_MAP.EVENT_VALUE_CHANGED);
    },
    today(today) {
      if (today && today !== oldProps.today) {
        const date = new Date(today);
        comp.setToday(date.getFullYear(), date.getMonth() + 1, date.getDate());
      }
    },
    shownMonth(month) {
      if (month && month !== oldProps.shownMonth) {
        const date = new Date(month);
        comp.setShownMonth(date.getFullYear(), date.getMonth() + 1);
      }
    },
    highLightDates(dates) {
      if (Array.isArray(dates) && dates !== oldProps.highLightDates) {
        dates = dates.map((item) => {
          const date = new Date(item);
          return [date.getFullYear(), date.getMonth() + 1, date.getDate()];
        });
        comp.setHighlightDates(dates, dates.length);
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

export class CalendarComp extends NativeCalendar {
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
  setProps(newProps: CalendarProps, oldProps: CalendarProps) {
    setCalendarProps(this, newProps, oldProps);
  }
  insertBefore(child, beforeChild) {}
  static tagName = "Calendar";
  appendInitialChild(child) {}
  appendChild(child) {}
  close() {
    super.close();
  }
  setStyle(style, type = STYLE_TYPE.PART_MAIN) {
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
