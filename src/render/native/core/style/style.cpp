#include "style.hpp"
#include "private.h"

static std::unordered_map<std::string, lv_anim_path_cb_t> transition_funcs = {
    { "linear", &lv_anim_path_linear },
    { "ease-in", &lv_anim_path_ease_in },
    { "ease-out", &lv_anim_path_ease_out },
    { "ease-in-out", &lv_anim_path_ease_in_out },
    { "overshoot", &lv_anim_path_overshoot },
    { "bounce", &lv_anim_path_bounce },
    { "step", &lv_anim_path_step },
};

void ApplySimpleStyle(lv_obj_t* comp, lv_style_t* style, JSContext* ctx, JSValue obj, const StylePropConfig& config) {
    int x;
    JS_ToInt32(ctx, &x, obj);
    
    lv_style_value_t v;
    switch (config.type) {
        case StyleValueType::NUM:
            v.num = x;
            break;
        case StyleValueType::COLOR:
            v.color = lv_color_hex(x);
            break;
        case StyleValueType::PCT:
            v.num = lv_pct(static_cast<int16_t>(x));
            break;
    }
    lv_style_set_prop(style, config.prop, v);
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

static void CompSetFlexGrow (lv_obj_t* comp, lv_style_t* style, JSContext* ctx, JSValue obj) {
    int x;
    JS_ToInt32(ctx, &x, obj);

    lv_style_set_flex_grow(style, static_cast<uint8_t>(x));
};

static void CompSetFlexFlow (lv_obj_t* comp, lv_style_t* style, JSContext* ctx, JSValue obj) {
    int x;
    JS_ToInt32(ctx, &x, obj);

    lv_style_set_flex_flow(style, static_cast<lv_flex_flow_t>(x));
};

static void CompSetJustifyContent (lv_obj_t* comp, lv_style_t* style, JSContext* ctx, JSValue obj) {
    int x;
    JS_ToInt32(ctx, &x, obj);

    lv_style_set_flex_main_place(style, static_cast<lv_flex_align_t>(x));
};

static void CompSetAlignItems (lv_obj_t* comp, lv_style_t* style, JSContext* ctx, JSValue obj) {
    int x;
    JS_ToInt32(ctx, &x, obj);

    lv_style_set_flex_cross_place(style, static_cast<lv_flex_align_t>(x));
};

static void CompSetAlignContent (lv_obj_t* comp, lv_style_t* style, JSContext* ctx, JSValue obj) {
    int x;
    JS_ToInt32(ctx, &x, obj);

    lv_style_set_flex_track_place(style, static_cast<lv_flex_align_t>(x));
};


static void CompSetTextOverFLow (lv_obj_t* comp, lv_style_t* style, JSContext* ctx, JSValue obj) {
    int x;
    JS_ToInt32(ctx, &x, obj);

    lv_label_set_long_mode(comp, x);
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

    lv_obj_set_scroll_snap_x(comp, x);
};

static void CompSetScrollSnapY (lv_obj_t* comp, lv_style_t* style, JSContext* ctx, JSValue obj) {
    int x;
    JS_ToInt32(ctx, &x, obj);

    lv_obj_set_scroll_snap_y(comp, x);
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

static void CompSetImgScale (lv_obj_t* comp, lv_style_t* style, JSContext* ctx, JSValue obj) {
    int x;
    JS_ToInt32(ctx, &x, obj);

    lv_img_set_zoom(comp, x);
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

static void CompSetChartScaleX (lv_obj_t* comp, lv_style_t* style, JSContext* ctx, JSValue obj) {
    int x;
    JS_ToInt32(ctx, &x, obj);

    lv_chart_set_zoom_x(comp, x);
};

static void CompSetChartScaleY (lv_obj_t* comp, lv_style_t* style, JSContext* ctx, JSValue obj) {
    int x;
    JS_ToInt32(ctx, &x, obj);

    lv_chart_set_zoom_y(comp, x);
};

void CompSetTransition (
    lv_style_t* style,
    lv_style_transition_dsc_t* trans, 
    lv_style_prop_t props[],
    std::string func_str,
    int32_t time,
    int32_t delay
) {
    lv_anim_path_cb_t func = &lv_anim_path_linear;
    if (transition_funcs.find(func_str) != transition_funcs.end()) {
        func = transition_funcs.at(func_str);
    }
    lv_style_transition_dsc_init(trans, props, func, time, 0, NULL);
    lv_style_set_transition(style, trans);
};

void CompSetAnimation (
    lv_obj_t* comp,
    void* opaque,
    lv_anim_t* animate,
    JSContext* ctx,
    JSValue obj
) {
    lv_anim_init(animate);

    int32_t duration;
    JSValue dura_value;

    int32_t start;
    int32_t end;
    JSValue start_value;
    JSValue end_value;

    int32_t delay;
    JSValue delay_value;

    lv_anim_set_var(animate, opaque);

    dura_value = JS_GetPropertyStr(ctx, obj, "duration");
    if (JS_IsNumber(dura_value)) {
        JS_ToInt32(ctx, &duration, dura_value);
        lv_anim_set_time(animate, duration);
    }
    JS_FreeValue(ctx, dura_value);

    start_value = JS_GetPropertyStr(ctx, obj, "startValue");
    end_value = JS_GetPropertyStr(ctx, obj, "endValue");
    if (JS_IsNumber(start_value) && JS_IsNumber(end_value)) {
        JS_ToInt32(ctx, &start, start_value);
        JS_ToInt32(ctx, &end, end_value);
        lv_anim_set_values(animate, start, end);
    }
    JS_FreeValue(ctx, start_value);
    JS_FreeValue(ctx, end_value);

    delay_value = JS_GetPropertyStr(ctx, obj, "delay");
    if (JS_IsNumber(delay_value)) {
        JS_ToInt32(ctx, &delay, delay_value);
        lv_anim_set_delay(animate, delay);
    }
    JS_FreeValue(ctx, delay_value);

    lv_anim_start(animate);
};

static void CompSetPosition (lv_obj_t* comp, lv_style_t* style, JSContext* ctx, JSValue obj) {
    size_t len;
    const char* str = JS_ToCStringLen(ctx, &len, obj);
    std::string value = str;
    value.resize(len);

    lv_obj_clear_flag(comp, LV_OBJ_FLAG_FLOATING);
    BasicComponent* instance = static_cast<BasicComponent*>(comp->user_data);
    instance->is_fixed = false;
    if (instance->parent_instance != nullptr) {
        lv_obj_set_parent(comp, instance->parent_instance);
    }

    if (value == "absolute") {
        lv_obj_add_flag(comp, LV_OBJ_FLAG_FLOATING);
    } else if (value == "fixed") {
        instance->is_fixed = true;
        lv_obj_set_parent(comp, lv_scr_act());
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

std::unordered_map<std::string, StyleEntryWrapper> StyleManager::styles {
    {"width",           StyleEntryWrapper({LV_STYLE_WIDTH,        StyleValueType::NUM})},
    {"max-width",       StyleEntryWrapper({LV_STYLE_MAX_WIDTH,    StyleValueType::NUM})},
    {"min-width",       StyleEntryWrapper({LV_STYLE_MIN_WIDTH,    StyleValueType::NUM})},
    {"height",          StyleEntryWrapper({LV_STYLE_HEIGHT,       StyleValueType::NUM})},
    {"max-height",      StyleEntryWrapper({LV_STYLE_MAX_HEIGHT,   StyleValueType::NUM})},
    {"min-height",      StyleEntryWrapper({LV_STYLE_MIN_HEIGHT,   StyleValueType::NUM})},
    {"left",            StyleEntryWrapper({LV_STYLE_X,            StyleValueType::NUM})},
    {"top",             StyleEntryWrapper({LV_STYLE_Y,            StyleValueType::NUM})},
    
    {"width_pct",       StyleEntryWrapper({LV_STYLE_WIDTH,        StyleValueType::PCT})},
    {"height_pct",      StyleEntryWrapper({LV_STYLE_HEIGHT,       StyleValueType::PCT})},
    {"left_pct",        StyleEntryWrapper({LV_STYLE_X,           StyleValueType::PCT})},
    {"top_pct",         StyleEntryWrapper({LV_STYLE_Y,           StyleValueType::PCT})},
    {"max-width_pct",   StyleEntryWrapper({LV_STYLE_MAX_WIDTH,    StyleValueType::PCT})},
    {"min-width_pct",   StyleEntryWrapper({LV_STYLE_MIN_WIDTH,    StyleValueType::PCT})},
    {"max-height_pct",  StyleEntryWrapper({LV_STYLE_MAX_HEIGHT,   StyleValueType::PCT})},
    {"min-height_pct",  StyleEntryWrapper({LV_STYLE_MIN_HEIGHT,   StyleValueType::PCT})},
    
    {"background-color",        StyleEntryWrapper({LV_STYLE_BG_COLOR,         StyleValueType::COLOR})},
    {"background-opacity",      StyleEntryWrapper({LV_STYLE_BG_OPA,           StyleValueType::NUM})},
    {"background-grad-color",   StyleEntryWrapper({LV_STYLE_BG_GRAD_COLOR,    StyleValueType::COLOR})},
    {"background-grad-color-dir", StyleEntryWrapper({LV_STYLE_BG_GRAD_DIR,    StyleValueType::NUM})},
    
    {"border-radius",   StyleEntryWrapper({LV_STYLE_RADIUS,       StyleValueType::NUM})},
    
    {"arc-width",       StyleEntryWrapper({LV_STYLE_ARC_WIDTH,    StyleValueType::NUM})},
    {"arc-rounded",     StyleEntryWrapper({LV_STYLE_ARC_ROUNDED,  StyleValueType::NUM})},
    {"arc-color",       StyleEntryWrapper({LV_STYLE_ARC_COLOR,    StyleValueType::COLOR})},
    {"arc-opacity",     StyleEntryWrapper({LV_STYLE_ARC_OPA,      StyleValueType::NUM})},
    
    {"display",         StyleEntryWrapper(&CompSetDisplay)},
    {"flex-align",      StyleEntryWrapper(&CompSetFlexAlign)},
    {"flex-flow",       StyleEntryWrapper(&CompSetFlexFlow)},
    {"flex-grow",       StyleEntryWrapper(&CompSetFlexGrow)},
    {"justify-content", StyleEntryWrapper(&CompSetJustifyContent)},
    {"align-items",     StyleEntryWrapper(&CompSetAlignItems)},
    {"align-content",    StyleEntryWrapper(&CompSetAlignContent)},
    
    {"padding-left",    StyleEntryWrapper({LV_STYLE_PAD_LEFT,     StyleValueType::NUM})},
    {"padding-right",   StyleEntryWrapper({LV_STYLE_PAD_RIGHT,    StyleValueType::NUM})},
    {"padding-bottom",  StyleEntryWrapper({LV_STYLE_PAD_BOTTOM,   StyleValueType::NUM})},
    {"padding-top",     StyleEntryWrapper({LV_STYLE_PAD_TOP,      StyleValueType::NUM})},
    
    {"border-width",    StyleEntryWrapper({LV_STYLE_BORDER_WIDTH, StyleValueType::NUM})},
    {"border-opacity",  StyleEntryWrapper({LV_STYLE_BORDER_OPA,   StyleValueType::NUM})},
    {"border-color",    StyleEntryWrapper({LV_STYLE_BORDER_COLOR, StyleValueType::COLOR})},
    {"border-side",     StyleEntryWrapper({LV_STYLE_BORDER_SIDE,  StyleValueType::NUM})},
    
    {"outline-width",   StyleEntryWrapper({LV_STYLE_OUTLINE_WIDTH, StyleValueType::NUM})},
    {"outline-opacity", StyleEntryWrapper({LV_STYLE_OUTLINE_OPA,   StyleValueType::NUM})},
    {"outline-color",   StyleEntryWrapper({LV_STYLE_OUTLINE_COLOR, StyleValueType::COLOR})},
    {"outline-padding", StyleEntryWrapper({LV_STYLE_OUTLINE_PAD,   StyleValueType::NUM})},
    
    {"font-size",       StyleEntryWrapper(&CompSetFontSize)},
    {"font-size-1",    StyleEntryWrapper(&CompSetFontSize1)},
    {"text-overflow",   StyleEntryWrapper(&CompSetTextOverFLow)},
    {"letter-spacing",  StyleEntryWrapper({LV_STYLE_TEXT_LETTER_SPACE, StyleValueType::NUM})},
    {"text-align",      StyleEntryWrapper({LV_STYLE_TEXT_ALIGN,        StyleValueType::NUM})},
    {"text-decoration", StyleEntryWrapper({LV_STYLE_TEXT_DECOR,        StyleValueType::NUM})},
    {"line-spacing",    StyleEntryWrapper({LV_STYLE_TEXT_LINE_SPACE,   StyleValueType::NUM})},
    
    {"overflow-scrolling", StyleEntryWrapper(&CompSetOverFlowScrolling)},
    {"overflow",        StyleEntryWrapper(&CompSetOverflow)},
    {"scroll-snap-x",   StyleEntryWrapper(&CompSetScrollSnapX)},
    {"scroll-snap-y",   StyleEntryWrapper(&CompSetScrollSnapY)},
    {"scroll-enable-snap", StyleEntryWrapper(&CompScrollEnableSnap)},
    
    {"opacity",         StyleEntryWrapper({LV_STYLE_OPA,          StyleValueType::NUM})},
    {"img-opacity",     StyleEntryWrapper({LV_STYLE_IMG_OPA,      StyleValueType::NUM})},
    {"recolor-opacity", StyleEntryWrapper({LV_STYLE_IMG_RECOLOR_OPA, StyleValueType::NUM})},
    
    {"translateX",      StyleEntryWrapper({LV_STYLE_TRANSLATE_X,  StyleValueType::NUM})},
    {"translateY",      StyleEntryWrapper({LV_STYLE_TRANSLATE_Y,  StyleValueType::NUM})},
    {"scale",           StyleEntryWrapper({LV_STYLE_TRANSFORM_ZOOM, StyleValueType::NUM})},
    {"rotate",          StyleEntryWrapper({LV_STYLE_TRANSFORM_ANGLE, StyleValueType::NUM})},
    {"img-scale",       StyleEntryWrapper(&CompSetImgScale)},
    {"img-rotate",      StyleEntryWrapper(&CompSetImgRotate)},
    {"img-origin",      StyleEntryWrapper(&CompSetTransformOrigin)},
    {"chart-scaleX",    StyleEntryWrapper(&CompSetChartScaleX)},
    {"chart-scaleY",    StyleEntryWrapper(&CompSetChartScaleY)},
    {"transform-width", StyleEntryWrapper({LV_STYLE_TRANSFORM_WIDTH, StyleValueType::NUM})},
    {"transform-height", StyleEntryWrapper({LV_STYLE_TRANSFORM_HEIGHT, StyleValueType::NUM})},
    {"transition-time", StyleEntryWrapper({LV_STYLE_ANIM_TIME, StyleValueType::NUM})},
    
    {"text-color",      StyleEntryWrapper({LV_STYLE_TEXT_COLOR,   StyleValueType::COLOR})},
    {"recolor",         StyleEntryWrapper({LV_STYLE_IMG_RECOLOR,  StyleValueType::COLOR})},
    
    {"row-spacing",     StyleEntryWrapper({LV_STYLE_PAD_ROW,      StyleValueType::NUM})},
    {"column-spacing",  StyleEntryWrapper({LV_STYLE_PAD_COLUMN,   StyleValueType::NUM})},
    
    {"line-width",      StyleEntryWrapper({LV_STYLE_LINE_WIDTH,   StyleValueType::NUM})},
    {"line-color",      StyleEntryWrapper({LV_STYLE_LINE_COLOR,   StyleValueType::COLOR})},
    {"line-rounded",    StyleEntryWrapper({LV_STYLE_LINE_ROUNDED, StyleValueType::NUM})},
    
    {"shadow-width",    StyleEntryWrapper({LV_STYLE_SHADOW_WIDTH, StyleValueType::NUM})},
    {"shadow-color",    StyleEntryWrapper({LV_STYLE_SHADOW_COLOR, StyleValueType::COLOR})},
    {"shadow-spread",   StyleEntryWrapper({LV_STYLE_SHADOW_SPREAD, StyleValueType::NUM})},
    {"shadow-opacity",  StyleEntryWrapper({LV_STYLE_SHADOW_OPA,   StyleValueType::NUM})},
    {"shadow-offset-x", StyleEntryWrapper({LV_STYLE_SHADOW_OFS_X, StyleValueType::NUM})},
    {"shadow-offset-y", StyleEntryWrapper({LV_STYLE_SHADOW_OFS_Y, StyleValueType::NUM})},
    
    {"position",        StyleEntryWrapper(&CompSetPosition)},
    
    {"grid-template",   StyleEntryWrapper(&CompGridColumnRow)},
    {"grid-child",     StyleEntryWrapper(&CompSetGridChild)},
    {"grid-align",     StyleEntryWrapper(&CompsetGridAlign)},
};
