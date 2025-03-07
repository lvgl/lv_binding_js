#include "./theme.hpp"

static void ThemeDefaultInit () {
    if (theme_default == NULL) {
        theme_default = lv_theme_default_get();
    }
};

static JSValue SetTheme(JSContext* ctx, JSValueConst this_val, int argc, JSValueConst* argv) {
    ThemeDefaultInit();

    JSValue primary_color_value = JS_GetPropertyStr(ctx, argv[0], "primaryColor");
    JSValue second_primary_value = JS_GetPropertyStr(ctx, argv[0], "secondPrimaryValue");
    JSValue font_size_value = JS_GetPropertyStr(ctx, argv[0], "fontSize");

    int primary_color_ori, second_primary_ori, font_size_ori;
    lv_color_t primary_color, second_primary;
    const lv_font_t* font_size;

    if (JS_IsUndefined(primary_color_value)) {
        primary_color = lv_theme_get_color_primary(NULL);
    } else {
        JS_ToInt32(ctx, &primary_color_ori, primary_color_value);
        primary_color = lv_color_hex(primary_color_ori);
    }

    if (JS_IsUndefined(second_primary_value)) {
        second_primary = lv_theme_get_color_secondary(NULL);
    } else {
        JS_ToInt32(ctx, &second_primary_ori, second_primary_value);
        second_primary = lv_color_hex(second_primary_ori);
    }
    
    if (JS_IsUndefined(font_size_value)) {
        font_size = lv_theme_get_font_normal(NULL);
    } else {
        JS_ToInt32(ctx, &font_size_ori, font_size_value);
        font_size = &builtin_font_list[font_size_ori];
    }

    lv_theme_default_init(
        NULL, 
        primary_color, 
        second_primary, 
        LV_THEME_DEFAULT_DARK, 
        font_size
    );

    return JS_UNDEFINED;
};

static JSValue ResetTheme(JSContext* ctx, JSValueConst this_val, int argc, JSValueConst* argv) {
    ThemeDefaultInit();

    lv_theme_default_init(
        NULL, 
        lv_theme_get_color_primary(NULL),
        lv_theme_get_color_secondary(NULL),
        LV_THEME_DEFAULT_DARK, 
        lv_theme_get_font_normal(NULL)
    );
    return JS_UNDEFINED;
};

static const JSCFunctionListEntry theme_funcs[] = {
    TJS_CFUNC_DEF("setTheme", 1, SetTheme),
    TJS_CFUNC_DEF("resetTheme", 0, ResetTheme),
};

void NativeThemeInit (JSContext* ctx, JSValue& ns) {
    JSValue obj = JS_NewObject(ctx);
    JS_SetPropertyStr(ctx, ns, "theme", obj);
    JS_SetPropertyFunctionList(ctx, obj, theme_funcs, countof(theme_funcs));
};