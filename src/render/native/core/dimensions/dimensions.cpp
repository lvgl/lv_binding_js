#include "./dimensions.hpp"
#include "src/core/lv_disp.h"

static JSValue NativeCompGetDimensions(JSContext* ctx, JSValueConst this_val) {
    uint32_t width, height;
    lv_disp_t* disp_default = lv_disp_get_default();

    width = lv_disp_get_hor_res(disp_default);
    height = lv_disp_get_hor_res(disp_default);

    JSValue obj = JS_NewObject(ctx);
    JS_SetPropertyStr(ctx, obj, "width", JS_NewInt32(ctx, width));
    JS_SetPropertyStr(ctx, obj, "height", JS_NewInt32(ctx, height));

    return obj;
};

static const JSCFunctionListEntry dimensions_funcs[] = {
    SJS_CGETSET_DEF("window", NativeCompGetDimensions, NULL),
};

void NativeDimensionsInit (JSContext* ctx, JSValue& ns) {
    JSValue obj = JS_NewObject(ctx);
    JS_SetPropertyStr(ctx, ns, "dimensions", obj);
    JS_SetPropertyFunctionList(ctx, obj, dimensions_funcs, countof(dimensions_funcs));
};
