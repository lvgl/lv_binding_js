#pragma once

extern "C" {
    #include "lvgl.h"

    #include "private.h"
};

#include <unordered_map>
#include <string>

#include "native/core/style/font/font.hpp"
#include "native/core/basic/comp.hpp"

using CompSetStyle = void (lv_obj_t*, lv_style_t*, JSContext*, JSValue);

class StyleManager {
  public:
    static std::unordered_map<std::string, CompSetStyle*> styles;
};

void CompSetTransition (
  lv_style_t* style, 
  lv_style_transition_dsc_t* trans, 
  lv_style_prop_t props[],
  std::string func_str,
  int32_t time, 
  int32_t delay
);

void CompSetAnimation (
    lv_obj_t* comp,
    void* opaque,
    lv_anim_t* animate,
    JSContext* ctx,
    JSValue obj
);