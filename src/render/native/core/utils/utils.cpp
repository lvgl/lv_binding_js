#include "./utils.hpp"

static JSValue NativeRenderRefreshScreen(JSContext *ctx, JSValueConst this_val, int argc, JSValueConst *argv) {
    lv_obj_invalidate(lv_scr_act());
    lv_obj_invalidate(lv_layer_top());
    lv_obj_invalidate(lv_layer_sys());

    lv_obj_update_layout(lv_scr_act());
    lv_obj_update_layout(lv_layer_top());
    lv_obj_update_layout(lv_layer_sys());

    lv_refr_now(NULL);

    LV_LOG_USER("Refresh Screen Now!");

    return JS_UNDEFINED;
};

static const JSCFunctionListEntry util_funcs[] = {
    SJS_CFUNC_DEF("refreshWindow", 0, NativeRenderRefreshScreen),
};

void NativeRenderUtilInit (JSContext* ctx, JSValue& ns) {
    JSValue obj = JS_NewObject(ctx);
    JS_SetPropertyStr(ctx, ns, "RenderUtil", obj);
    JS_SetPropertyFunctionList(ctx, obj, util_funcs, countof(util_funcs));
};