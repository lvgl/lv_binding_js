#include "style.hpp"

static std::unordered_map<std::string, lv_anim_path_cb_t> transition_funcs = {
    { "linear", &lv_anim_path_linear },
    { "ease-in", &lv_anim_path_ease_in },
    { "ease-out", &lv_anim_path_ease_out },
    { "ease-in-out", &lv_anim_path_ease_in_out },
    { "overshoot", &lv_anim_path_overshoot },
    { "bounce", &lv_anim_path_bounce },
    { "step", &lv_anim_path_step },
};

static void CompSetWidth (lv_obj_t* comp, lv_style_t* style, JSContext* ctx, JSValue obj) {
    int width;
    JS_ToInt32(ctx, &width, obj);
    lv_style_set_width(style, static_cast<int16_t>(width));
};

static void CompSetMaxWidth (lv_obj_t* comp, lv_style_t* style, JSContext* ctx, JSValue obj) {
    int width;
    JS_ToInt32(ctx, &width, obj);
    lv_style_set_max_width(style, static_cast<int16_t>(width));
};

static void CompSetMinWidth (lv_obj_t* comp, lv_style_t* style, JSContext* ctx, JSValue obj) {
    int width;
    JS_ToInt32(ctx, &width, obj);
    lv_style_set_min_width(style, static_cast<int16_t>(width));
};

static void CompSetMaxWidthPch (lv_obj_t* comp, lv_style_t* style, JSContext* ctx, JSValue obj) {
    int width;
    JS_ToInt32(ctx, &width, obj);
    lv_style_set_max_width(style, lv_pct(static_cast<int16_t>(width)));
};

static void CompSetMinWidthPch (lv_obj_t* comp, lv_style_t* style, JSContext* ctx, JSValue obj) {
    int width;
    JS_ToInt32(ctx, &width, obj);
    lv_style_set_min_width(style, lv_pct(static_cast<int16_t>(width)));
};

static void CompSetWidthPch (lv_obj_t* comp, lv_style_t* style, JSContext* ctx, JSValue obj) {
    int width;
    JS_ToInt32(ctx, &width, obj);
    lv_style_set_width(style, lv_pct(static_cast<int16_t>(width)));
};

static void CompSetHeight (lv_obj_t* comp, lv_style_t* style, JSContext* ctx, JSValue obj) {
    int height;
    JS_ToInt32(ctx, &height, obj);
    lv_style_set_height(style, static_cast<int16_t>(height));
};

static void CompSetHeightPch (lv_obj_t* comp, lv_style_t* style, JSContext* ctx, JSValue obj) {
    int height;
    JS_ToInt32(ctx, &height, obj);
    lv_style_set_height(style, lv_pct(static_cast<int16_t>(height)));
};

static void CompSetMaxHeight (lv_obj_t* comp, lv_style_t* style, JSContext* ctx, JSValue obj) {
    int height;
    JS_ToInt32(ctx, &height, obj);
    lv_style_set_max_height(style, static_cast<int16_t>(height));
};

static void CompSetMaxHeightPch (lv_obj_t* comp, lv_style_t* style, JSContext* ctx, JSValue obj) {
    int height;
    JS_ToInt32(ctx, &height, obj);
    lv_style_set_max_height(style, lv_pct(static_cast<int16_t>(height)));
};

static void CompSetMinHeight (lv_obj_t* comp, lv_style_t* style, JSContext* ctx, JSValue obj) {
    int height;
    JS_ToInt32(ctx, &height, obj);
    lv_style_set_min_height(style, static_cast<int16_t>(height));
};

static void CompSetMinHeightPch (lv_obj_t* comp, lv_style_t* style, JSContext* ctx, JSValue obj) {
    int height;
    JS_ToInt32(ctx, &height, obj);
    lv_style_set_min_height(style, lv_pct(static_cast<int16_t>(height)));
};

static void CompSetX (lv_obj_t* comp, lv_style_t* style, JSContext* ctx, JSValue obj) {
    int x;
    JS_ToInt32(ctx, &x, obj);
    lv_style_set_x(style, static_cast<int16_t>(x));
};

static void CompSetXPch (lv_obj_t* comp, lv_style_t* style, JSContext* ctx, JSValue obj) {
    int x;
    JS_ToInt32(ctx, &x, obj);
    lv_style_set_x(style, lv_pct(static_cast<int16_t>(x)));
};

static void CompSetY (lv_obj_t* comp, lv_style_t* style, JSContext* ctx, JSValue obj) {
    int y;
    JS_ToInt32(ctx, &y, obj);
    lv_style_set_y(style, static_cast<int16_t>(y));
};

static void CompSetYPch (lv_obj_t* comp, lv_style_t* style, JSContext* ctx, JSValue obj) {
    int y;
    JS_ToInt32(ctx, &y, obj);
    lv_style_set_y(style, lv_pct(static_cast<int16_t>(y)));
};

static void CompSetBackgroundColor (lv_obj_t* comp, lv_style_t* style, JSContext* ctx, JSValue obj) {
    int y;
    JS_ToInt32(ctx, &y, obj);

    lv_style_set_bg_color(style, lv_color_hex(y));
};

static void CompSetBackgroundOpacity (lv_obj_t* comp, lv_style_t* style, JSContext* ctx, JSValue obj) {
    int y;
    JS_ToInt32(ctx, &y, obj);

    lv_style_set_bg_opa(style, y);
};

static void CompSetBackgroundGradColor (lv_obj_t* comp, lv_style_t* style, JSContext* ctx, JSValue obj) {
    int y;
    JS_ToInt32(ctx, &y, obj);

    lv_style_set_bg_grad_color(style, lv_color_hex(y));
};

static void CompSetBackgroundGradColorDir (lv_obj_t* comp, lv_style_t* style, JSContext* ctx, JSValue obj) {
    int y;
    JS_ToInt32(ctx, &y, obj);

    lv_style_set_bg_grad_dir(style, y);
};

static void CompSetBorderRadius (lv_obj_t* comp, lv_style_t* style, JSContext* ctx, JSValue obj) {
    int x;
    JS_ToInt32(ctx, &x, obj);

    lv_style_set_radius(style, x);
};

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

    lv_style_set_flex_grow(style, static_cast<lv_flex_flow_t>(x));
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

static void CompSetPaddingLeft (lv_obj_t* comp, lv_style_t* style, JSContext* ctx, JSValue obj) {
    int x;
    JS_ToInt32(ctx, &x, obj);

    lv_style_set_pad_left(style, x);
};

static void CompSetPaddingRight (lv_obj_t* comp, lv_style_t* style, JSContext* ctx, JSValue obj) {
    int x;
    JS_ToInt32(ctx, &x, obj);

    lv_style_set_pad_right(style, x);
};

static void CompSetPaddingBottom (lv_obj_t* comp, lv_style_t* style, JSContext* ctx, JSValue obj) {
    int x;
    JS_ToInt32(ctx, &x, obj);

    lv_style_set_pad_bottom(style, x);
};

static void CompSetPaddingTop (lv_obj_t* comp, lv_style_t* style, JSContext* ctx, JSValue obj) {
    int x;
    JS_ToInt32(ctx, &x, obj);

    lv_style_set_pad_top(style, x);
};

static void CompSetBorderWidth (lv_obj_t* comp, lv_style_t* style, JSContext* ctx, JSValue obj) {
    int x;
    JS_ToInt32(ctx, &x, obj);

    lv_style_set_border_width(style, x);
};

static void CompSetBorderOpacity (lv_obj_t* comp, lv_style_t* style, JSContext* ctx, JSValue obj) {
    int x;
    JS_ToInt32(ctx, &x, obj);

    lv_style_set_border_opa(style, x);
};

static void CompSetBorderColor (lv_obj_t* comp, lv_style_t* style, JSContext* ctx, JSValue obj) {
    int x;
    JS_ToInt32(ctx, &x, obj);

    lv_style_set_border_color(style, lv_color_hex(x));
};

static void CompSetBorderSide (lv_obj_t* comp, lv_style_t* style, JSContext* ctx, JSValue obj) {
    int x;
    JS_ToInt32(ctx, &x, obj);

    lv_style_set_border_side(style, x);
};

static void CompSetOutlineWidth (lv_obj_t* comp, lv_style_t* style, JSContext* ctx, JSValue obj) {
    int x;
    JS_ToInt32(ctx, &x, obj);

    lv_style_set_outline_width(style, x);
};

static void CompSetOutlineOpacity (lv_obj_t* comp, lv_style_t* style, JSContext* ctx, JSValue obj) {
    int x;
    JS_ToInt32(ctx, &x, obj);

    lv_style_set_outline_opa(style, x);
};

static void CompSetOutlineColor (lv_obj_t* comp, lv_style_t* style, JSContext* ctx, JSValue obj) {
    int x;
    JS_ToInt32(ctx, &x, obj);

    lv_style_set_outline_color(style, lv_color_hex(x));
};

static void CompSetOutlinePadding (lv_obj_t* comp, lv_style_t* style, JSContext* ctx, JSValue obj) {
    int x;
    JS_ToInt32(ctx, &x, obj);

    lv_style_set_outline_pad(style, x);
};

static void CompSetTextOverFLow (lv_obj_t* comp, lv_style_t* style, JSContext* ctx, JSValue obj) {
    int x;
    JS_ToInt32(ctx, &x, obj);

    lv_label_set_long_mode(comp, x);
};

static void CompSetLetterSpacing (lv_obj_t* comp, lv_style_t* style, JSContext* ctx, JSValue obj) {
    int x;
    JS_ToInt32(ctx, &x, obj);

    lv_style_set_text_letter_space(style, x);
};

static void CompSetLineSpacing (lv_obj_t* comp, lv_style_t* style, JSContext* ctx, JSValue obj) {
    int x;
    JS_ToInt32(ctx, &x, obj);

    lv_style_set_text_line_space(style, x);
};

static void CompSetTextAlign (lv_obj_t* comp, lv_style_t* style, JSContext* ctx, JSValue obj) {
    int x;
    JS_ToInt32(ctx, &x, obj);

    lv_style_set_text_align(style, x);
};

static void CompSetDecoration (lv_obj_t* comp, lv_style_t* style, JSContext* ctx, JSValue obj) {
    int x;
    JS_ToInt32(ctx, &x, obj);

    lv_style_set_text_decor(style, x);
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

static void CompSetOpacity (lv_obj_t* comp, lv_style_t* style, JSContext* ctx, JSValue obj) {
    int x;
    JS_ToInt32(ctx, &x, obj);

    lv_style_set_opa(style, x);
};

static void CompSetImgOpacity (lv_obj_t* comp, lv_style_t* style, JSContext* ctx, JSValue obj) {
    int x;
    JS_ToInt32(ctx, &x, obj);

    lv_style_set_img_opa(style, x);
};

static void CompRecolorOpacity (lv_obj_t* comp, lv_style_t* style, JSContext* ctx, JSValue obj) {
    int x;
    JS_ToInt32(ctx, &x, obj);

    lv_style_set_img_recolor_opa(style, x);
};

static void CompSetTranslateX (lv_obj_t* comp, lv_style_t* style, JSContext* ctx, JSValue obj) {
    int x;
    JS_ToInt32(ctx, &x, obj);

    lv_style_set_translate_x(style, x);
};

static void CompSetTranslateY (lv_obj_t* comp, lv_style_t* style, JSContext* ctx, JSValue obj) {
    int x;
    JS_ToInt32(ctx, &x, obj);

    lv_style_set_translate_y(style, x);
};

static void CompSetScale (lv_obj_t* comp, lv_style_t* style, JSContext* ctx, JSValue obj) {
    int x;
    JS_ToInt32(ctx, &x, obj);

    lv_style_set_transform_zoom(style, x);
};

static void CompSetRotate (lv_obj_t* comp, lv_style_t* style, JSContext* ctx, JSValue obj) {
    int x;
    JS_ToInt32(ctx, &x, obj);

    lv_style_set_transform_angle(style, x);
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

static void CompSetTransformWidth (lv_obj_t* comp, lv_style_t* style, JSContext* ctx, JSValue obj) {
    int x;
    JS_ToInt32(ctx, &x, obj);

    lv_style_set_transform_width(style, x);
};

static void CompSetTransformHeight (lv_obj_t* comp, lv_style_t* style, JSContext* ctx, JSValue obj) {
    int x;
    JS_ToInt32(ctx, &x, obj);

    lv_style_set_transform_height(style, x);
};

static void CompSetStyleTransitionTime (lv_obj_t* comp, lv_style_t* style, JSContext* ctx, JSValue obj) {
    int x;
    JS_ToInt32(ctx, &x, obj);

    lv_style_set_anim_time(style, x);
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
        lv_anim_set_time(animate, duration);
        JS_ToInt32(ctx, &duration, dura_value);
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

static void CompSetTextColor (lv_obj_t* comp, lv_style_t* style, JSContext* ctx, JSValue obj) {
    int y;
    JS_ToInt32(ctx, &y, obj);

    lv_style_set_text_color(style, lv_color_hex(y));
};

static void CompSetRecolor (lv_obj_t* comp, lv_style_t* style, JSContext* ctx, JSValue obj) {
    int y;
    JS_ToInt32(ctx, &y, obj);

    lv_style_set_img_recolor(style, lv_color_hex(y));
};

static void CompSetRowSpacing (lv_obj_t* comp, lv_style_t* style, JSContext* ctx, JSValue obj) {
    int y;
    JS_ToInt32(ctx, &y, obj);

    lv_style_set_pad_row(style, y);
};

static void CompSetColumnSpacing (lv_obj_t* comp, lv_style_t* style, JSContext* ctx, JSValue obj) {
    int y;
    JS_ToInt32(ctx, &y, obj);

    lv_style_set_pad_column(style, y);
};

static void CompSetLineWidth (lv_obj_t* comp, lv_style_t* style, JSContext* ctx, JSValue obj) {
    int y;
    JS_ToInt32(ctx, &y, obj);

    lv_style_set_line_width(style, y);
};

static void CompSetLineColor (lv_obj_t* comp, lv_style_t* style, JSContext* ctx, JSValue obj) {
    int x;
    JS_ToInt32(ctx, &x, obj);

    lv_style_set_line_color(style, lv_color_hex(x));
};

static void CompSetLineRounded (lv_obj_t* comp, lv_style_t* style, JSContext* ctx, JSValue obj) {
    int x;
    JS_ToInt32(ctx, &x, obj);

    lv_style_set_line_rounded(style, x);
};

static void CompSetShadowWidth (lv_obj_t* comp, lv_style_t* style, JSContext* ctx, JSValue obj) {
    int x;
    JS_ToInt32(ctx, &x, obj);

    lv_style_set_shadow_width(style, x);
};

static void CompSetShadowColor (lv_obj_t* comp, lv_style_t* style, JSContext* ctx, JSValue obj) {
    int x;
    JS_ToInt32(ctx, &x, obj);

    lv_style_set_shadow_color(style, lv_color_hex(x));
};

static void CompSetShadowSpread (lv_obj_t* comp, lv_style_t* style, JSContext* ctx, JSValue obj) {
    int x;
    JS_ToInt32(ctx, &x, obj);

    lv_style_set_shadow_spread(style, x);
};

static void CompSetShadowOpacity (lv_obj_t* comp, lv_style_t* style, JSContext* ctx, JSValue obj) {
    int x;
    JS_ToInt32(ctx, &x, obj);

    lv_style_set_shadow_opa(style, x);
};

static void CompSetOffsetX (lv_obj_t* comp, lv_style_t* style, JSContext* ctx, JSValue obj) {
    int x;
    JS_ToInt32(ctx, &x, obj);

    lv_style_set_shadow_ofs_x(style, x);
};

static void CompSetOffsetY (lv_obj_t* comp, lv_style_t* style, JSContext* ctx, JSValue obj) {
    int x;
    JS_ToInt32(ctx, &x, obj);

    lv_style_set_shadow_ofs_y(style, x);
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
    if (JS_IsArray(ctx, obj)) {
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
    if (JS_IsArray(ctx, obj)) {
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
    if (JS_IsArray(ctx, obj)) {
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

std::unordered_map<std::string, CompSetStyle*> StyleManager::styles {
    /* size && position */
    {"width", &CompSetWidth},
    {"max-width", &CompSetMaxWidth},
    {"max-width_pct", &CompSetMaxWidthPch},
    {"min-width", &CompSetMinWidth},
    {"min-width_pct", &CompSetMinWidthPch},
    {"height", &CompSetHeight},
    {"max-height", &CompSetMaxHeight},
    {"max-height_pct", &CompSetMaxHeightPch},
    {"min-height", &CompSetMinHeight},
    {"min-height_pct", &CompSetMinHeightPch},
    {"left", &CompSetX},
    {"top", &CompSetY},
    {"width_pct", &CompSetWidthPch},
    {"height_pct", &CompSetHeightPch},
    {"left_pct", &CompSetXPch},
    {"top_pct", &CompSetYPch},

    /* background */
    {"background-color", &CompSetBackgroundColor},
    {"background-opacity", &CompSetBackgroundOpacity},
    {"background-grad-color", &CompSetBackgroundGradColor},
    {"background-grad-color-dir", &CompSetBackgroundGradColorDir},

    /* border-radius */
    {"border-radius", &CompSetBorderRadius},

    /* layout */
    {"display", &CompSetDisplay},
    {"flex-align", &CompSetFlexAlign},
    {"flex-flow", &CompSetFlexFlow},
    {"flex-grow", &CompSetFlexGrow},
    {"justify-content", &CompSetJustifyContent},
    {"align-items", &CompSetAlignItems},
    {"align-content", &CompSetAlignContent},

    /* padding */
    {"padding-left", &CompSetPaddingLeft},
    {"padding-right", &CompSetPaddingRight},
    {"padding-bottom", &CompSetPaddingBottom},
    {"padding-top", &CompSetPaddingTop},

    /* border */
    {"border-width", &CompSetBorderWidth},
    {"border-opacity", &CompSetBorderOpacity},
    {"border-color", &CompSetBorderColor},
    {"border-side", &CompSetBorderSide},

    /* outline */
    {"outline-width", &CompSetOutlineWidth},
    {"outline-opacity", &CompSetOutlineOpacity},
    {"outline-color", &CompSetOutlineColor},
    {"outline-padding", &CompSetOutlinePadding},

    /* font */
    {"font-size", &CompSetFontSize},
    {"font-size-1", &CompSetFontSize1},
    {"text-overflow", &CompSetTextOverFLow},
    {"letter-spacing", &CompSetLetterSpacing},
    {"text-align", &CompSetTextAlign},
    {"text-decoration", &CompSetDecoration},
    {"line-spacing", &CompSetLineSpacing},

    /* scroll */
    {"overflow-scrolling", &CompSetOverFlowScrolling},
    {"overflow", &CompSetOverflow},
    {"scroll-snap-x", &CompSetScrollSnapX},
    {"scroll-snap-y", &CompSetScrollSnapY},
    {"scroll-enable-snap", &CompScrollEnableSnap},

    /* opacity */
    {"opacity", &CompSetOpacity},
    {"img-opacity", &CompSetImgOpacity},
    {"recolor-opacity", &CompRecolorOpacity},

    /* transform */
    {"translateX", &CompSetTranslateX},
    {"translateY", &CompSetTranslateY},
    {"scale", &CompSetScale},
    {"rotate", &CompSetRotate},
    {"img-scale", &CompSetImgScale},
    {"img-rotate", &CompSetImgRotate},
    {"img-origin", &CompSetTransformOrigin},
    {"chart-scaleX", &CompSetChartScaleX},
    {"chart-scaleY", &CompSetChartScaleY},
    {"transform-width", &CompSetTransformWidth},
    {"transform-height", &CompSetTransformHeight},
    {"style-transition-time", &CompSetStyleTransitionTime},

    /* color */
    {"text-color", &CompSetTextColor},
    {"recolor", &CompSetRecolor},

    /* spacing */
    {"row-spacing", &CompSetRowSpacing},
    {"column-spacing", &CompSetColumnSpacing},
    
    /* line comp */
    {"line-width", &CompSetLineWidth},
    {"line-color", &CompSetLineColor},
    {"line-rounded", &CompSetLineRounded},

    /* shadow */
    {"shadow-width", &CompSetShadowWidth},
    {"shadow-color", &CompSetShadowColor},
    {"shadow-spread", &CompSetShadowSpread},
    {"shadow-opacity", &CompSetShadowOpacity},
    {"shadow-offset-x", &CompSetOffsetX},
    {"shadow-offset-y", &CompSetOffsetY},

    /* position */
    {"position", &CompSetPosition},

    /* grid */
    {"grid-template", &CompGridColumnRow},
    {"grid-child", &CompSetGridChild},
    {"grid-align", &CompsetGridAlign},
};