#include "keyboard.hpp"

static JSClassID KeyboardClassID;

WRAPPED_JS_SETSTYLE(Keyboard, "Keyboard")
WRAPPED_JS_AddEventListener(Keyboard, "Keyboard")
WRAPPED_JS_Align(Keyboard, "Keyboard")
WRAPPED_JS_Align_To(Keyboard, "Keyboard")
STYLE_INFO(Keyboard, "Keyboard")
WRAPPED_MOVE_TO_FRONT(Keyboard, "Keyboard")
WRAPPED_MOVE_TO_BACKGROUND(Keyboard, "Keyboard")
WRAPPED_SCROLL_INTO_VIEW(Keyboard, "Keyboard")
WRAPPED_JS_CLOSE_COMPONENT(Keyboard, "Keyboard")

static JSValue NativeCompSetTextarea(JSContext *ctx, JSValueConst this_val, int argc, JSValueConst *argv) {
    if (argc >= 1 && JS_IsObject(argv[0])) {
        JSClassID _class_id;
        COMP_REF* child = (COMP_REF*)JS_GetAnyOpaque(argv[0], &_class_id);
        COMP_REF* parent = (COMP_REF*)JS_GetOpaque(this_val, KeyboardClassID);
        
        ((Keyboard*)(parent->comp))->setTextarea(static_cast<BasicComponent*>(child->comp));
        LV_LOG_USER("Keyboard %s setTextarea %s", parent->uid, child->uid);
    }
    return JS_UNDEFINED;
};

static JSValue NativeCompSetMode(JSContext *ctx, JSValueConst this_val, int argc, JSValueConst *argv) {
    if (argc >= 1 && JS_IsNumber(argv[0])) {
        COMP_REF* ref = (COMP_REF*)JS_GetOpaque(this_val, KeyboardClassID);
        int32_t mode;
        JS_ToInt32(ctx, &mode, argv[0]);
        
        ((Keyboard*)(ref->comp))->setMode(mode);
        LV_LOG_USER("Keyboard %s setMode %d", ref->uid, mode);
    }
    return JS_UNDEFINED;
};

static const JSCFunctionListEntry ComponentProtoFuncs[] = {
    SJS_CFUNC_DEF("nativeSetStyle", 0, NativeCompSetStyle),
    SJS_CFUNC_DEF("addEventListener", 0, NativeCompAddEventListener),
    SJS_CFUNC_DEF("align", 0, NativeCompSetAlign),
    SJS_CFUNC_DEF("alignTo", 0, NativeCompSetAlignTo),
    SJS_OBJECT_DEF("style", style_funcs, countof(style_funcs)),
    SJS_CFUNC_DEF("getBoundingClientRect", 0, GetStyleBoundClinetRect),
    SJS_CFUNC_DEF("setTextarea", 0, NativeCompSetTextarea),
    SJS_CFUNC_DEF("setMode", 0, NativeCompSetMode),
    SJS_CFUNC_DEF("moveToFront", 0, NativeCompMoveToFront),
    SJS_CFUNC_DEF("moveToBackground", 0, NativeCompMoveToBackground),
    SJS_CFUNC_DEF("scrollIntoView", 0, NativeCompScrollIntoView),
    SJS_CFUNC_DEF("close", 0, NativeCompCloseComponent),
};

static const JSCFunctionListEntry ComponentClassFuncs[] = {
};

static JSValue KeyboardConstructor(JSContext *ctx, JSValueConst new_target, int argc, JSValueConst *argv) {
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
        proto = JS_GetClassProto(ctx, KeyboardClassID);
    } else {
        proto = JS_GetPropertyStr(ctx, new_target, "prototype");
        if (JS_IsException(proto))
            goto fail;
    }

    obj = JS_NewObjectProtoClass(ctx, proto, KeyboardClassID);
    JS_FreeValue(ctx, proto);
    if (JS_IsException(obj))
        goto fail;
    s = (COMP_REF*)js_mallocz(ctx, sizeof(*s));
    s->uid = uid;
    s->comp = new Keyboard(uid, NULL);

    JS_FreeCString(ctx, uid);

    if (!s)
        goto fail;

    JS_SetOpaque(obj, s);
    LV_LOG_USER("Keyboard %s created", uid);
    return obj;
 fail:
    JS_FreeValue(ctx, obj);
    return JS_EXCEPTION;
};

static void KeyboardFinalizer(JSRuntime *rt, JSValue val) {
    COMP_REF *th = (COMP_REF *)JS_GetOpaque(val, KeyboardClassID);
    LV_LOG_USER("Keyboard %s release", th->uid);
    if (th) {
        delete static_cast<Keyboard*>(th->comp);
        js_free_rt(rt, th);
    }
};

static JSClassDef KeyboardClass = {
    .class_name = "Keyboard",
    .finalizer = KeyboardFinalizer,
};

void NativeComponentKeyboardInit (JSContext* ctx, JSValue ns) {
    JS_NewClassID(JS_GetRuntime(ctx), &KeyboardClassID);
    JS_NewClass(JS_GetRuntime(ctx), KeyboardClassID, &KeyboardClass);
    JSValue proto = JS_NewObject(ctx);
    JS_SetPropertyFunctionList(ctx, proto, ComponentProtoFuncs, countof(ComponentProtoFuncs));
    JS_SetClassProto(ctx, KeyboardClassID, proto);

    JSValue obj = JS_NewCFunction2(ctx, KeyboardConstructor, "Keyboard", 1, JS_CFUNC_constructor, 0);
    JS_SetConstructor(ctx, obj, proto);
    JS_SetPropertyFunctionList(ctx, obj, ComponentClassFuncs, countof(ComponentClassFuncs));
    JS_DefinePropertyValueStr(ctx, ns, "Keyboard", obj, JS_PROP_C_W_E);
};

