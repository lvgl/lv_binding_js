# JS Bundle Build Guide
There are two ways to build JS bundle, please choose what you like

## 1
If you prefer to write your JS Code in a separate project,
you will have to add the lvgljs-ui package, located at [src/render/react](../../src/render/react).

You can run the following code to the install npm package,
and can then use your own bundle tool like webpack to build the bundle.

```bash
npm install lvgljs-ui
```

> [!WARNING]
> The lvgljs-ui package [on npm](https://www.npmjs.com/package/lvgljs-ui) is currently out-of-date.\
> The recommended approach is to use [relative-deps](https://www.npmjs.com/package/relative-deps) to use a local version from this git repository.

## 2
If you prefer write JS Code in lvgljs dir, the file ./build.js will help you make js bundle, after edit the entry and outfile, run the following script in lvgljs dir, it will use esbuild to build bundle, and you dont need to install npm package lvgljs-ui 
```bash
npm run bundle
```
