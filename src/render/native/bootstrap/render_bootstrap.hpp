#pragma once

extern "C" {
    #include "jsapi.h"
    #include "lv_png/lv_png.h"
};

#include "native/components/component.hpp"

void NativeRenderInit (JSContext* ctx);

void NativeEventWrapInit (JSContext* ctx);