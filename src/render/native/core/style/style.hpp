#pragma once

extern "C" {
    #include "lvgl.h"
    #include "quickjs-libc.h"
    #include "sjs.h"
};

#include <unordered_map>
#include <string>

#include "native/core/style/font/font.hpp"

using CompSetStyle = void (lv_obj_t*, lv_style_t*, JSContext*, JSValue);

class StyleManager {
  public:
    static std::unordered_map<std::string, CompSetStyle*> styles;
};