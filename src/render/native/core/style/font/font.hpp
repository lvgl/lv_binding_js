#pragma once

#include <vector>

extern "C" {
    #include "lvgl.h"
    #include "quickjs-libc.h"
    #include "sjs.h"
};

void CompSetFontSize (lv_obj_t* comp, lv_style_t* style, JSContext* ctx, JSValue obj);

void CompSetFontSize1 (lv_obj_t* comp, lv_style_t* style, JSContext* ctx, JSValue obj);