#include "Mask.hpp"

static JSClassID MaskClassID;

WRAPPED_JS_SETSTYLE(Mask, "Mask")
WRAPPED_JS_AddEventListener(Mask, "Mask")
STYLE_INFO(Mask, "Mask")
WRAPPED_APPEND_CHILD(Mask,"Mask")
WRAPPED_REMOVE_CHILD(Mask,"Mask")
WRAPPED_INSERT_CHILD(Mask,"Mask")
WRAPPED_JS_CLOSE_COMPONENT(Mask, "Mask")

static const JSCFunctionListEntry ComponentProtoFuncs[] = {
    SJS_CFUNC_DEF("nativeSetStyle", 0, NativeCompSetStyle),
    SJS_CFUNC_DEF("addEventListener", 0, NativeCompAddEventListener),
    SJS_CFUNC_DEF("removeChild", 0, NativeCompRemoveChild),
    SJS_CFUNC_DEF("appendChild", 0, NativeCompAppendChild),
    SJS_CFUNC_DEF("insertChildBefore", 0, NativeCompInsertChildBefore),
    SJS_CFUNC_DEF("getBoundingClientRect", 0, GetStyleBoundClinetRect),
    SJS_OBJECT_DEF("style", style_funcs, countof(style_funcs)),
    SJS_CFUNC_DEF("close", 0, NativeCompCloseComponent),
};

static const JSCFunctionListEntry ComponentClassFuncs[] = {
};

static JSValue MaskConstructor(JSContext *ctx, JSValueConst new_target, int argc, JSValueConst *argv) {
    JSValue proto;
    JSValue obj;
    JSValue arg;
    JSValue jsUid;
    const char* uid;

    COMP_REF *s;

    if (JS_IsObject(argv[0])) {
        arg = argv[0];
        jsUid = JS_GetPropertyStr(ctx, arg, "uid");
        if (JS_IsString(jsUid)) {
            uid = JS_ToCString(ctx, jsUid);
            JS_FreeValue(ctx, jsUid);
        }
    }

    if (JS_IsUndefined(new_target)) {
        proto = JS_GetClassProto(ctx, MaskClassID);
    } else {
        proto = JS_GetPropertyStr(ctx, new_target, "prototype");
        if (JS_IsException(proto))
            goto fail;
    }

    obj = JS_NewObjectProtoClass(ctx, proto, MaskClassID);
    JS_FreeValue(ctx, proto);
    if (JS_IsException(obj))
        goto fail;
    s = (COMP_REF*)js_mallocz(ctx, sizeof(*s));
    s->uid = uid;
    s->comp = new Mask(uid, NULL);

    JS_FreeCString(ctx, uid);

    if (!s)
        goto fail;

    JS_SetOpaque(obj, s);
    LV_LOG_USER("Mask %s created", uid);
    return obj;
 fail:
    JS_FreeValue(ctx, obj);
    return JS_EXCEPTION;
};

static void MaskFinalizer(JSRuntime *rt, JSValue val) {
    COMP_REF *th = (COMP_REF *)JS_GetOpaque(val, MaskClassID);
    LV_LOG_USER("Mask %s release", th->uid);
    if (th) {
        delete static_cast<Mask*>(th->comp);
        free(th);
    }
};

static JSClassDef MaskClass = {
    "Mask",
    .finalizer = MaskFinalizer,
};

void NativeComponentMaskInit (JSContext* ctx, JSValue ns) {
    JS_NewClassID(&MaskClassID);
    JS_NewClass(JS_GetRuntime(ctx), MaskClassID, &MaskClass);
    JSValue proto = JS_NewObject(ctx);
    JS_SetPropertyFunctionList(ctx, proto, ComponentProtoFuncs, countof(ComponentProtoFuncs));
    JS_SetClassProto(ctx, MaskClassID, proto);

    JSValue obj = JS_NewCFunction2(ctx, MaskConstructor, "Mask", 1, JS_CFUNC_constructor, 0);
    JS_SetConstructor(ctx, obj, proto);
    JS_SetPropertyFunctionList(ctx, obj, ComponentClassFuncs, countof(ComponentClassFuncs));
    JS_DefinePropertyValueStr(ctx, ns, "Mask", obj, JS_PROP_C_W_E);
};

