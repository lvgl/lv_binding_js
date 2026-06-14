#pragma once


#include "lv_bindings_js.h"
#include "native/core/style/font/font.hpp"

typedef struct {
    lv_color_t color_primary;
    lv_color_t color_secondary;
    const lv_font_t* font_normal;
} theme_saved_t;

static theme_saved_t theme_default;

static bool theme_default_init = false;

void NativeThemeInit (JSContext* ctx, JSValue& ns);