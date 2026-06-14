import path from "tjs:path";

export function loadLocalAsset(
  src: string,
  label: string,
  onSuccess: (buffer: ArrayBuffer) => void,
): void {
  const resolvedPath = path.isAbsolute(src)
    ? src
    : path.resolve(import.meta.dirname, src);
  tjs.readFile(resolvedPath, { encoding: "binary" })
    .then((data) =>
      onSuccess(data instanceof ArrayBuffer ? data : (data.buffer as ArrayBuffer)),
    )
    .catch((e) => {
      const detail =
        e?.code === "ENOENT"
          ? `file not found: ${resolvedPath}`
          : e?.message ?? String(e);
      console.error(`${label} (${src}): ${detail}`);
    });
}

export function fetchAssetBinary(
  url: string,
  init?: RequestInit,
): Promise<ArrayBuffer> {
  const options = init ?? {
    headers: { "Content-Type": "application/octet-stream" },
  };
  return fetch(url, options).then((resp) => resp.arrayBuffer());
}
