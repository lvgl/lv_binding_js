#include "./dimensions.hpp"

static JSValue NativeCompGetDimensions(JSContext *ctx, JSValueConst this_val, int argc, JSValueConst *argv) {
    uint32_t width, height;
    lv_disp_t* disp_default = lv_disp_get_default();

    width = disp_default->driver->hor_res;
    height = disp_default->driver->ver_res;

    JSValue obj = JS_NewObject(ctx);
    JS_SetPropertyStr(ctx, obj, "width", JS_NewInt32(ctx, width));
    JS_SetPropertyStr(ctx, obj, "height", JS_NewInt32(ctx, height));

    return obj;
};

static const JSCFunctionListEntry dimensions_funcs[] = {
    SJS_CGETSET_DEF("window", NativeCompGetDimensions, NULL),
};

void NativeDimensionsInit (JSContext* ctx, JSValue& ns) {
    JS_SetPropertyFunctionList(ctx, ns, dimensions_funcs, countof(dimensions_funcs));
};