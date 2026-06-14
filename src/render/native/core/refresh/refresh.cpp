#include "./refresh.hpp"

#include "engine/hal/screenshot.hpp"
#include "native/core/basic/comp.hpp"

// bool cmp(std::pair<std::string, BasicComponent*>& l, std::pair<std::string, BasicComponent*>& r)
// {
//     if(l.first == r.first) return true;
// 	else if(l.first.length() != r.first.length()) return l.first.length() > r.first.length();
// 	else return l.first > r.first;
// };

static JSValue NativeRenderRefreshScreen(JSContext *ctx, JSValueConst this_val, int argc, JSValueConst *argv) {
    // std::vector<std::pair<std::string, BasicComponent*>> result(comp_map.begin(), comp_map.end());
    // sort(result.begin(), result.end(), cmp);

    for(auto& desc : comp_map) {
        printf("%s \n", desc.second->uid.c_str());
        lv_obj_mark_layout_as_dirty(desc.second->instance);
    }
    lv_obj_mark_layout_as_dirty(GetWindowInstance());

    lv_obj_update_layout(GetWindowInstance());

    lv_refr_now(NULL);

    LV_LOG_USER("Refresh Screen Now!");

    return JS_UNDEFINED;
};

static JSValue NativeRenderCaptureDisplay(JSContext *ctx, JSValueConst this_val, int argc, JSValueConst *argv) {
    if(argc < 1) {
        return JS_ThrowTypeError(ctx, "captureDisplay(path) requires a file path");
    }

    const char * path = JS_ToCString(ctx, argv[0]);
    if(!path) {
        return JS_EXCEPTION;
    }

    bool ok = hal_capture_display_png(path);
    JS_FreeCString(ctx, path);
    return JS_NewBool(ctx, ok);
}

static JSValue NativeRenderGetCompMapSize(JSContext *ctx, JSValueConst this_val, int argc, JSValueConst *argv) {
    return JS_NewUint32(ctx, static_cast<uint32_t>(comp_map.size()));
}

static const JSCFunctionListEntry util_funcs[] = {
    TJS_CFUNC_DEF("refreshWindow", 0, NativeRenderRefreshScreen),
    TJS_CFUNC_DEF("captureDisplay", 0, NativeRenderCaptureDisplay),
    TJS_CFUNC_DEF("getCompMapSize", 0, NativeRenderGetCompMapSize),
};

void NativeRenderUtilInit (JSContext* ctx, JSValue& ns) {
    JSValue obj = JS_NewObject(ctx);
    JS_SetPropertyStr(ctx, ns, "RenderUtil", obj);
    JS_SetPropertyFunctionList(ctx, obj, util_funcs, countof(util_funcs));
};