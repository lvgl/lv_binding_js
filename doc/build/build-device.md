# Target Build Guide

This guide covers building lvgljs for an **embedded Linux target**.

> [!NOTE]
> **Windows is not supported** for device (embedded) builds. The device HAL targets Linux framebuffer and related display drivers. Use Linux (native or WSL) for cross-compiling to embedded targets. On Windows, use the [simulator build guide](./build-simulator.md) only.

This is not too different from building for a regular Linux target,
besides that you will probably need to cross-compile and won't want to use the SDL2 simulator.

When building for a target device, the [*device HAL*](../../src/engine/hal/device) is selected.\
Currently it is not possible to configure the properties of the device and
it will by default use a screen size of 1024x600 together with the framebuffer device.

You will most likely need to tweak the screen size for your device,
and can also opt to use a different LVGL display like DRM or
[wayland](https://github.com/lvgl/lv_drivers/blob/master/wayland/README.md).

The way you cross-compile applications for your target will depend on your use-case,
which is out-of-scope for this guide.

You will have to make sure that:
- your sysroot has all the necessary dependencies.\
Take a look at the [txiki readme](https://github.com/saghul/txiki.js#building) for a list of the dependencies
- you provide your own libffi library, since building it together with txiki doesn't work when cross-compiling at this moment.\
Do this by passing `-DUSE_EXTERNAL_FFI=ON` to cmake.

You can now cross-compile like normal.
For instance, if you're using Yocto, you source your SDK environment and then do

```sh
cmake -B build -DBUILD_LVGL_SIMULATOR=OFF -DUSE_EXTERNAL_FFI=ON
cmake --build build
```

You can then copy `build/lvgljs` to your target device together with one of the demo's
like `demo/widgets` and try to run it there:

```sh
./lvgljs run demo/widgets/index.js
```
