#pragma once

extern "C" {
    #include "lvgl.h"
    #include "quickjs-libc.h"
    #include "sjs.h"
};

#include "native/core/style/font/font.hpp"

static lv_theme_t theme_default;

static bool theme_default_init = false;

void NativeThemeInit (JSContext* ctx, JSValue& ns);