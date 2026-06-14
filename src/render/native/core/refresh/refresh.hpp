#pragma once

#include <algorithm>
#include <utility>
#include <vector>

#include "lv_bindings_js.h"

void NativeRenderUtilInit (JSContext* ctx, JSValue& ns);

#include "native/components/window/window.hpp"