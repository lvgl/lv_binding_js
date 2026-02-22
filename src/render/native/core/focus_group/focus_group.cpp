#include "focus_group.hpp"
#include "engine.hpp"

static JSValue js_edge_callback = JS_UNDEFINED;
static JSContext* stored_ctx = nullptr;

static void focus_group_edge_cb(lv_group_t* group, bool is_next) {
    if (stored_ctx == nullptr || JS_IsUndefined(js_edge_callback)) {
        return;
    }

    JSValue argv[1];
    argv[0] = JS_NewBool(stored_ctx, is_next);

    JSValue ret = JS_Call(stored_ctx, js_edge_callback, JS_NULL, 1, argv);
    if (JS_IsException(ret)) {
        TJSRuntime* qrt = GetRuntime();
        tjs_dump_error(qrt->ctx);
    }
    
    JS_FreeValue(stored_ctx, ret);
    JS_FreeValue(stored_ctx, argv[0]);
}

static JSValue NativeSetFocusGroupEdgeCallback(JSContext* ctx, JSValueConst this_val, int argc, JSValueConst* argv) {
    if (argc < 1) {
        return JS_UNDEFINED;
    }

    if (!JS_IsUndefined(js_edge_callback)) {
        JS_FreeValue(stored_ctx, js_edge_callback);
    }

    stored_ctx = ctx;

    if (JS_IsNull(argv[0]) || JS_IsUndefined(argv[0])) {
        js_edge_callback = JS_UNDEFINED;
        lv_group_t* def_group = lv_group_get_default();
        if (def_group) {
            lv_group_set_edge_cb(def_group, NULL);
        }
        return JS_UNDEFINED;
    }

    js_edge_callback = JS_DupValue(ctx, argv[0]);

    lv_group_t* def_group = lv_group_get_default();
    if (def_group) {
        lv_group_set_edge_cb(def_group, focus_group_edge_cb);
    }

    return JS_UNDEFINED;
}

static JSValue NativeSetFocusGroupWrap(JSContext* ctx, JSValueConst this_val, int argc, JSValueConst* argv) {
    if (argc < 1) {
        return JS_UNDEFINED;
    }

    bool wrap = JS_ToBool(ctx, argv[0]);
    lv_group_t* def_group = lv_group_get_default();
    if (def_group) {
        lv_group_set_wrap(def_group, wrap);
    }

    return JS_UNDEFINED;
}

static const JSCFunctionListEntry focus_group_funcs[] = {
    TJS_CFUNC_DEF("setEdgeCallback", 1, NativeSetFocusGroupEdgeCallback),
    TJS_CFUNC_DEF("setWrap", 1, NativeSetFocusGroupWrap),
};

void NativeFocusGroupInit(JSContext* ctx, JSValue& ns) {
    JSValue obj = JS_NewObject(ctx);
    JS_SetPropertyFunctionList(ctx, obj, focus_group_funcs, sizeof(focus_group_funcs) / sizeof(focus_group_funcs[0]));
    JS_SetPropertyStr(ctx, ns, "FocusGroup", obj);
}
