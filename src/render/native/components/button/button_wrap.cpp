#include "button.hpp"

static JSClassID ButtonClassID;

WRAPPED_JS_SETSTYLE(Button, "Button")
WRAPPED_JS_AddEventListener(Button, "Button")
WRAPPED_JS_Align(Button, "Button")
WRAPPED_JS_Align_To(Button, "Button")
STYLE_INFO(Button, "Button")
WRAPPED_JS_BACKGROUND_IMAGE(Button,"Button")
WRAPPED_APPEND_CHILD(Button,"Button")
WRAPPED_REMOVE_CHILD(Button,"Button")
WRAPPED_INSERT_CHILD(Button,"Button")
WRAPPED_MOVE_TO_FRONT(Button, "Button")
WRAPPED_MOVE_TO_BACKGROUND(Button, "Button")
WRAPPED_SCROLL_INTO_VIEW(Button, "Button")
WRAPPED_JS_CLOSE_COMPONENT(Button, "Button")

static const JSCFunctionListEntry ComponentProtoFuncs[] = {
    TJS_CFUNC_DEF("nativeSetStyle", 0, NativeCompSetStyle),
    TJS_CFUNC_DEF("addEventListener", 0, NativeCompAddEventListener),
    TJS_CFUNC_DEF("removeChild", 0, NativeCompRemoveChild),
    TJS_CFUNC_DEF("appendChild", 0, NativeCompAppendChild),
    TJS_CFUNC_DEF("insertChildBefore", 0, NativeCompInsertChildBefore),
    TJS_CFUNC_DEF("align", 0, NativeCompSetAlign),
    TJS_CFUNC_DEF("alignTo", 0, NativeCompSetAlignTo),
    TJS_CFUNC_DEF("getBoundingClientRect", 0, GetStyleBoundClinetRect),
    JS_OBJECT_DEF("style", style_funcs, countof(style_funcs), JS_PROP_WRITABLE | JS_PROP_CONFIGURABLE),
    TJS_CFUNC_DEF("setBackgroundImage", 0, NativeCompSetBackgroundImage),
    TJS_CFUNC_DEF("moveToFront", 0, NativeCompMoveToFront),
    TJS_CFUNC_DEF("moveToBackground", 0, NativeCompMoveToBackground),
    TJS_CFUNC_DEF("scrollIntoView", 0, NativeCompScrollIntoView),
    TJS_CFUNC_DEF("close", 0, NativeCompCloseComponent),
};

static const JSCFunctionListEntry ComponentClassFuncs[] = {
};

static JSValue ButtonConstructor(JSContext *ctx, JSValueConst new_target, int argc, JSValueConst *argv) {
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
        proto = JS_GetClassProto(ctx, ButtonClassID);
    } else {
        proto = JS_GetPropertyStr(ctx, new_target, "prototype");
        if (JS_IsException(proto))
            goto fail;
    }

    obj = JS_NewObjectProtoClass(ctx, proto, ButtonClassID);
    JS_FreeValue(ctx, proto);
    if (JS_IsException(obj))
        goto fail;
    s = (COMP_REF*)js_mallocz(ctx, sizeof(*s));
    s->uid = uid;
    s->comp = new Button(uid, NULL);

    JS_FreeCString(ctx, uid);

    if (!s)
        goto fail;

    JS_SetOpaque(obj, s);
    LV_LOG_USER("Button %s created", uid);
    return obj;
 fail:
    JS_FreeValue(ctx, obj);
    return JS_EXCEPTION;
};

static void ButtonFinalizer(JSRuntime *rt, JSValue val) {
    COMP_REF *th = (COMP_REF *)JS_GetOpaque(val, ButtonClassID);
    LV_LOG_USER("Button %s release", th->uid);
    if (th) {
        delete static_cast<Button*>(th->comp);
        js_free_rt(rt, th);
    }
};

static JSClassDef ButtonClass = {
    .class_name = "Button",
    .finalizer = ButtonFinalizer,
};

void NativeComponentButtonInit (JSContext* ctx, JSValue ns) {
    JS_NewClassID(JS_GetRuntime(ctx), &ButtonClassID);
    JS_NewClass(JS_GetRuntime(ctx), ButtonClassID, &ButtonClass);
    JSValue proto = JS_NewObject(ctx);
    JS_SetPropertyFunctionList(ctx, proto, ComponentProtoFuncs, countof(ComponentProtoFuncs));
    JS_SetClassProto(ctx, ButtonClassID, proto);

    JSValue obj = JS_NewCFunction2(ctx, ButtonConstructor, "Button", 1, JS_CFUNC_constructor, 0);
    JS_SetConstructor(ctx, obj, proto);
    JS_SetPropertyFunctionList(ctx, obj, ComponentClassFuncs, countof(ComponentClassFuncs));
    JS_DefinePropertyValueStr(ctx, ns, "Button", obj, JS_PROP_C_W_E);
};

