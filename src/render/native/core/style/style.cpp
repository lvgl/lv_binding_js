#include "style.hpp"

static void CompSetWidth (lv_obj_t* comp, lv_style_t* style, JSContext* ctx, JSValue obj) {
    int width;
    JS_ToInt32(ctx, &width, obj);
    lv_obj_set_width(comp, static_cast<int16_t>(width));
};

static void CompSetWidthPch (lv_obj_t* comp, lv_style_t* style, JSContext* ctx, JSValue obj) {
    int width;
    JS_ToInt32(ctx, &width, obj);
    lv_obj_set_width(comp, lv_pct(static_cast<int16_t>(width)));
};

static void CompSetHeight (lv_obj_t* comp, lv_style_t* style, JSContext* ctx, JSValue obj) {
    int height;
    JS_ToInt32(ctx, &height, obj);
    lv_obj_set_height(comp, static_cast<int16_t>(height));
};

static void CompSetHeightPch (lv_obj_t* comp, lv_style_t* style, JSContext* ctx, JSValue obj) {
    int height;
    JS_ToInt32(ctx, &height, obj);
    lv_obj_set_height(comp, lv_pct(static_cast<int16_t>(height)));
};

static void CompSetX (lv_obj_t* comp, lv_style_t* style, JSContext* ctx, JSValue obj) {
    int x;
    JS_ToInt32(ctx, &x, obj);
    lv_obj_set_x(comp, static_cast<int16_t>(x));
};

static void CompSetXPch (lv_obj_t* comp, lv_style_t* style, JSContext* ctx, JSValue obj) {
    int x;
    JS_ToInt32(ctx, &x, obj);
    lv_obj_set_x(comp, lv_pct(static_cast<int16_t>(x)));
};

static void CompSetY (lv_obj_t* comp, lv_style_t* style, JSContext* ctx, JSValue obj) {
    int y;
    JS_ToInt32(ctx, &y, obj);
    lv_obj_set_y(comp, static_cast<int16_t>(y));
};

static void CompSetYPch (lv_obj_t* comp, lv_style_t* style, JSContext* ctx, JSValue obj) {
    int y;
    JS_ToInt32(ctx, &y, obj);
    lv_obj_set_y(comp, lv_pct(static_cast<int16_t>(y)));
};

static void CompSetBackgroundColor (lv_obj_t* comp, lv_style_t* style, JSContext* ctx, JSValue obj) {
    int y;
    JS_ToInt32(ctx, &y, obj);

    lv_style_set_bg_color(style, lv_color_hex(y));
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
    std::string value = JS_ToCStringLen(ctx, &len, obj);
    value.resize(len);

    lv_obj_set_layout(comp, LV_LAYOUT_FLEX);

    if (value == "flex") {
        lv_obj_set_layout(comp, LV_LAYOUT_FLEX);
    } else if (value == "grid") {
        lv_obj_set_layout(comp, LV_LAYOUT_GRID);
    }
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

    lv_obj_set_flex_grow(comp, static_cast<lv_flex_flow_t>(x));
};

static void CompSetFlexFlow (lv_obj_t* comp, lv_style_t* style, JSContext* ctx, JSValue obj) {
    int x;
    JS_ToInt32(ctx, &x, obj);

    lv_obj_set_flex_flow(comp, static_cast<lv_flex_flow_t>(x));
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

void CompSetTransition (
    lv_style_t* style,
    lv_style_transition_dsc_t* trans, 
    lv_style_prop_t props[],
    std::string func_str,
    int32_t time,
    int32_t delay
) {
    static const lv_style_prop_t props1[] = {
            LV_STYLE_HEIGHT, LV_STYLE_PROP_INV
    };
    static lv_style_transition_dsc_t transition_dsc_def1;

    lv_style_transition_dsc_init(&transition_dsc_def1, props1, lv_anim_path_ease_out, 1000, 0, NULL);
    lv_style_set_transition(style, &transition_dsc_def1);
};

static void CompSetTextColor (lv_obj_t* comp, lv_style_t* style, JSContext* ctx, JSValue obj) {
    int y;
    JS_ToInt32(ctx, &y, obj);

    lv_obj_set_style_text_color(comp, lv_color_hex(y), 0);
};

std::unordered_map<std::string, CompSetStyle*> StyleManager::styles {
    /* size && position */
    {"width", &CompSetWidth},
    {"height", &CompSetHeight},
    {"left", &CompSetX},
    {"top", &CompSetY},
    {"width_pct", &CompSetWidthPch},
    {"height_pct", &CompSetHeightPch},
    {"left_pct", &CompSetXPch},
    {"top_pct", &CompSetYPch},

    /* background */
    {"background-color", &CompSetBackgroundColor},
    {"background-grad-color", &CompSetBackgroundGradColor},
    {"background-grad-color-dir", &CompSetBackgroundGradColorDir},

    /* border-radius */
    {"border-radius", &CompSetBorderRadius},

    /* layout */
    {"display", &CompSetDisplay},
    {"flex-align", &CompSetFlexAlign},
    {"flex-flow", &CompSetFlexFlow},
    {"flex-grow", &CompSetFlexGrow},

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
    {"outline-width", &CompSetBorderWidth},
    {"outline-opacity", &CompSetBorderOpacity},
    {"outline-color", &CompSetBorderColor},

    /* font */
    {"font-size", &CompSetFontSize},
    {"text-overflow", &CompSetTextOverFLow},

    /* scroll */
    {"overflow-scrolling", &CompSetOverFlowScrolling},
    {"overflow", &CompSetOverflow},

    /* opacity */
    {"opacity", &CompSetOpacity},
    {"img-opacity", &CompSetImgOpacity},

    /* transform */
    {"translateX", &CompSetTranslateX},
    {"translateY", &CompSetTranslateY},
    {"scale", &CompSetScale},
    {"rotate", &CompSetRotate},
    {"img-scale", &CompSetImgScale},
    {"img-rotate", &CompSetImgRotate},

    /* color */
    {"text-color", &CompSetTextColor}
};

std::unordered_map<std::string, lv_anim_path_cb_t> transition_funcs = {
    { "linear", &lv_anim_path_linear },
    { "ease-in", &lv_anim_path_ease_in },
    { "ease-out", &lv_anim_path_ease_out },
    { "ease-in-out", &lv_anim_path_ease_in_out },
    { "overshoot", &lv_anim_path_overshoot },
    { "bounce", &lv_anim_path_bounce },
    { "step", &lv_anim_path_step },
};