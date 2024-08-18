import { ArcStyle } from "./pipe/arc";
import { BackgroundStyle } from "./pipe/background";
import { BorderStyle } from "./pipe/border";
import { DisplayStyle } from "./pipe/display";
import { FlexStyle } from "./pipe/flex";
import { GridStyle } from "./pipe/grid";
import { LineStyle } from "./pipe/line";
import { MiscStyle } from "./pipe/misc";
import { OpacityStyle } from "./pipe/opacity";
import { OutlineStyle } from "./pipe/outline";
import { PaddingStyle } from "./pipe/padding";
import { PosStyle } from "./pipe/pos";
import { ScrollStyle } from "./pipe/scoll";
import { ShadowStyle } from "./pipe/shadow";
import { TextStyle } from "./pipe/text";
import { TransStyle } from "./pipe/trans";
import { PostProcessStyle } from "./post";

class StyleSheet {
  static transformStyle: (style, compName) => {};

  static pipeline(args: any[]) {
    StyleSheet.transformStyle = (style, compName) => {
      const result = {};
      args.reduce((_, func) => func(style, result, compName), null);
      return result;
    };
  }

  static transform(style, compName) {
    const result = StyleSheet.transformStyle(style, compName);

    return result;
  }

  static create() {
    return new Proxy(
      { __dirty: true },
      {
        set(obj, prop, value) {
          if (prop !== "__dirty") {
            obj[prop] = value;
            obj.__dirty = true;
          } else {
            obj.__dirty = value;
          }
        },
      },
    );
  }
}

StyleSheet.pipeline([
  FlexStyle,
  GridStyle,
  TextStyle,
  OutlineStyle,
  BorderStyle,
  PosStyle,
  BackgroundStyle,
  PaddingStyle,
  ScrollStyle,
  OpacityStyle,
  MiscStyle,
  TransStyle,
  LineStyle,
  ShadowStyle,
  DisplayStyle,
  ArcStyle,
]);

export function setStyle({
  comp,
  styleSheet,
  compName,
  styleType,
  oldStyleSheet,
  isInit = true,
  defaultStyle = {},
}) {
  if (!styleSheet) return;
  styleSheet = Array.isArray(styleSheet) ? styleSheet : [styleSheet];
  oldStyleSheet = Array.isArray(oldStyleSheet)
    ? oldStyleSheet
    : [oldStyleSheet];
  const maybeChange = styleSheet.some((item, i) => item !== oldStyleSheet[i]);

  if (!maybeChange) return;
  styleSheet = Object.assign({}, defaultStyle, ...styleSheet);
  const result = StyleSheet.transform(styleSheet, compName);

  const keys = Object.keys(result);
  comp.nativeSetStyle(result, keys, keys.length, styleType, isInit);
  PostProcessStyle({ comp, styleSheet, styleType });
}

export type StyleProps = Parameters<typeof FlexStyle>[0] &
// Remove once every style is defined in TS
{[key: string]: any};