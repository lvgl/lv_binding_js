# JS Bundle Build Guide

There are two ways to build JS bundle, please choose what you like

## 1
If you prefer write JS Code in your own dir, run the following code the install npm package lvgljs-ui, you can use your own bundle tool like webpack to build the bundle
```bash
npm i lvgljs-ui
```

## 2
If you prefer write JS Code in lvgljs dir, the file ./build.js will help you make js bundle, after edit the entry and outfile, run the following script in lvgljs dir, it will use esbuild to build bundle, and you dont need to install npm package lvgljs-ui 
```bash
npm run bundle
```


