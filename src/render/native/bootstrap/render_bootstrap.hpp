#pragma once

extern "C" {
    #include "sjs.h"
};

#include "render/native/core/img/png/png.hpp"
#include "deps/lvgl/lvgl.h"

#include "native/components/component.hpp"
#include "native/core/animate/animate.hpp"
#include "native/core/dimensions/dimensions.hpp"

void NativeRenderInit (JSContext* ctx);

void NativeEventWrapInit (JSContext* ctx);