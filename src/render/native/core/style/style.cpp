#include "style.hpp"
#include "lv_bindings_js.h"

#include "native/core/basic/style_prop_value_kind.hpp"
#include "native/core/lv_conf/lv_anim_path.h"
#include "native/core/lv_conf/lv_style_prop_extend.h"
#include "native/core/style/font/font.hpp"
#include "native/core/basic/comp.hpp"
#include "native/components/chart/chart.hpp"

#include <unordered_map>
#include <string>

using CompSetStyle = void (lv_obj_t*, lv_style_t*, JSContext*, JSValue);

static std::unordered_map<lv_style_prop_t, CompSetStyle*> g_native_style_prop_handlers;

JSValue JS_AcquireTypedArray(JSContext *ctx, JSValueConst val, void **parray_ptr, size_t *parray_length, size_t *pbytes_per_element) {
  size_t byte_offset = 0;
  size_t byte_length = 0;
  size_t buffer_size = 0;

  *parray_ptr = nullptr;
  *parray_length = 0;
  *pbytes_per_element = 0;

  // 1. Get the underlying ArrayBuffer, offset, and length
  JSValue array_buffer = JS_GetTypedArrayBuffer(ctx, val, &byte_offset, &byte_length,
                                                pbytes_per_element);

  if (JS_IsException(array_buffer)) {
    // Handle the error (val was not a TypedArray)
    return JS_UNDEFINED;
  }

  // 2. Get the raw pointer to the buffer's data
  uint8_t *buffer_ptr = JS_GetArrayBuffer(ctx, &buffer_size, array_buffer);

  if (buffer_ptr && *pbytes_per_element > 0) {
    // 3. Offset the pointer to match the Uint32Array's start
    *parray_ptr = (void*)(buffer_ptr + byte_offset);
    *parray_length = byte_length / *pbytes_per_element;
  } else {
    JS_FreeValue(ctx, array_buffer);
    return JS_UNDEFINED;
  }
  return array_buffer;
}

void JS_ReleaseTypedArray(JSContext *ctx, const JSValue &array_buffer) {
    // 4. Free the ArrayBuffer JSValue
    JS_FreeValue(ctx, array_buffer);
}

static void apply_style_props_single_value(JSContext *ctx, lv_obj_t *instance,
                                    lv_style_t *style, uint32_t key,
                                    JSValue value, int32_t style_type) {
    const auto prop = StylePropKeyUnpackId(key);
    const auto kind = StylePropKeyUnpackKind(key);
    switch (kind) {
        case StylePropValueKindNum: {
            lv_style_value_t lv_v{};
            int32_t num = 0;
            JS_ToInt32(ctx, &num, value);
            lv_v.num = num;
            lv_style_set_prop(style, prop, lv_v);
            break;
        }
        case StylePropValueKindColor: {
            lv_style_value_t lv_v{};
            int32_t num = 0;
            JS_ToInt32(ctx, &num, value);
            lv_v.color = lv_color_hex(static_cast<uint32_t>(num));
            lv_style_set_prop(style, prop, lv_v);
            break;
        }
        case StylePropValueKindPtr:
        case StylePropValueKindCSS: {
            const auto it = g_native_style_prop_handlers.find(prop);
            if (it == g_native_style_prop_handlers.end() || it->second == nullptr) {
                LV_LOG_USER("style batch: no CSS/PTR handler for prop %d, kind:%d, skip", prop, kind);
            } else {
                it->second(instance, style, ctx, value);
            }
            break;
        }
    }
}

void apply_style_props_batch(
    JSContext* ctx,
    lv_obj_t* instance,
    lv_style_t* style,
    JSValue batch,
    int32_t style_type
) {
    if (!JS_IsObject(batch)) {
        return;
    }

    JSValue keys = JS_GetPropertyStr(ctx, batch, "keys");
    JSValue values = JS_GetPropertyStr(ctx, batch, "values");
    if (!JS_IsArray(values)) {
        LV_LOG_USER("style batch: values is not an array, skip");
        JS_FreeValue(ctx, values);
        JS_FreeValue(ctx, keys);
        return;
    }

    int32_t values_len = 0;
    JSValue values_len_v = JS_GetPropertyStr(ctx, values, "length");
    JS_ToInt32(ctx, &values_len, values_len_v);
    JS_FreeValue(ctx, values_len_v);

    size_t array_size = 0;
    size_t array_bytes_per_element = 0;
    uint32_t* keys_uint32 = nullptr;
    JSValue keys_array_buffer = JS_AcquireTypedArray(
        ctx, keys, (void**)&keys_uint32, &array_size, &array_bytes_per_element);

    if (!JS_IsUndefined(keys_array_buffer) && keys_uint32 != nullptr
        && array_bytes_per_element == 4 && values_len > 0) {
        size_t count = array_size;
        if (static_cast<int32_t>(array_size) > values_len) {
            count = static_cast<size_t>(values_len);
        }
        for (size_t i = 0; i < count; i++) {
            JSValue value = JS_GetPropertyUint32(ctx, values, static_cast<uint32_t>(i));
            apply_style_props_single_value(
                ctx, instance, style, keys_uint32[i], value, style_type);
            JS_FreeValue(ctx, value);
        }
    } else {
        LV_LOG_USER("style batch: keys is not a Uint32Array or values empty, skip");
    }

    if (!JS_IsUndefined(keys_array_buffer)) {
        JS_ReleaseTypedArray(ctx, keys_array_buffer);
    }
    JS_FreeValue(ctx, values);
    JS_FreeValue(ctx, keys);
}

static void CompSetDisplay (lv_obj_t* comp, lv_style_t* style, JSContext* ctx, JSValue obj) {
    size_t len;
    const char* str = JS_ToCStringLen(ctx, &len, obj);
    std::string value = str;
    value.resize(len);

    lv_obj_clear_flag(comp, LV_OBJ_FLAG_HIDDEN);

    if (value == "flex") {
        lv_obj_set_layout(comp, LV_LAYOUT_FLEX);
    } else if (value == "grid") {
        lv_obj_set_layout(comp, LV_LAYOUT_GRID);
    } else if (value == "none") {
        lv_obj_add_flag(comp, LV_OBJ_FLAG_HIDDEN);
    }
    JS_FreeCString(ctx, str);
};

static void CompSetFlexAlign (lv_obj_t* comp, lv_style_t* style, JSContext* ctx, JSValue obj) {
    JSValue value1 = JS_GetPropertyUint32(ctx, obj, 0);
    JSValue value2 = JS_GetPropertyUint32(ctx, obj, 1);
    JSValue value3  = JS_GetPropertyUint32(ctx, obj, 2);

    int main_place;
    int cross_place;
    int track_cross_place;

    JS_ToInt32(ctx, &main_place, value1);
    JS_ToInt32(ctx, &cross_place, value2);
    JS_ToInt32(ctx, &track_cross_place, value3);
    lv_obj_set_flex_align(
        comp,
        static_cast<lv_flex_align_t>(main_place),
        static_cast<lv_flex_align_t>(cross_place),
        static_cast<lv_flex_align_t>(track_cross_place)
    );
};

static void CompSetTextOverFLow (lv_obj_t* comp, lv_style_t* style, JSContext* ctx, JSValue obj) {
    int x;
    JS_ToInt32(ctx, &x, obj);

    lv_label_set_long_mode(comp, static_cast<lv_label_long_mode_t>(x));
};

static void CompSetOverFlowScrolling (lv_obj_t* comp, lv_style_t* style, JSContext* ctx, JSValue obj) {
    int x;
    JS_ToInt32(ctx, &x, obj);

    if (x) {
        lv_obj_add_flag(comp, LV_OBJ_FLAG_SCROLL_MOMENTUM);
    } else {
        lv_obj_clear_flag(comp, LV_OBJ_FLAG_SCROLL_MOMENTUM);
    }
};

static void CompSetOverflow (lv_obj_t* comp, lv_style_t* style, JSContext* ctx, JSValue obj) {
    int x;
    JS_ToInt32(ctx, &x, obj);

    if (x) {
        lv_obj_clear_flag(comp, LV_OBJ_FLAG_SCROLLABLE);
    } else {
        lv_obj_add_flag(comp, LV_OBJ_FLAG_SCROLLABLE);
    }
};

static void CompSetScrollSnapX (lv_obj_t* comp, lv_style_t* style, JSContext* ctx, JSValue obj) {
    int x;
    JS_ToInt32(ctx, &x, obj);

    lv_obj_set_scroll_snap_x(comp, static_cast<lv_scroll_snap_t>(x));
};

static void CompSetScrollSnapY (lv_obj_t* comp, lv_style_t* style, JSContext* ctx, JSValue obj) {
    int x;
    JS_ToInt32(ctx, &x, obj);

    lv_obj_set_scroll_snap_y(comp, static_cast<lv_scroll_snap_t>(x));
};

static void CompScrollEnableSnap (lv_obj_t* comp, lv_style_t* style, JSContext* ctx, JSValue obj) {
    int x;
    JS_ToInt32(ctx, &x, obj);

    if (!x) {
        lv_obj_clear_flag(comp, LV_OBJ_FLAG_SNAPPABLE);
    } else {
        lv_obj_add_flag(comp, LV_OBJ_FLAG_SNAPPABLE);
    }
};

static void CompSetImgScaleX (lv_obj_t* comp, lv_style_t* style, JSContext* ctx, JSValue obj) {
    int x;
    JS_ToInt32(ctx, &x, obj);

    lv_image_set_scale_x(comp, x);
};

static void CompSetImgScaleY (lv_obj_t* comp, lv_style_t* style, JSContext* ctx, JSValue obj) {
    int x;
    JS_ToInt32(ctx, &x, obj);

    lv_image_set_scale_y(comp, x);
};

static void CompSetImgRotate (lv_obj_t* comp, lv_style_t* style, JSContext* ctx, JSValue obj) {
    int x;
    JS_ToInt32(ctx, &x, obj);

    lv_img_set_angle(comp, x);
};

static void CompSetTransformOrigin (lv_obj_t* comp, lv_style_t* style, JSContext* ctx, JSValue obj) {
    int x = 0;
    int y = 0;
    JSValue x_value;
    JSValue y_value;
    x_value = JS_GetPropertyUint32(ctx, obj, 0);
    y_value = JS_GetPropertyUint32(ctx, obj, 1);

    if (JS_IsNumber(x_value)) {
        JS_ToInt32(ctx, &x, x_value);
    }
    if (JS_IsNumber(y_value)) {
        JS_ToInt32(ctx, &y, y_value);
    }
    JS_FreeValue(ctx, x_value);
    JS_FreeValue(ctx, y_value);

    lv_img_set_pivot(comp, x, y);
};

/* lv_chart_set_zoom_x/y() were removed in LVGL 9; the Chart component
 * emulates them with a scrollable viewport (value is still 256-based) */
static void CompSetChartScaleX (lv_obj_t* comp, lv_style_t* style, JSContext* ctx, JSValue obj) {
    int x;
    JS_ToInt32(ctx, &x, obj);

    Chart* chart = static_cast<Chart*>(lv_obj_get_user_data(comp));
    if (chart != nullptr) {
        chart->setZoomX(x);
    }
};

static void CompSetChartScaleY (lv_obj_t* comp, lv_style_t* style, JSContext* ctx, JSValue obj) {
    int x;
    JS_ToInt32(ctx, &x, obj);

    Chart* chart = static_cast<Chart*>(lv_obj_get_user_data(comp));
    if (chart != nullptr) {
        chart->setZoomY(x);
    }
};

void CompSetTransition (
    lv_style_t* style,
    lv_style_transition_dsc_t* trans,
    lv_style_prop_t props[],
    int32_t func_idx,
    int32_t time,
    int32_t delay
) {
    lv_anim_path_cb_t func = lv_anim_path_funcs[0];
    if (func_idx >= 0 && static_cast<size_t>(func_idx) < LV_ANIM_PATH_COUNT) {
        func = lv_anim_path_funcs[func_idx];
    }
    lv_style_transition_dsc_init(trans, props, func, time, delay, NULL);
    lv_style_set_transition(style, trans);
};

static void CompSetPosition (lv_obj_t* comp, lv_style_t* style, JSContext* ctx, JSValue obj) {
    size_t len;
    const char* str = JS_ToCStringLen(ctx, &len, obj);
    std::string value = str;
    value.resize(len);

    lv_obj_clear_flag(comp, LV_OBJ_FLAG_FLOATING);
    BasicComponent* instance = static_cast<BasicComponent*>(lv_obj_get_user_data(comp));
    instance->is_fixed = false;
    if (instance->parent_instance != nullptr) {
        lv_obj_set_parent(comp, instance->parent_instance);
    }

    if (value == "absolute") {
        lv_obj_add_flag(comp, LV_OBJ_FLAG_FLOATING);
    } else if (value == "fixed") {
        instance->is_fixed = true;
        lv_obj_set_parent(comp, lv_screen_active());
    }

    JS_FreeCString(ctx, str);
};

static void CompGridColumnRow (lv_obj_t* comp, lv_style_t* style, JSContext* ctx, JSValue obj) {
    if (JS_IsArray(obj)) {
        BasicComponent* instance = static_cast<BasicComponent*>(lv_obj_get_user_data(comp));
        const lv_coord_t* old_ptr1 = instance->grid_column_desc;
        const lv_coord_t* old_ptr2 = instance->grid_row_desc;

        JSValue column_value = JS_GetPropertyUint32(ctx, obj, 0);
        JSValue row_value = JS_GetPropertyUint32(ctx, obj, 1);

        int len;
        JSValue num_value;
        int num;

        JSValue column_len_value = JS_GetPropertyStr(ctx, column_value, "length");
        JS_ToInt32(ctx, &len, column_len_value);
        lv_coord_t* column_ptr = static_cast<lv_coord_t*>(malloc((len + 1) * sizeof(lv_coord_t)));
        for(int i=0; i < len; i++) {
            num_value = JS_GetPropertyUint32(ctx, column_value, i);
            JS_ToInt32(ctx, &num, num_value);
            column_ptr[i] = num;
            JS_FreeValue(ctx, num_value);
        }
        column_ptr[len] = LV_GRID_TEMPLATE_LAST;
        instance->grid_column_desc = column_ptr;
        JS_FreeValue(ctx, column_len_value);

        JSValue row_len_value = JS_GetPropertyStr(ctx, row_value, "length");
        JS_ToInt32(ctx, &len, row_len_value);
        lv_coord_t* row_ptr = static_cast<lv_coord_t*>(malloc((len + 1) * sizeof(lv_coord_t)));
        for(int i=0; i < len; i++) {
            num_value = JS_GetPropertyUint32(ctx, row_value, i);
            JS_ToInt32(ctx, &num, num_value);
            row_ptr[i] = num;
            JS_FreeValue(ctx, num_value);
        }
        row_ptr[len] = LV_GRID_TEMPLATE_LAST;
        instance->grid_row_desc = row_ptr;
        JS_FreeValue(ctx, row_len_value);

        JS_FreeValue(ctx, column_value);
        JS_FreeValue(ctx, row_value);

        lv_obj_set_grid_dsc_array(comp, column_ptr, row_ptr);
        if (old_ptr1) {
            free((lv_coord_t*)(old_ptr1));
        }
        if (old_ptr2) {
            free((lv_coord_t*)(old_ptr2));
        }
    }
};

static void CompSetGridChild (lv_obj_t* comp, lv_style_t* style, JSContext* ctx, JSValue obj) {
    if (JS_IsArray(obj)) {
        JSValue JSValue1 = JS_GetPropertyUint32(ctx, obj, 0);
        JSValue JSValue2 = JS_GetPropertyUint32(ctx, obj, 1);
        JSValue JSValue3 = JS_GetPropertyUint32(ctx, obj, 2);
        JSValue JSValue4 = JS_GetPropertyUint32(ctx, obj, 3);
        JSValue JSValue5 = JS_GetPropertyUint32(ctx, obj, 4);
        JSValue JSValue6 = JS_GetPropertyUint32(ctx, obj, 5);

        int num1;
        int num2;
        int num3;
        int num4;
        int num5;
        int num6;
        JS_ToInt32(ctx, &num1, JSValue1);
        JS_ToInt32(ctx, &num2, JSValue2);
        JS_ToInt32(ctx, &num3, JSValue3);
        JS_ToInt32(ctx, &num4, JSValue4);
        JS_ToInt32(ctx, &num5, JSValue5);
        JS_ToInt32(ctx, &num6, JSValue6);

        lv_obj_set_grid_cell(comp, static_cast<lv_grid_align_t>(num1), num2, num3, static_cast<lv_grid_align_t>(num4), num5, num6);
        JS_FreeValue(ctx, JSValue1);
        JS_FreeValue(ctx, JSValue2);
        JS_FreeValue(ctx, JSValue3);
        JS_FreeValue(ctx, JSValue4);
        JS_FreeValue(ctx, JSValue5);
        JS_FreeValue(ctx, JSValue6);
    }
};

static void CompsetGridAlign (lv_obj_t* comp, lv_style_t* style, JSContext* ctx, JSValue obj) {
    if (JS_IsArray(obj)) {
        JSValue JSValue1 = JS_GetPropertyUint32(ctx, obj, 0);
        JSValue JSValue2 = JS_GetPropertyUint32(ctx, obj, 1);

        int num1;
        int num2;
        JS_ToInt32(ctx, &num1, JSValue1);
        JS_ToInt32(ctx, &num2, JSValue2);

        lv_obj_set_grid_align(comp, static_cast<lv_grid_align_t>(num1), static_cast<lv_grid_align_t>(num2));
        JS_FreeValue(ctx, JSValue1);
        JS_FreeValue(ctx, JSValue2);
    }
};

void NativeStyleInit(JSContext* ctx) {
    (void)ctx;
    if (!g_native_style_prop_handlers.empty()) {
        return;
    }
    // NativeStylePropValueKindPtr
    // Currently for lv_style_prop_t that use pointer still needs to have the handler.
    // TODO: In future, we can remove the handler by passing pointer with BigInt.
    g_native_style_prop_handlers[LV_STYLE_TEXT_FONT] = &CompSetFontSize;

    // NativeStylePropValueKindCSS
    g_native_style_prop_handlers[LV_STYLE_CSS_CHART_SCALE_X] = &CompSetChartScaleX;
    g_native_style_prop_handlers[LV_STYLE_CSS_CHART_SCALE_Y] = &CompSetChartScaleY;
    g_native_style_prop_handlers[LV_STYLE_CSS_DISPLAY] = &CompSetDisplay;
    g_native_style_prop_handlers[LV_STYLE_CSS_FLEX_ALIGN] = &CompSetFlexAlign;
    g_native_style_prop_handlers[LV_STYLE_CSS_GRID_ALIGN] = &CompsetGridAlign;
    g_native_style_prop_handlers[LV_STYLE_CSS_GRID_CHILD] = &CompSetGridChild;
    g_native_style_prop_handlers[LV_STYLE_CSS_GRID_TEMPLATE] = &CompGridColumnRow;
    g_native_style_prop_handlers[LV_STYLE_CSS_IMG_ORIGIN] = &CompSetTransformOrigin;
    g_native_style_prop_handlers[LV_STYLE_CSS_IMG_ROTATE] = &CompSetImgRotate;
    g_native_style_prop_handlers[LV_STYLE_CSS_IMG_SCALE_X] = &CompSetImgScaleX;
    g_native_style_prop_handlers[LV_STYLE_CSS_IMG_SCALE_Y] = &CompSetImgScaleY;
    g_native_style_prop_handlers[LV_STYLE_CSS_OVERFLOW] = &CompSetOverflow;
    g_native_style_prop_handlers[LV_STYLE_CSS_OVERFLOW_SCROLLING] = &CompSetOverFlowScrolling;
    g_native_style_prop_handlers[LV_STYLE_CSS_POSITION] = &CompSetPosition;
    g_native_style_prop_handlers[LV_STYLE_CSS_SCROLL_ENABLE_SNAP] = &CompScrollEnableSnap;
    g_native_style_prop_handlers[LV_STYLE_CSS_SCROLL_SNAP_X] = &CompSetScrollSnapX;
    g_native_style_prop_handlers[LV_STYLE_CSS_SCROLL_SNAP_Y] = &CompSetScrollSnapY;
    g_native_style_prop_handlers[LV_STYLE_CSS_TEXT_OVERFLOW] = &CompSetTextOverFLow;
}
