const flexFlowObj = {
  row_nowrap: 0x00,
  column_nowrap: 1 << 0,
  row_wrap: 0x00 | (1 << 2),
  column_wrap: (1 << 0) | (1 << 2),
  "row_wrap-reverse": 0x00 | (1 << 2) | (1 << 3),
  "column_wrap-reverse": (1 << 0) | (1 << 2) | (1 << 3),
  row_reverse: 0x00 | (1 << 3),
  column_reverse: 0x00 | (1 << 3),
};

const flexAlignObj = {
  "flex-start": 0,
  "flex-end": 1,
  center: 2,
  "space-evenly": 3,
  "space-around": 4,
  "space-between": 5,
};

export function FlexStyle(style, result) {
  if (style.display !== "flex") return result;

  let flexFlow = 0x00;
  const flexDirection = style["flex-direction"] || "row";
  const flexWrap = style["flex-wrap"] || "nowrap";

  if (flexFlowObj[`${flexDirection}_${flexWrap}`]) {
    flexFlow = flexFlowObj[`${flexDirection}_${flexWrap}`];
  }
  result["flex-flow"] = flexFlow;

  let mainPlace = 0;
  let crossPlace = 0;
  let trackCrossPlace = 0;
  const justifyContent = style["justify-content"];
  const alignItems = style["align-items"];
  const alignContent =
    style["align-content"] ||
    (flexWrap === "nowrap" ? alignItems : "flex-start");

  if (flexAlignObj[justifyContent]) {
    mainPlace = flexAlignObj[justifyContent];
  }
  if (flexAlignObj[alignItems]) {
    crossPlace = flexAlignObj[alignItems];
  }
  trackCrossPlace = alignContent ? flexAlignObj[alignContent] : crossPlace;
  // result['flex-align'] = [mainPlace, crossPlace, trackCrossPlace]

  if (justifyContent) {
    result["justify-content"] = mainPlace;
  }
  if (alignItems) {
    result["align-items"] = crossPlace;
  }
  if (alignContent) {
    result["align-content"] = trackCrossPlace;
  }
  if (!isNaN(style["flex-grow"])) {
    result["flex-grow"] = style["flex-grow"];
  }
  return result;
}
