#include "progressbar.hpp"

static JSClassID ProgressBarClassID;

WRAPPED_JS_SETSTYLE(ProgressBar, "ProgressBar")
WRAPPED_JS_AddEventListener(ProgressBar, "ProgressBar")
WRAPPED_JS_Align(ProgressBar, "ProgressBar")
WRAPPED_JS_Align_To(ProgressBar, "ProgressBar")
STYLE_INFO(ProgressBar, "ProgressBar")
WRAPPED_JS_BACKGROUND_IMAGE(ProgressBar,"ProgressBar")
WRAPPED_MOVE_TO_FRONT(ProgressBar, "ProgressBar")
WRAPPED_MOVE_TO_BACKGROUND(ProgressBar, "ProgressBar")
WRAPPED_SCROLL_INTO_VIEW(ProgressBar, "ProgressBar")
WRAPPED_JS_CLOSE_COMPONENT(ProgressBar, "ProgressBar")

static JSValue NativeCompSetValue(JSContext *ctx, JSValueConst this_val, int argc, JSValueConst *argv) {
    if (argc >= 1 && JS_IsNumber(argv[0]) && JS_IsBool(argv[1])) {
        COMP_REF* ref = (COMP_REF*)JS_GetOpaque3(this_val);
        int32_t value;
        JS_ToInt32(ctx, &value, argv[0]);
        bool use_animation = JS_ToBool(ctx, argv[1]);

        ((ProgressBar*)(ref->comp))->setValue(value, use_animation);
        LV_LOG_USER("ProgressBar %s setValue", ref->uid);
    }
    return JS_UNDEFINED;
};

static JSValue NativeCompSetRange(JSContext *ctx, JSValueConst this_val, int argc, JSValueConst *argv) {
    if (argc >= 1 && JS_IsNumber(argv[0]) && JS_IsNumber(argv[1])) {
        COMP_REF* ref = (COMP_REF*)JS_GetOpaque3(this_val);
        int32_t start;
        JS_ToInt32(ctx, &start, argv[0]);
        int32_t end;
        JS_ToInt32(ctx, &end, argv[1]);

        ((ProgressBar*)(ref->comp))->setRange(start, end);
        LV_LOG_USER("ProgressBar %s setRange", ref->uid);
    }
    return JS_UNDEFINED;
};

static const JSCFunctionListEntry ComponentProtoFuncs[] = {
    SJS_CFUNC_DEF("nativeSetStyle", 0, NativeCompSetStyle),
    SJS_CFUNC_DEF("addEventListener", 0, NativeCompAddEventListener),
    SJS_CFUNC_DEF("align", 0, NativeCompSetAlign),
    SJS_CFUNC_DEF("alignTo", 0, NativeCompSetAlignTo),
    SJS_CFUNC_DEF("getBoundingClientRect", 0, GetStyleBoundClinetRect),
    SJS_OBJECT_DEF("style", style_funcs, countof(style_funcs)),
    SJS_CFUNC_DEF("setBackgroundImage", 0, NativeCompSetBackgroundImage),
    SJS_CFUNC_DEF("setValue", 0, NativeCompSetValue),
    SJS_CFUNC_DEF("setRange", 0, NativeCompSetRange),
    SJS_CFUNC_DEF("moveToFront", 0, NativeCompMoveToFront),
    SJS_CFUNC_DEF("moveToBackground", 0, NativeCompMoveToBackground),
    SJS_CFUNC_DEF("scrollIntoView", 0, NativeCompScrollIntoView),
    SJS_CFUNC_DEF("close", 0, NativeCompCloseComponent),
};

static const JSCFunctionListEntry ComponentClassFuncs[] = {
};

static JSValue ProgressBarConstructor(JSContext *ctx, JSValueConst new_target, int argc, JSValueConst *argv) {
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
        proto = JS_GetClassProto(ctx, ProgressBarClassID);
    } else {
        proto = JS_GetPropertyStr(ctx, new_target, "prototype");
        if (JS_IsException(proto))
            goto fail;
    }

    obj = JS_NewObjectProtoClass(ctx, proto, ProgressBarClassID);
    JS_FreeValue(ctx, proto);
    if (JS_IsException(obj))
        goto fail;
    s = (COMP_REF*)js_mallocz(ctx, sizeof(*s));
    s->uid = uid;
    s->comp = new ProgressBar(uid, NULL);

    JS_FreeCString(ctx, uid);

    if (!s)
        goto fail;

    JS_SetOpaque(obj, s);
    LV_LOG_USER("ProgressBar %s created", uid);
    return obj;
 fail:
    JS_FreeValue(ctx, obj);
    return JS_EXCEPTION;
};

static void ProgressBarFinalizer(JSRuntime *rt, JSValue val) {
    COMP_REF *th = (COMP_REF *)JS_GetOpaque(val, ProgressBarClassID);
    LV_LOG_USER("ProgressBar %s release", th->uid);
    if (th) {
        delete static_cast<ProgressBar*>(th->comp);
        free(th);
    }
};

static JSClassDef ProgressBarClass = {
    "ProgressBar",
    .finalizer = ProgressBarFinalizer,
};

void NativeComponentProgressBarInit (JSContext* ctx, JSValue ns) {
    JS_NewClassID(&ProgressBarClassID);
    JS_NewClass(JS_GetRuntime(ctx), ProgressBarClassID, &ProgressBarClass);
    JSValue proto = JS_NewObject(ctx);
    JS_SetPropertyFunctionList(ctx, proto, ComponentProtoFuncs, countof(ComponentProtoFuncs));
    JS_SetClassProto(ctx, ProgressBarClassID, proto);

    JSValue obj = JS_NewCFunction2(ctx, ProgressBarConstructor, "ProgressBar", 1, JS_CFUNC_constructor, 0);
    JS_SetConstructor(ctx, obj, proto);
    JS_SetPropertyFunctionList(ctx, obj, ComponentClassFuncs, countof(ComponentClassFuncs));
    JS_DefinePropertyValueStr(ctx, ns, "ProgressBar", obj, JS_PROP_C_W_E);
};

