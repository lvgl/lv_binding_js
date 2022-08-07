#pragma once

extern "C" {
    #include "jsapi.h"
};

#include "render/native/core/img/png/png.hpp"
#include "deps/lvgl/lvgl.h"

#include "native/components/component.hpp"
#include "native/core/animate/animate.hpp"

void NativeRenderInit (JSContext* ctx);

void NativeEventWrapInit (JSContext* ctx);