#include "switch.hpp"

static JSClassID SwitchClassID;

WRAPPED_JS_SETSTYLE(Switch, "Switch")
WRAPPED_JS_AddEventListener(Switch, "Switch")
WRAPPED_JS_Align(Switch, "Switch")
WRAPPED_JS_Align_To(Switch, "Switch")
STYLE_INFO(Switch, "Switch")
WRAPPED_JS_BACKGROUND_IMAGE(Switch,"Switch")
WRAPPED_MOVE_TO_FRONT(Switch, "Switch")
WRAPPED_MOVE_TO_BACKGROUND(Switch, "Switch")
WRAPPED_SCROLL_INTO_VIEW(Switch, "Switch")
WRAPPED_JS_CLOSE_COMPONENT(Switch, "Switch")

static JSValue NativeCompRemoveChild(JSContext *ctx, JSValueConst this_val, int argc, JSValueConst *argv) {
    if (argc >= 1 && JS_IsObject(argv[0])) {
        COMP_REF* child = (COMP_REF*)JS_GetOpaque3(argv[0]);
        COMP_REF* parent = (COMP_REF*)JS_GetOpaque(this_val, SwitchClassID);
        
        ((Switch*)(parent->comp))->removeChild((void*)(child->comp));
        LV_LOG_USER("Switch %s remove child %s", parent->uid, child->uid);
    }
    return JS_UNDEFINED;
};

static JSValue NativeCompAppendChild(JSContext *ctx, JSValueConst this_val, int argc, JSValueConst *argv) {
    if (argc >= 1 && JS_IsObject(argv[0])) {
        COMP_REF* child = (COMP_REF*)JS_GetOpaque3(argv[0]);
        COMP_REF* parent = (COMP_REF*)JS_GetOpaque(this_val, SwitchClassID);
        
        ((Switch*)(parent->comp))->appendChild((void*)(child->comp));
        LV_LOG_USER("Switch %s append child %s", parent->uid, child->uid);
    }
    return JS_UNDEFINED;
};

static JSValue NativeCompSetChecked(JSContext *ctx, JSValueConst this_val, int argc, JSValueConst *argv) {
    if (argc >= 1 && JS_IsBool(argv[0])) {
        COMP_REF* ref = (COMP_REF*)JS_GetOpaque3(this_val);
        bool value;
        value = JS_ToBool(ctx, argv[0]);
        
        ((Switch*)(ref->comp))->setValue(value);
        LV_LOG_USER("Switch %s set value", ref->uid);
    }
    return JS_UNDEFINED;
};

static JSValue NativeCompSetDisabled(JSContext *ctx, JSValueConst this_val, int argc, JSValueConst *argv) {
    if (argc >= 1 && JS_IsBool(argv[0])) {
        COMP_REF* ref = (COMP_REF*)JS_GetOpaque3(this_val);
        bool value;
        value = JS_ToBool(ctx, argv[0]);
        
        ((Switch*)(ref->comp))->setDisabled(value);
        LV_LOG_USER("Switch %s setDisabled", ref->uid);
    }
    return JS_UNDEFINED;
};

static const JSCFunctionListEntry ComponentProtoFuncs[] = {
    SJS_CFUNC_DEF("nativeSetStyle", 0, NativeCompSetStyle),
    SJS_CFUNC_DEF("addEventListener", 0, NativeCompAddEventListener),
    SJS_CFUNC_DEF("align", 0, NativeCompSetAlign),
    SJS_CFUNC_DEF("alignTo", 0, NativeCompSetAlignTo),
    SJS_CFUNC_DEF("setChecked", 0, NativeCompSetChecked),
    SJS_CFUNC_DEF("setDisabled", 0, NativeCompSetDisabled),
    SJS_OBJECT_DEF("style", style_funcs, countof(style_funcs)),
    SJS_CFUNC_DEF("getBoundingClientRect", 0, GetStyleBoundClinetRect),
    SJS_CFUNC_DEF("setBackgroundImage", 0, NativeCompSetBackgroundImage),
    SJS_CFUNC_DEF("moveToFront", 0, NativeCompMoveToFront),
    SJS_CFUNC_DEF("moveToBackground", 0, NativeCompMoveToBackground),
    SJS_CFUNC_DEF("scrollIntoView", 0, NativeCompScrollIntoView),
    SJS_CFUNC_DEF("close", 0, NativeCompCloseComponent),
};

static const JSCFunctionListEntry ComponentClassFuncs[] = {
};

static JSValue SwitchConstructor(JSContext *ctx, JSValueConst new_target, int argc, JSValueConst *argv) {
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
        proto = JS_GetClassProto(ctx, SwitchClassID);
    } else {
        proto = JS_GetPropertyStr(ctx, new_target, "prototype");
        if (JS_IsException(proto))
            goto fail;
    }

    obj = JS_NewObjectProtoClass(ctx, proto, SwitchClassID);
    JS_FreeValue(ctx, proto);
    if (JS_IsException(obj))
        goto fail;
    s = (COMP_REF*)js_mallocz(ctx, sizeof(*s));
    s->uid = uid;
    s->comp = new Switch(uid, NULL);

    JS_FreeCString(ctx, uid);

    if (!s)
        goto fail;

    JS_SetOpaque(obj, s);
    LV_LOG_USER("Switch %s created", uid);
    return obj;
 fail:
    JS_FreeValue(ctx, obj);
    return JS_EXCEPTION;
};

static void ViewFinalizer(JSRuntime *rt, JSValue val) {
    COMP_REF *th = (COMP_REF *)JS_GetOpaque(val, SwitchClassID);
    LV_LOG_USER("Switch %s release", th->uid);
    if (th) {
        delete static_cast<Switch*>(th->comp);
        js_free_rt(rt, th);
    }
};

static JSClassDef ViewClass = {
    .class_name = "Switch",
    .finalizer = ViewFinalizer,
};

void NativeComponentSwitchInit (JSContext* ctx, JSValue ns) {
    JS_NewClassID(JS_GetRuntime(ctx), &SwitchClassID);
    JS_NewClass(JS_GetRuntime(ctx), SwitchClassID, &ViewClass);
    JSValue proto = JS_NewObject(ctx);
    JS_SetPropertyFunctionList(ctx, proto, ComponentProtoFuncs, countof(ComponentProtoFuncs));
    JS_SetClassProto(ctx, SwitchClassID, proto);

    JSValue obj = JS_NewCFunction2(ctx, SwitchConstructor, "Switch", 1, JS_CFUNC_constructor, 0);
    JS_SetConstructor(ctx, obj, proto);
    JS_SetPropertyFunctionList(ctx, obj, ComponentClassFuncs, countof(ComponentClassFuncs));
    JS_DefinePropertyValueStr(ctx, ns, "Switch", obj, JS_PROP_C_W_E);
};

