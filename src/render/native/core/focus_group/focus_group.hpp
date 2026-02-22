#pragma once

extern "C" {
    #include "lvgl.h"
    #include "private.h"
    #include "utils.h"
};

void NativeFocusGroupInit(JSContext* ctx, JSValue& ns);
