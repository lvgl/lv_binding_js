#include "style.hpp"

static void CompSetWidth (lv_obj_t* comp, lv_style_t* style, JSContext* ctx, JSValue obj) {
    int width;
    JS_ToInt32(ctx, &width, obj);
    lv_obj_set_width(comp, static_cast<int16_t>(width));
};

static void CompSetHeight (lv_obj_t* comp, lv_style_t* style, JSContext* ctx, JSValue obj) {
    int height;
    JS_ToInt32(ctx, &height, obj);
    lv_obj_set_height(comp, static_cast<int16_t>(height));
};

static void CompSetX (lv_obj_t* comp, lv_style_t* style, JSContext* ctx, JSValue obj) {
    int x;
    JS_ToInt32(ctx, &x, obj);
    lv_obj_set_x(comp, static_cast<int16_t>(x));
};

static void CompSetY (lv_obj_t* comp, lv_style_t* style, JSContext* ctx, JSValue obj) {
    int y;
    JS_ToInt32(ctx, &y, obj);
    lv_obj_set_y(comp, static_cast<int16_t>(y));
};

static void CompSetBackgroundColor (lv_obj_t* comp, lv_style_t* style, JSContext* ctx, JSValue obj) {
    const char* str = JS_ToCString(ctx, obj);
    std::string color = str;
    JS_FreeCString(ctx, str);
    size_t len;
    JS_ToCStringLen(ctx, &len, obj);
    color.resize(len);
    int color1 = std::stoi(color, nullptr, 16);

    lv_style_set_bg_color(style, lv_color_hex(color1));
};

static void CompSetBorderRadius (lv_obj_t* comp, lv_style_t* style, JSContext* ctx, JSValue obj) {
    int x;
    JS_ToInt32(ctx, &x, obj);

    lv_style_set_radius(style, x);
};

std::unordered_map<std::string, CompSetStyle*> StyleManager::styles {
    /* position */
    {"width", &CompSetWidth},
    {"height", &CompSetHeight},
    {"left", &CompSetX},
    {"top", &CompSetY},

    /* background */
    {"background-color", &CompSetBackgroundColor},

    /* border-radius */
    {"border-radius", &CompSetBorderRadius},

};