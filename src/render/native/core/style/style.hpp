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

enum class StyleValueType : uint8_t {
    NUM,
    COLOR,
    PCT,
};

struct StylePropConfig {
    lv_style_prop_t prop;
    StyleValueType type;
};

enum class StyleEntryType : uint8_t {
    SIMPLE,
    COMPLEX,
};

union StyleEntry {
    StylePropConfig simple;
    CompSetStyle* complex;
    
    StyleEntry() {}
    StyleEntry(const StylePropConfig& s) : simple(s) {}
    StyleEntry(CompSetStyle* c) : complex(c) {}
};

struct StyleEntryWrapper {
    StyleEntryType type;
    StyleEntry entry;
    
    StyleEntryWrapper(const StylePropConfig& config) : type(StyleEntryType::SIMPLE), entry(config) {}
    StyleEntryWrapper(CompSetStyle* func) : type(StyleEntryType::COMPLEX), entry(func) {}
};

class StyleManager {
  public:
    static std::unordered_map<std::string, StyleEntryWrapper> styles;
};

void ApplySimpleStyle(lv_obj_t* comp, lv_style_t* style, JSContext* ctx, JSValue obj, const StylePropConfig& config);

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