# Target Build Guide
This guide gives an overview on how to build lvgljs for an embedded Linux target.

This is not too different from building for a regular Linux target,
besides that you will probably need to cross-compile and won't want to use the sdl2 simulator.

When building for a target device, the [*device HAL*](../../src/engine/hal/device) is selected.\
By default, it will use a screen size of 1024x600 together with the framebuffer device.

You can configure the device properties when building lvgljs as a static library or executable.
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

## Configuration Options

When integrating lvgljs into your project, you can configure the following options:

### Build as Static Library

To build lvgljs as a static library instead of an executable:

```cmake
set(BUILD_STATIC_LIB ON CACHE BOOL "Build lvgljs as static library")
```

### Display Resolution

Configure the display resolution for your target device:

```cmake
set(DISP_HOR_RES 480 CACHE STRING "Display horizontal resolution")
set(DISP_VER_RES 480 CACHE STRING "Display vertical resolution")
```

### Configuration Directory

Specify a custom directory for LVGL configuration files:

```cmake
set(LVGLJS_CONF_DIR ${CMAKE_CURRENT_SOURCE_DIR}/config CACHE INTERNAL "LVGLJS_CONF_DIR")
```

This will set `LV_CONF_PATH` to `${LVGLJS_CONF_DIR}/lv_conf.h`.

### Example: External Project Integration

In your project's `CMakeLists.txt`, you can configure lvgljs like this:

```cmake
set(BUILD_STATIC_LIB ON CACHE BOOL "Build lvgljs as static library")
set(DISP_HOR_RES 480 CACHE STRING "Display horizontal resolution")
set(DISP_VER_RES 480 CACHE STRING "Display vertical resolution")
set(LVGLJS_CONF_DIR ${CMAKE_CURRENT_SOURCE_DIR}/config CACHE INTERNAL "LVGLJS_CONF_DIR")

add_subdirectory(lv_binding_js)

add_executable(my_app main.cpp)
target_link_libraries(my_app lvgljs)
```

Or via command line:

```sh
cmake -B build \
  -DUSE_EXTERNAL_FFI=ON \
  -DBUILD_STATIC_LIB=ON \
  -DDISP_HOR_RES=480 \
  -DDISP_VER_RES=480 \
  -DLVGLJS_CONF_DIR=${CMAKE_CURRENT_SOURCE_DIR}/config
cmake --build build
```

You can then copy `build/lvgljs` to your target device together with one of the demo's
like `demo/widgets` and try to run it there:

```sh
./lvgljs run demo/widgets/index.js
```
