#pragma once

#include <algorithm>
#include <utility>
#include <vector>

extern "C" {
    #include "lvgl.h"
    #include "quickjs-libc.h"
    #include "sjs.h"
};

void NativeRenderUtilInit (JSContext* ctx, JSValue& ns);

#include "native/components/window/window.hpp"