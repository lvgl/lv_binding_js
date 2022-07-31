#include "button.hpp"

static JSClassID ButtonClassID;

WRAPPED_JS_SETSTYLE(Button, "Button")
WRAPPED_JS_AddEventListener(Button, "Button")

static JSValue NativeCompRemoveChild(JSContext *ctx, JSValueConst this_val, int argc, JSValueConst *argv) {
    if (argc >= 1 && JS_IsObject(argv[0])) {
        COMP_REF* child = (COMP_REF*)JS_GetOpaque3(argv[0]);
        COMP_REF* parent = (COMP_REF*)JS_GetOpaque(this_val, ButtonClassID);
        
        ((Button*)(parent->comp))->removeChild((void*)(child->comp));
        LV_LOG_USER("Button %s remove child %s", parent->uid, child->uid);
    }
    return JS_UNDEFINED;
};

static JSValue NativeCompAppendChild(JSContext *ctx, JSValueConst this_val, int argc, JSValueConst *argv) {
    if (argc >= 1 && JS_IsObject(argv[0])) {
        COMP_REF* child = (COMP_REF*)JS_GetOpaque3(argv[0]);
        COMP_REF* parent = (COMP_REF*)JS_GetOpaque(this_val, ButtonClassID);
        
        ((Button*)(parent->comp))->appendChild((void*)(child->comp));
        LV_LOG_USER("Button %s append child %s", parent->uid, child->uid);
    }
    return JS_UNDEFINED;
};

static const JSCFunctionListEntry ComponentProtoFuncs[] = {
    SJS_CFUNC_DEF("setStyle", 0, NativeCompSetStyle),
    SJS_CFUNC_DEF("addEventListener", 0, NativeCompAddEventListener),
    SJS_CFUNC_DEF("removeChild", 0, NativeCompRemoveChild),
    SJS_CFUNC_DEF("appendChild", 0, NativeCompAppendChild),
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
        free(th);
    }
};

static JSClassDef ButtonClass = {
    "Button",
    .finalizer = ButtonFinalizer,
};

void NativeComponentButtonInit (JSContext* ctx, JSValue ns) {
    JS_NewClassID(&ButtonClassID);
    JS_NewClass(JS_GetRuntime(ctx), ButtonClassID, &ButtonClass);
    JSValue proto = JS_NewObject(ctx);
    JS_SetPropertyFunctionList(ctx, proto, ComponentProtoFuncs, countof(ComponentProtoFuncs));
    JS_SetClassProto(ctx, ButtonClassID, proto);

    JSValue obj = JS_NewCFunction2(ctx, ButtonConstructor, "Button", 1, JS_CFUNC_constructor, 0);
    JS_SetConstructor(ctx, obj, proto);
    JS_SetPropertyFunctionList(ctx, obj, ComponentClassFuncs, countof(ComponentClassFuncs));
    JS_DefinePropertyValueStr(ctx, ns, "Button", obj, JS_PROP_C_W_E);
};

