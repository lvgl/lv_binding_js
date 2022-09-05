#include "GIF.hpp"

static JSClassID GIFClassID;

WRAPPED_JS_SETSTYLE(GIF, "GIF")
WRAPPED_JS_AddEventListener(GIF, "GIF")
WRAPPED_JS_Align(GIF, "GIF")
WRAPPED_JS_Align_To(GIF, "GIF")
STYLE_INFO(GIF, "GIF")
WRAPPED_MOVE_TO_FRONT(GIF, "GIF")
WRAPPED_MOVE_TO_BACKGROUND(GIF, "GIF")
WRAPPED_SCROLL_INTO_VIEW(GIF, "GIF")

static JSValue NativeCompSetGIFBinary(JSContext *ctx, JSValueConst this_val, int argc, JSValueConst *argv) {
    if (argc >= 1 && JS_IsObject(argv[0])) {
        size_t size;
        uint8_t* buf = JS_GetArrayBuffer(ctx, &size, argv[0]);
        COMP_REF* s = (COMP_REF*)JS_GetOpaque(this_val, GIFClassID);
        JSValue byteLength = JS_GetPropertyStr(ctx, argv[0], "byteLength");
        int32_t GIF_bytelength;
        JS_ToInt32(ctx, &GIF_bytelength, byteLength);

        ((GIF*)(s->comp))->setGIFBinary(buf, static_cast<size_t>(GIF_bytelength));
        LV_LOG_USER("GIF %s setGIF", s->uid);

        return JS_NewBool(ctx, 1);
    fail:
        return JS_ThrowInternalError(ctx, "GIF setBinary fail");
    }
    return JS_UNDEFINED;
};

static const JSCFunctionListEntry ComponentProtoFuncs[] = {
    SJS_CFUNC_DEF("nativeSetStyle", 0, NativeCompSetStyle),
    SJS_CFUNC_DEF("addEventListener", 0, NativeCompAddEventListener),
    SJS_CFUNC_DEF("setGIFBinary", 0, NativeCompSetGIFBinary),
    SJS_CFUNC_DEF("align", 0, NativeCompSetAlign),
    SJS_CFUNC_DEF("alignTo", 0, NativeCompSetAlignTo),
    SJS_OBJECT_DEF("style", style_funcs, countof(style_funcs)),
    SJS_CFUNC_DEF("getBoundingClientRect", 0, GetStyleBoundClinetRect),
    SJS_CFUNC_DEF("moveToFront", 0, NativeCompMoveToFront),
    SJS_CFUNC_DEF("moveToBackground", 0, NativeCompMoveToBackground),
    SJS_CFUNC_DEF("scrollIntoView", 0, NativeCompScrollIntoView),
};

static const JSCFunctionListEntry ComponentClassFuncs[] = {
};

static JSValue GIFConstructor(JSContext *ctx, JSValueConst new_target, int argc, JSValueConst *argv) {
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
        proto = JS_GetClassProto(ctx, GIFClassID);
    } else {
        proto = JS_GetPropertyStr(ctx, new_target, "prototype");
        if (JS_IsException(proto))
            goto fail;
    }

    obj = JS_NewObjectProtoClass(ctx, proto, GIFClassID);
    JS_FreeValue(ctx, proto);
    if (JS_IsException(obj))
        goto fail;
    s = (COMP_REF*)js_mallocz(ctx, sizeof(*s));
    s->uid = uid;
    s->comp = new GIF(uid, NULL);

    JS_FreeCString(ctx, uid);

    if (!s)
        goto fail;

    JS_SetOpaque(obj, s);
    LV_LOG_USER("GIF %s created", uid);
    return obj;
 fail:
    JS_FreeValue(ctx, obj);
    return JS_EXCEPTION;
};

static void GIFFinalizer(JSRuntime *rt, JSValue val) {
    COMP_REF *th = (COMP_REF *)JS_GetOpaque(val, GIFClassID);
    LV_LOG_USER("GIF %s release", th->uid);
    if (th) {
        delete static_cast<GIF*>(th->comp);
        free(th);
    }
};

static JSClassDef GIFClass = {
    "GIF",
    .finalizer = GIFFinalizer,
};

void NativeComponentGIFInit (JSContext* ctx, JSValue ns) {
    JS_NewClassID(&GIFClassID);
    JS_NewClass(JS_GetRuntime(ctx), GIFClassID, &GIFClass);
    JSValue proto = JS_NewObject(ctx);
    JS_SetPropertyFunctionList(ctx, proto, ComponentProtoFuncs, countof(ComponentProtoFuncs));
    JS_SetClassProto(ctx, GIFClassID, proto);

    JSValue obj = JS_NewCFunction2(ctx, GIFConstructor, "GIF", 1, JS_CFUNC_constructor, 0);
    JS_SetConstructor(ctx, obj, proto);
    JS_SetPropertyFunctionList(ctx, obj, ComponentClassFuncs, countof(ComponentClassFuncs));
    JS_DefinePropertyValueStr(ctx, ns, "GIF", obj, JS_PROP_C_W_E);
};

