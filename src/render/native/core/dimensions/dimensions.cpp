#include "./dimensions.hpp"

static JSValue NativeCompGetDimensions(JSContext* ctx, JSValueConst this_val) {
    uint32_t width, height;
    lv_display_t* disp_default = lv_display_get_default();

    width = lv_display_get_horizontal_resolution(disp_default);
    height = lv_display_get_vertical_resolution(disp_default);

    JSValue obj = JS_NewObject(ctx);
    JS_SetPropertyStr(ctx, obj, "width", JS_NewInt32(ctx, width));
    JS_SetPropertyStr(ctx, obj, "height", JS_NewInt32(ctx, height));

    return obj;
};

static const JSCFunctionListEntry dimensions_funcs[] = {
    TJS_CGETSET_DEF("window", NativeCompGetDimensions, NULL),
};

void NativeDimensionsInit (JSContext* ctx, JSValue& ns) {
    JSValue obj = JS_NewObject(ctx);
    JS_SetPropertyStr(ctx, ns, "dimensions", obj);
    JS_SetPropertyFunctionList(ctx, obj, dimensions_funcs, countof(dimensions_funcs));
};