#pragma once

extern "C" {
    #include "lvgl.h"

    #include "private.h"
};

#include "native/core/style/font/font.hpp"

void NativeThemeInit (JSContext* ctx, JSValue& ns);