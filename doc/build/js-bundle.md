# JS Bundle Build Guide

lvgljs has two JavaScript build layers:

1. **`lvgljs-ui`** - the React/TypeScript UI framework in [`src/render/react`](../../src/render/react)
2. **App bundles** - demo and test entry points under `demo/` and `test/`, produced by [`build.js`](../../build.js)

`esbuild` bundles each `index.jsx` / `index.tsx` into a sibling `index.js`. Those bundles import `lvgljs-ui` from `node_modules/lvgljs-ui`, which is linked to the local package:

```json
"lvgljs-ui": "file:src/render/react"
```

Because of that link, changes under `src/render/react` are **not** picked up by `yarn bundle` alone. You must refresh `node_modules/lvgljs-ui` first.

## Quick reference

| What you changed | Command |
| --- | --- |
| TypeScript under `src/render/react/` | `yarn build` |
| JSX/TSX under `demo/` or `test/` only | `yarn bundle` |
| Both | `yarn build` |

### Full build (`yarn build`)

Runs the complete pipeline defined in [`package.json`](../../package.json):

```bash
yarn build
```

Equivalent steps:

```bash
yarn run rimraf node_modules/lvgljs-ui   # drop stale copy
yarn run react-bundle                    # compile src/render/react (esbuild index.ts -> index.js)
yarn install --check-files               # re-link file:src/render/react into node_modules
yarn run bundle                          # bundle demo/ and test/ entry points
```

Use this after editing any file in `src/render/react/` (components, style pipes, reconciler, etc.).

### Bundle only (`yarn bundle`)

```bash
yarn bundle
```

Runs `node ./build.js`, which bundles every `demo/*/*.{jsx,tsx}` and `test/**/*.{jsx,tsx}` into `index.js` next to each source file.

This is enough when you only change app code in `demo/` or `test/` and `lvgljs-ui` itself is unchanged.

### Watch mode

```bash
yarn bundle:watch
```

Rebuilds app bundles when `demo/**/*.jsx` or `test/**/*.jsx` changes. It does **not** watch `src/render/react`; run `yarn build` manually after framework edits.

## External project

If you write application code in a separate repository, add the `lvgljs-ui` package from [`src/render/react`](../../src/render/react) and bundle with your own tool (webpack, esbuild, etc.).

```bash
npm install lvgljs-ui
```

> [!WARNING]
> The `lvgljs-ui` package [on npm](https://www.npmjs.com/package/lvgljs-ui) is currently out-of-date.\
> The recommended approach is to use [relative-deps](https://www.npmjs.com/package/relative-deps) to depend on a local copy from this git repository.

After installing a local or npm copy, compile `lvgljs-ui` before bundling your app:

```bash
cd src/render/react && yarn build
```

## In-repo workflow

For code living in this repository (`demo/`, `test/`):

1. Edit `index.jsx` / `index.tsx` (or add a new entry under `demo/` or `test/`).
2. Run `yarn bundle` (or `yarn build` if you also changed `src/render/react`).
3. Run the simulator, e.g. `build/x64-pc-windows-msvc/lvgljs.exe run demo/widgets/index.js` on Windows, or `build/lvgljs run demo/widgets/index.js` on Linux/macOS.

`build.js` discovers entries by glob; new files matching `demo/*/*.{jsx,tsx}` or `test/**/*.{jsx,tsx}` are included automatically - no manual entry list.
