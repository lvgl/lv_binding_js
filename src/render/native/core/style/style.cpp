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
    std::string color = JS_ToCString(ctx, obj);
    size_t len;
    JS_ToCStringLen(ctx, &len, obj);
    color.resize(len);
    int color1 = std::stoi(color);

    lv_style_set_bg_color(style, lv_color_hex3(color1));
};

std::unordered_map<std::string, CompSetStyle*> StyleManager::styles {
    /* position */
    {"width", &CompSetWidth},
    {"height", &CompSetHeight},
    {"left", &CompSetX},
    {"top", &CompSetY},

    /* color */
    {"background-color", &CompSetY},
};