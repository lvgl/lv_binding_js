#pragma once

#include "lv_bindings_js.h"

void CompSetTransition (
  lv_style_t* style,
  lv_style_transition_dsc_t* trans,
  lv_style_prop_t props[],
  int32_t func_idx,
  int32_t time,
  int32_t delay
);

/** Init CSS handler map. Call only after lvgljs_style_css_prop_init(). */
void NativeStyleInit(JSContext* ctx);

/** Apply nativeStyle.batch { keys: Uint32Array, values: [] } from nativeSetStyle */
void apply_style_props_batch(
    JSContext* ctx,
    lv_obj_t* instance,
    lv_style_t* style,
    JSValue batch,
    int32_t style_type);
