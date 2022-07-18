#include "font.hpp"

static const lv_font_t builtin_font_list[] = {
    lv_font_montserrat_8,
    lv_font_montserrat_10,
    lv_font_montserrat_12,
    lv_font_montserrat_14,
    lv_font_montserrat_16,
    lv_font_montserrat_18,
    lv_font_montserrat_20,
    lv_font_montserrat_22,
    lv_font_montserrat_24,
    lv_font_montserrat_26,
    lv_font_montserrat_28,
    lv_font_montserrat_30,
    lv_font_montserrat_32,
    lv_font_montserrat_34,
    lv_font_montserrat_36,
    lv_font_montserrat_38,
    lv_font_montserrat_40,
    lv_font_montserrat_42,
    lv_font_montserrat_44,
    lv_font_montserrat_46,
    lv_font_montserrat_48,
};

void CompSetFontSize (lv_obj_t* comp, lv_style_t* style, JSContext* ctx, JSValue obj) {
    int x;
    JS_ToInt32(ctx, &x, obj);

    lv_obj_set_style_text_font(comp, &builtin_font_list[x], 0);
};