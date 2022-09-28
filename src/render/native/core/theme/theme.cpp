#include "./dimensions.hpp"

static JSValue SetTheme(JSContext* ctx, JSValueConst this_val, int argc, JSValueConst* argv) {
    JSValue primary_color_value = JS_GetPropertyStr(ctx, argv[0], "primaryColor");
    JSValue second_primary_value = JS_GetPropertyStr(ctx, argv[0], "secondPrimaryValue");
    JSValue font_size_value = JS_GetPropertyStr(ctx, argv[0], "fontSize");

    int primary_color, second_primary, font_size;

    JS_ToInt32(ctx, &primary_color, primary_color_value);
    JS_ToInt32(ctx, &second_primary, second_primary_value);
    JS_ToInt32(ctx, &font_size, font_size_value);

    // if(palette_secondary >= _LV_PALETTE_LAST) palette_secondary = 0;

    // lv_theme_default_init(NULL, lv_palette_main(*palette_primary), lv_palette_main(palette_secondary), LV_THEME_DEFAULT_DARK, font_normal);

    return JS_UNDEFINED;
};

static JSValue ResetTheme(JSContext* ctx, JSValueConst this_val, int argc, JSValueConst* argv) {

    return JS_UNDEFINED;
};

static const JSCFunctionListEntry theme_funcs[] = {
    SJS_CFUNC_DEF("setTheme", SetTheme, NULL),
    SJS_CFUNC_DEF("resetTheme", ResetTheme, NULL),
};

void NativeDimensionsInit (JSContext* ctx, JSValue& ns) {
    JSValue obj = JS_NewObject(ctx);
    JS_SetPropertyStr(ctx, ns, "theme", obj);
    JS_SetPropertyFunctionList(ctx, obj, theme_funcs, countof(theme_funcs));
};