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
import { ScrollStyle } from "./pipe/scroll";
import { ShadowStyle } from "./pipe/shadow";
import { TextStyle } from "./pipe/text";
import { TransStyle } from "./pipe/trans";
import { PostProcessStyle } from "./post";

import type { StyleProps, StyleType } from "./type";
import { StyleBatch, StyleTransformResult } from "./batch";

/** Stage function in the style transform pipeline. */
export type StylePipelineFn = (
  style: StyleType,
  result: StyleTransformResult,
  compName?: string,
) => void;

// FlexStyle/GridStyle declare the display-narrowed slice of StyleType as their
// parameter; the merged runtime style is a plain dict, so widen them here.
const StylePipelineList = [
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
] as readonly StylePipelineFn[];

function transformStyle(
  style: StyleType,
  compName: string,
): NativeStylePayload {
  const result: StyleTransformResult = {
    batch: new StyleBatch(),
    transition: undefined,
  };
  for (const func of StylePipelineList) {
    func(style, result, compName);
  }
  return { batch: result.batch.get(), transition: result.transition };
}

export function setStyle({
  comp,
  styleSheet,
  compName,
  styleType,
  oldStyleSheet,
  isInit = true,
  defaultStyle = {},
}: {
  comp: any;
  styleSheet: StyleProps;
  compName: string;
  styleType: number;
  oldStyleSheet: StyleProps | null;
  isInit?: boolean;
  defaultStyle?: Record<string, unknown>;
}) {
  if (!styleSheet) return;
  styleSheet = Array.isArray(styleSheet) ? styleSheet : [styleSheet];
  oldStyleSheet = Array.isArray(oldStyleSheet)
    ? oldStyleSheet
    : oldStyleSheet
      ? [oldStyleSheet]
      : [];
  const maybeChange = styleSheet.some((item, i) => item !== oldStyleSheet[i]);

  if (!maybeChange) return;
  const mergedStyle = Object.assign(
    {},
    defaultStyle,
    ...styleSheet,
  ) as StyleType;
  const nativeStyle = transformStyle(mergedStyle, compName);
  comp.nativeSetStyle(nativeStyle, styleType, isInit);
  PostProcessStyle({ comp, styleSheet, styleType });
}

export type { StyleProps } from "./type";
