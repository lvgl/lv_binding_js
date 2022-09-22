#include "./utils.hpp"

static JSValue NativeRenderRefreshScreen(JSContext *ctx, JSValueConst this_val, int argc, JSValueConst *argv) {
    for(auto& desc : comp_map) {
        printf("%s \n", desc.second->uid.c_str());
        lv_obj_mark_layout_as_dirty(desc.second->instance);
        lv_obj_invalidate(desc.second->instance);
    }
    lv_obj_mark_layout_as_dirty(GetWindowInstance());
    lv_obj_update_layout(GetWindowInstance());

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