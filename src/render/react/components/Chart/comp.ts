import { UpdatePayload } from "../../core/reconciler/propDiffer";
import { StyleProps } from "../../core/style";
import { colorTransform } from "../../core/style/color";
import { setComponentProps, CommonProps } from "../common/index";
import {
  STYLE_TYPE,
  setStyle,
  styleGetterProp,
} from "../config";

const bridge = globalThis[Symbol.for('lvgljs')];
const NativeChart = bridge.NativeRender.NativeComponents.Chart;

const chartType = {
  none: 0,
  line: 1,
  bar: 2,
  scatter: 3,
};

export type ChartProps = CommonProps & {
  onPressedStyle?: StyleProps;
  indicatorStyle?: StyleProps;
  pointStyle?: StyleProps;
  itemStyle?: StyleProps;
  type?: string;
  divLineCount?: [number, number];
  pointNum?: number;
  scatterData?: any[];
  leftAxisOption?: any;
  leftAxisData?: any[];
  bottomAxisOption?: any;
  bottomAxisData?: any[];
  rightAxisOption?: any;
  rightAxisData?: any[];
  topAxisOption?: any;
  topAxisData?: any[];
  leftAxisLabels?: any[];
  rightAxisLabels?: any[];
  topAxisLabels?: any[];
  bottomAxisLabels?: any[];
  leftAxisRange?: [number, number];
  rightAxisRange?: [number, number];
  topAxisRange?: [number, number];
  bottomAxisRange?: [number, number];
};

const chartSetters = {
  onPressedStyle(comp, styleSheet, oldProps) {
    setStyle({
      comp,
      styleSheet,
      compName: "Chart",
      styleType: STYLE_TYPE.STATE_PRESSED,
      oldStyleSheet: oldProps.onPressedStyle,
    });
  },
  indicatorStyle(comp, styleSheet, oldProps) {
    setStyle({
      comp,
      styleSheet,
      compName: "Chart",
      styleType: STYLE_TYPE.PART_INDICATOR,
      oldStyleSheet: oldProps.indicatorStyle,
    });
  },
  itemStyle(comp, styleSheet, oldProps) {
    setStyle({
      comp,
      styleSheet,
      compName: "Chart",
      styleType: STYLE_TYPE.PART_ITEMS,
      oldStyleSheet: oldProps.itemStyle,
    });
  },
  type(comp, type) {
    if (chartType[type] !== void 0) {
      comp.setType(chartType[type]);
    }
  },
  divLineCount(comp, arr) {
    comp.setDivLineCount(arr);
  },
  pointNum(comp, num) {
    comp.setPointNum(num);
  },
  scatterData(comp, data) {
    if (data) {
      data = data.map((item) => {
        const arr = [];
        item.data.forEach((item1) => {
          arr.push(item1[0]);
          arr.push(item1[1]);
        });
        return {
          color: item.color === void 0 ? -1 : colorTransform(item.color),
          data: arr,
        };
      });
      comp.setScatterData(data);
    }
  },
  leftAxisOption(comp, options) {
    comp.setLeftAxisOption(options);
  },
  leftAxisData(comp, data) {
    if (data) {
      data = data.map((item) => ({
        ...item,
        color: item.color === void 0 ? -1 : colorTransform(item.color),
      }));
      comp.setLeftAxisData(data);
    }
  },
  bottomAxisOption(comp, options) {
    comp.setBottomAxisOption(options);
  },
  bottomAxisData(comp, data) {
    if (data) {
      data = data.map((item) => ({
        ...item,
        color: item.color === void 0 ? -1 : colorTransform(item.color),
      }));
      comp.setBottomAxisData(data);
    }
  },
  rightAxisOption(comp, options) {
    comp.setRightAxisOption(options);
  },
  rightAxisData(comp, data) {
    if (data) {
      data = data.map((item) => ({
        ...item,
        color: item.color === void 0 ? -1 : colorTransform(item.color),
      }));
      comp.setRightAxisData(data);
    }
  },
  topAxisOption(comp, options) {
    comp.setTopAxisOption(options);
  },
  topAxisData(comp, data) {
    if (data) {
      data = data.map((item) => ({
        ...item,
        color: item.color === void 0 ? -1 : colorTransform(item.color),
      }));
      comp.setTopAxisData(data);
    }
  },
  leftAxisLabels(comp, arr) {
    comp.setLeftAxisLabels(arr);
  },
  rightAxisLabels(comp, arr) {
    comp.setRightAxisLabels(arr);
  },
  topAxisLabels(comp, arr) {
    comp.setTopAxisLabels(arr);
  },
  bottomAxisLabels(comp, arr) {
    comp.setBottomAxisLabels(arr);
  },
  leftAxisRange(comp, arr) {
    comp.setLeftAxisRange(arr);
  },
  rightAxisRange(comp, arr) {
    comp.setRightAxisRange(arr);
  },
  topAxisRange(comp, arr) {
    comp.setTopAxisRange(arr);
  },
  bottomAxisRange(comp, arr) {
    comp.setBottomAxisRange(arr);
  },
};

export class ChartComp extends NativeChart {
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
  setProps(updatePayload: UpdatePayload<ChartProps>, oldProps: ChartProps) {
    setComponentProps(this, "Chart", updatePayload, oldProps, chartSetters);
  }
  insertBefore(child, beforeChild) {}
  static tagName = "Chart";
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
      compName: "Chart",
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
