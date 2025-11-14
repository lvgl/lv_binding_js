export function throwUnsupported(instance) {
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

export async function fetchBinary(url: string): Promise<ArrayBuffer> {
  const resp = await fetch(url);
  
  if (!resp.ok) {
    throw new Error(`Failed to fetch ${url}: ${resp.status} ${resp.statusText}`);
  }
  
  const blob = await resp.blob();
  return await blob.arrayBuffer();
}
