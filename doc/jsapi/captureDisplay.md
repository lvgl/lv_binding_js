# RenderUtil.captureDisplay

Save the current simulator display to a PNG file. Intended for GUI screenshot tests and debugging on the SDL simulator build.

## Availability

| Build | `captureDisplay` |
|-------|------------------|
| Simulator (`BUILD_LVGL_SIMULATOR=ON`, `-DIS_SIM`) | Available |
| Device / embedded (`IS_DEVICE`) | Always returns `false` |

The function is registered on `NativeRender.RenderUtil` during native render init (`NativeRenderUtilInit`). It is only implemented when the SDL (or monitor) display driver is enabled (`USE_SDL` or `USE_MONITOR` in `lv_drv_conf.h`).

## Signature

```js
boolean NativeRender.RenderUtil.captureDisplay(path: string)
```

- **path** - Output file path for the PNG (required). Relative paths are resolved by the host process working directory.
- **Returns** - `true` if the file was written successfully; `false` on failure (invalid path, no display, framebuffer not ready, encode error, or non-simulator build).

Throws a `TypeError` if `path` is omitted.

## Behavior

1. Refreshes the default LVGL display (`lv_refr_now`).
2. Reads the mirrored framebuffer maintained by the simulator display flush hook.
3. Encodes RGBA pixels to a 32-bit PNG via lodepng and writes `path`.

Image size matches the simulator resolution (`SDL_HOR_RES` and `SDL_VER_RES`), not the SDL window zoom factor.

At least one full display flush must have completed before capture succeeds; call after the UI has been rendered (e.g. after `RenderUtil.refreshWindow()` or a normal frame tick).

## Usage

Direct access through the runtime bridge (same pattern as other `NativeRender` APIs):

```js
const { NativeRender } = bridge;
const ok = NativeRender.RenderUtil.captureDisplay('./screenshot.png');
if (!ok) {
    console.error('capture failed');
}
```

Example: capture after layout refresh in a test or script:

```js
NativeRender.RenderUtil.refreshWindow();
const ok = NativeRender.RenderUtil.captureDisplay(tjs.env.TEST_SCREENSHOT_PATH);
```

## Build

Configure and build the simulator target:

```bash
cmake -B build -DBUILD_LVGL_SIMULATOR=ON
cmake --build build --target lvgljs
```

Sources involved:

- `src/engine/hal/screenshot.cpp` - JS binding and `hal_capture_display_png`
- `src/engine/hal/framebuffer32_to_rgba.c` - 32-bit framebuffer to RGBA conversion
- `src/engine/hal/simulator/simulator.cpp` ? mirrors the display flush into the capture buffer

## Related APIs

- **`NativeRender.RenderUtil.refreshWindow`** - Marks layouts dirty and runs `lv_refr_now`; useful before capture when the tree changed programmatically.
- **C++** - `hal_capture_display_png(const char *path)` in `src/engine/hal/screenshot.hpp` for native callers in simulator builds.

## Limitations

- Simulator only; no framebuffer access on real hardware targets.
- PNG output only (no JPEG or in-memory buffer from JS).
- Captures the default display; multi-display setups are not supported.
- Does not crop to a widget; full display resolution only.
