import { StyleProps } from "./index";
import { isValidUrl, fetchBinary } from "../../utils/helpers";
import { BUILT_IN_SYMBOL } from "./symbol";

export function PostProcessStyle({ comp, styleSheet, styleType }: { comp: any; styleSheet: StyleProps; styleType: any }) {
  if (styleSheet["background-image"] !== void 0) {
    let url = styleSheet["background-image"];

    if (BUILT_IN_SYMBOL[url]) {
      comp.setBackgroundImage(null, styleType, BUILT_IN_SYMBOL[url]);
      return;
    }

    if (url === null) {
      comp.setBackgroundImage(null, styleType);
    } else if (!isValidUrl(url)) {
      if (!path.isAbsolute(url)) {
        url = path.resolve(__dirname, url);
      }
      fs.readFile(url, { encoding: "binary" })
        .then((data) => {
          comp.setBackgroundImage(data.buffer, styleType);
        })
        .catch((e) => {
          console.log("setBackground error", e);
        });
    } else {
      fetchBinary(url)
        .then((buffer) => comp.setBackgroundImage(buffer, styleType))
        .catch(console.warn);
    }
  }

  if (styleSheet["arc-image"] !== void 0) {
    let url = styleSheet["arc-image"];

    if (BUILT_IN_SYMBOL[url]) {
      comp.setArcImage(null, styleType, BUILT_IN_SYMBOL[url]);
      return;
    }

    if (url === null) {
      comp.setArcImage(null, styleType);
    } else if (!isValidUrl(url)) {
      if (!path.isAbsolute(url)) {
        url = path.resolve(__dirname, url);
      }
      fs.readFile(url, { encoding: "binary" })
        .then((data) => {
          comp.setArcImage(data.buffer, styleType);
        })
        .catch((e) => {
          console.log("setArcImage error", e);
        });
    } else {
      fetchBinary(url)
        .then((buffer) => comp.setArcImage(buffer, styleType))
        .catch(console.warn);
    }
  }
}
