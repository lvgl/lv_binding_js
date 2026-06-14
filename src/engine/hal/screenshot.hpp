#pragma once

#include <lvgl.h>

/** Save the active screen to a PNG file via LVGL snapshot API. Requires LV_USE_SNAPSHOT. */
bool hal_capture_display_png(const char * path);
