/// <reference lib="esnext.disposable" />
/// <reference types="@txikijs/types" />

declare global {
  interface ImportMeta {
    dirname: string;
    filename: string;
  }

  interface ObjectConstructor {
    keys<T extends object>(o: T): readonly (keyof T)[];
  }

  namespace tjs {
    /* This is a compatibility layer for the txiki.js API for the old version of txiki.js. */
    function readFile(
      path: string,
      options?: { encoding?: "binary" | "utf8" },
    ): Promise<ArrayBuffer | { buffer: ArrayBufferLike }>;
  }
}

export {};
