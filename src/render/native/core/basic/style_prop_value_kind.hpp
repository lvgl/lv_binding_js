#pragma once

#include <lvgl.h>
#include <stdint.h>

enum StylePropValueKind {
  StylePropValueKindNum = 0,
  StylePropValueKindColor = 1,
  StylePropValueKindPtr = 2,
  StylePropValueKindCSS = 3,
};

#define STYLE_PROP_VALUE_KIND_SHIFT 30
#define STYLE_PROP_VALUE_KIND_MASK (0x3 << STYLE_PROP_VALUE_KIND_SHIFT)

static inline lv_style_prop_t StylePropKeyUnpackId(uint32_t propId) {
  return static_cast<lv_style_prop_t>(propId & ~STYLE_PROP_VALUE_KIND_MASK);
}

static inline StylePropValueKind StylePropKeyUnpackKind(uint32_t propId) {
  return static_cast<StylePropValueKind>(
      (propId & STYLE_PROP_VALUE_KIND_MASK) >> STYLE_PROP_VALUE_KIND_SHIFT);
}
