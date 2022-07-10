#pragma once

extern "C" {
    #include "jsapi.h"
};

#include "native/components/component.hpp"

void NativeRenderInit (JSContext* ctx);