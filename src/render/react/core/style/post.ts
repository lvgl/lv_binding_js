import { StyleProps } from "./index";
import { fetchAssetBinary, loadLocalAsset } from "../../utils/assets";
import { isValidUrl } from "../../utils/helpers";
import { BUILT_IN_SYMBOL } from "./symbol";

/**
 * Resolves an image style value (null, builtin symbol name, local asset path
 * or remote url) and forwards it to the component setter. Keeps the setter's
 * argument count intact: `symbol` is only passed for builtin symbols.
 */
function applyImageSource(
  url: unknown,
  errorContext: string,
  setImage: (buffer: ArrayBuffer | null, symbol?: string) => void,
) {
  if (url === undefined) return;
  if (url === null) {
    setImage(null);
    return;
  }
  if (typeof url !== "string") return;

  if (url in BUILT_IN_SYMBOL) {
    setImage(null, BUILT_IN_SYMBOL[url as keyof typeof BUILT_IN_SYMBOL]);
    return;
  }
  if (!isValidUrl(url)) {
    loadLocalAsset(url, errorContext, (buffer) => setImage(buffer));
    return;
  }
  fetchAssetBinary(url, {})
    .then((buffer) => setImage(buffer))
    .catch(console.warn);
}

export function PostProcessStyle({
  comp,
  styleSheet,
  styleType,
}: {
  comp: any;
  styleSheet: StyleProps;
  styleType: number;
}) {
  const sheets = Array.isArray(styleSheet) ? styleSheet : [styleSheet];
  const merged = Object.assign({}, ...sheets) as Record<string, unknown>;

  applyImageSource(
    merged["background-image"],
    "setBackground error",
    (buffer, symbol) =>
      symbol === undefined
        ? comp.setBackgroundImage(buffer, styleType)
        : comp.setBackgroundImage(buffer, styleType, symbol),
  );

  applyImageSource(
    merged["arc-image"],
    "setArcImage error",
    (buffer, symbol) =>
      symbol === undefined
        ? comp.setArcImage(buffer, styleType)
        : comp.setArcImage(buffer, styleType, symbol),
  );
}
