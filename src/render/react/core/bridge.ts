export interface LvgljsComponentCtor<
  T extends LvgljsNativeComponent = LvgljsNativeComponent,
> {
  new (opts: Record<string, unknown>): T;
}

export interface LvgljsStyleRect {
  left(): number;
  top(): number;
  width(): number;
  height(): number;
}

export interface LvgljsBoundingClientRect {
  width: number;
  height: number;
  left: number;
  top: number;
}

/** Methods bound on every native component via *_wrap.cpp. */
export declare class LvgljsNativeComponent {
  uid: string | number;
  get style(): LvgljsStyleRect;
  set style(value: unknown);
  dataset: Record<string, unknown>;
  ctx?: unknown;
  constructor(opts: Record<string, unknown>);
  close(): void;
  addEventListener(eventType: number): boolean;
  getBoundingClientRect(): LvgljsBoundingClientRect;
}

/** appendChild / insertChildBefore (Mask, Window, View, Button, TabView). Child removal: reconciler detachInstance only. */
export declare class LvgljsChildContainerComponent extends LvgljsNativeComponent {
  appendChild(child: LvgljsNativeComponent): void;
  insertChildBefore(
    child: LvgljsNativeComponent,
    beforeChild?: LvgljsNativeComponent,
  ): void;
}

/** align / alignTo (most widgets except Mask and Window). */
export declare class LvgljsAlignableComponent extends LvgljsNativeComponent {
  align(type: number, pos: number[]): boolean;
  alignTo(
    type: number,
    pos: number[],
    parent: LvgljsNativeComponent,
  ): boolean;
}

/** moveToFront / moveToBackground / scrollIntoView (all except Mask and Window). */
export declare class LvgljsScrollableComponent extends LvgljsAlignableComponent {
  moveToFront(): void;
  moveToBackground(): void;
  scrollIntoView(): void;
}

/** Full container: child tree + align + z-order (View, Button, TabView). */
export declare class LvgljsWidgetComponent extends LvgljsScrollableComponent {
  appendChild(child: LvgljsNativeComponent): void;
  insertChildBefore(
    child: LvgljsNativeComponent,
    beforeChild?: LvgljsNativeComponent,
  ): void;
}

export declare class LvgljsBackgroundWidgetComponent extends LvgljsWidgetComponent {
  setBackgroundImage(
    buffer: ArrayBuffer | null,
    type: number,
    symbol?: string,
  ): boolean;
}

/** Leaf widgets with setBackgroundImage but no child tree (Arc, Switch, ...). */
export declare class LvgljsBackgroundScrollableComponent extends LvgljsScrollableComponent {
  setBackgroundImage(
    buffer: ArrayBuffer | null,
    type: number,
    symbol?: string,
  ): boolean;
}

/** List: child tree + align + z-order, no insertChildBefore. */
export declare class LvgljsListComponent extends LvgljsScrollableComponent {
  appendChild(child: LvgljsNativeComponent): void;
}

export declare class LvgljsArcComponent extends LvgljsBackgroundScrollableComponent {
  setRange(range: [number, number]): void;
  setValue(value: number): void;
  setStartAngle(angle: number): void;
  setEndAngle(angle: number): void;
  setBackgroundStartAngle(angle: number): void;
  setBackgroundEndAngle(angle: number): void;
  setRotation(rotation: number): void;
  setMode(mode: number): void;
  setChangeRate(rate: number): void;
  setArcImage(
    buffer: ArrayBuffer | null,
    type: number,
    symbol?: string,
  ): boolean;
}

export declare class LvgljsButtonComponent extends LvgljsBackgroundWidgetComponent {}

export declare class LvgljsViewComponent extends LvgljsBackgroundWidgetComponent {}

export declare class LvgljsTextComponent extends LvgljsScrollableComponent {
  setText(text: string): void;
}

export declare class LvgljsImageComponent extends LvgljsScrollableComponent {
  setImageBinary(buffer: ArrayBuffer): boolean;
  setSymbol(symbol: string): void;
}

export declare class LvgljsSwitchComponent extends LvgljsBackgroundScrollableComponent {
  setChecked(checked: boolean): void;
  setDisabled(disabled: boolean): void;
}

export declare class LvgljsCheckboxComponent extends LvgljsBackgroundScrollableComponent {
  setText(text: string): void;
  setChecked(checked: boolean): void;
  setDisabled(disabled: boolean): void;
}

export declare class LvgljsTextareaComponent extends LvgljsScrollableComponent {
  setOneLine(oneLine: boolean): void;
  setAutoKeyboard(enabled: boolean | number): void;
  setText(text: string): void;
  setPlaceHolder(text: string): void;
  setPasswordMode(enabled: boolean): void;
  setMaxLength(length: number): void;
}

export declare class LvgljsKeyboardComponent extends LvgljsScrollableComponent {
  setMode(mode: number): void;
  setTextarea(textarea: LvgljsTextareaComponent): void;
}

export declare class LvgljsDropdownlistComponent extends LvgljsScrollableComponent {
  setItems(items: string[], count: number): void;
  setSelectIndex(index: number): void;
  setText(text: string): void;
  setDir(direction: number): void;
  setArrowDir(arrow: number): void;
  setHighLightSelect(enabled: boolean): void;
}

export declare class LvgljsProgressBarComponent extends LvgljsBackgroundScrollableComponent {
  setValue(value: number, animated: boolean): void;
  setRange(min: number, max: number): void;
}

export declare class LvgljsRollerComponent extends LvgljsScrollableComponent {
  setOptions(options: string[], count: number, infinity: boolean): void;
  setSelectIndex(index: number): void;
  setVisibleRowCount(count: number): void;
}

export declare class LvgljsSliderComponent extends LvgljsBackgroundScrollableComponent {
  setRange(range: [number, number]): void;
  setValue(value: number): void;
}

export declare class LvgljsLineComponent extends LvgljsScrollableComponent {
  setPoints(points: [number, number][], count: number): void;
}

export declare class LvgljsCalendarComponent extends LvgljsScrollableComponent {
  setToday(year: number, month: number, day: number): void;
  setShownMonth(year: number, month: number): void;
  setHighlightDates(dates: [number, number, number][], count: number): void;
}

export declare class LvgljsGIFComponent extends LvgljsScrollableComponent {
  setGIFBinary(buffer: ArrayBuffer): boolean;
  pause(): void;
  resume(): void;
}

export declare class LvgljsTabViewComponent extends LvgljsBackgroundWidgetComponent {
  setTab(tab: string, content: LvgljsNativeComponent): void;
  currentAppendIndex: number;
  tabs: string[];
}

export declare class LvgljsChartComponent extends LvgljsBackgroundScrollableComponent {
  setType(type: number): void;
  setDivLineCount(count: [number, number]): void;
  setPointNum(num: number): void;
  setScatterData(data: unknown[]): void;
  setLeftAxisOption(options: unknown): void;
  setLeftAxisData(data: unknown[]): void;
  setBottomAxisOption(options: unknown): void;
  setRightAxisOption(options: unknown): void;
  setRightAxisData(data: unknown[]): void;
  setTopAxisOption(options: unknown): void;
  setLeftAxisLabels(labels: unknown[]): void;
  setRightAxisLabels(labels: unknown[]): void;
  setTopAxisLabels(labels: unknown[]): void;
  setBottomAxisLabels(labels: unknown[]): void;
  setLeftAxisRange(range: [number, number]): void;
  setRightAxisRange(range: [number, number]): void;
  setTopAxisRange(range: [number, number]): void;
  setBottomAxisRange(range: [number, number]): void;
  refresh(): void;
}

export declare class LvgljsMaskComponent extends LvgljsChildContainerComponent {}

export declare class LvgljsWindowComponent extends LvgljsChildContainerComponent {}

export declare class Registry {
  static Arc: LvgljsComponentCtor<LvgljsArcComponent>;
  static Button: LvgljsComponentCtor<LvgljsButtonComponent>;
  static View: LvgljsComponentCtor<LvgljsViewComponent>;
  static Text: LvgljsComponentCtor<LvgljsTextComponent>;
  static Image: LvgljsComponentCtor<LvgljsImageComponent>;
  static Switch: LvgljsComponentCtor<LvgljsSwitchComponent>;
  static Checkbox: LvgljsComponentCtor<LvgljsCheckboxComponent>;
  static Textarea: LvgljsComponentCtor<LvgljsTextareaComponent>;
  static Keyboard: LvgljsComponentCtor<LvgljsKeyboardComponent>;
  static Dropdownlist: LvgljsComponentCtor<LvgljsDropdownlistComponent>;
  static ProgressBar: LvgljsComponentCtor<LvgljsProgressBarComponent>;
  static Roller: LvgljsComponentCtor<LvgljsRollerComponent>;
  static Slider: LvgljsComponentCtor<LvgljsSliderComponent>;
  static Line: LvgljsComponentCtor<LvgljsLineComponent>;
  static Calendar: LvgljsComponentCtor<LvgljsCalendarComponent>;
  static GIF: LvgljsComponentCtor<LvgljsGIFComponent>;
  static TabView: LvgljsComponentCtor<LvgljsTabViewComponent>;
  static Chart: LvgljsComponentCtor<LvgljsChartComponent>;
  static Mask: LvgljsComponentCtor<LvgljsMaskComponent>;
  static List: LvgljsComponentCtor<LvgljsListComponent>;
  static Window: LvgljsComponentCtor<LvgljsWindowComponent>;
}

export interface LvgljsBridge {
  NativeRender: {
    NativeComponents: typeof Registry;
    lv_conf: Record<string, number>;
  };
}

// TypeScript cannot type globalThis[Symbol.for(...)] bracket access (microsoft/TypeScript#35909).
export function GetBridge(): LvgljsBridge {
  return (globalThis as any)[Symbol.for("lvgljs")] as LvgljsBridge;
}
