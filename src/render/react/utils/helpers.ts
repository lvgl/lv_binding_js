export function throwUnsupported(instance: { constructor: { name: string } }) {
  throw new Error(
    `Unsupported operation performed in ${instance.constructor.name}`,
  );
}

export function isValidUrl(str: string) {
  if (!str) return false;
  try {
    const url = new URL(str);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch (_) {
    return false;
  }
}
