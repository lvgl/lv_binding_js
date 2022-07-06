#include "sjs.h"

JSValue SJSNewError(JSContext *ctx, int err) {
    JSValue obj;
    obj = JS_NewError(ctx);
    JS_DefinePropertyValueStr(ctx,
                              obj,
                              "message",
                              JS_NewString(ctx, uv_strerror(err)),
                              JS_PROP_WRITABLE | JS_PROP_CONFIGURABLE);
    JS_DefinePropertyValueStr(ctx, obj, "errno", JS_NewInt32(ctx, err), JS_PROP_WRITABLE | JS_PROP_CONFIGURABLE);
    return obj;
}

static JSValue SJSErrorConstructor(JSContext *ctx, JSValueConst new_target, int argc, JSValueConst *argv) {
    int err;
    if (JS_ToInt32(ctx, &err, argv[0]))
        return JS_EXCEPTION;
    return SJSNewError(ctx, err);
}

static JSValue SJSErrorStrerror(JSContext *ctx, JSValueConst this_val, int argc, JSValueConst *argv) {
    int err;
    if (JS_ToInt32(ctx, &err, argv[0]))
        return JS_EXCEPTION;
    return JS_NewString(ctx, uv_strerror(err));
}

JSValue SJSThrowErrno(JSContext *ctx, int err) {
    JSValue obj;
    obj = SJSNewError(ctx, err);
    if (JS_IsException(obj))
        obj = JS_NULL;
    return JS_Throw(ctx, obj);
}

static const JSCFunctionListEntry SJSErrorFuncs[] = { 
    SJS_CFUNC_DEF("strerror", 1, SJSErrorStrerror),
/* various errno values */
#define DEF(x, s) JS_PROP_INT32_DEF(#x, UV_##x, JS_PROP_C_W_E),
                                                        UV_ERRNO_MAP(DEF)
#undef DEF
};

void SJSErrorInit(JSContext *ctx, JSValue ns) {
    JSValue obj = JS_NewCFunction2(ctx, SJSErrorConstructor, "Error", 1, JS_CFUNC_constructor, 0);
    JS_SetPropertyFunctionList(ctx, obj, SJSErrorFuncs, countof(SJSErrorFuncs));
    JS_DefinePropertyValueStr(ctx, ns, "Error", obj, JS_PROP_C_W_E);
}
