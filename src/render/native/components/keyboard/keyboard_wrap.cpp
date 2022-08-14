#include "keyboard.hpp"

static JSClassID keyboardClassID;

WRAPPED_JS_SETSTYLE(keyboard, "keyboard")
WRAPPED_JS_AddEventListener(keyboard, "keyboard")
WRAPPED_JS_Align(keyboard, "keyboard")
WRAPPED_JS_Align_To(keyboard, "keyboard")
STYLE_INFO(keyboard, "keyboard")

static JSValue NativeCompSetOneLine(JSContext *ctx, JSValueConst this_val, int argc, JSValueConst *argv) {
    if (argc >= 1 && JS_IsBool(argv[0])) {
        COMP_REF* ref = (COMP_REF*)JS_GetOpaque(this_val, keyboardClassID);
        bool payload = JS_ToBool(ctx, argv[0]);
        
        ((keyboard*)(ref->comp))->setOneLine(payload);
        LV_LOG_USER("keyboard %s setOneLine %d", ref->uid, payload);
    }
    return JS_UNDEFINED;
};

static JSValue NativeCompSetText(JSContext *ctx, JSValueConst this_val, int argc, JSValueConst *argv) {
    if (argc >= 1 && JS_IsString(argv[0])) {
        COMP_REF* ref = (COMP_REF*)JS_GetOpaque(this_val, keyboardClassID);
        size_t len;
        const char* str = JS_ToCStringLen(ctx, &len, argv[0]);
        std::string s = str;
        s.resize(len);
        
        ((keyboard*)(ref->comp))->setText(s);
        LV_LOG_USER("keyboard %s setOneLine %d", ref->uid, s.c_str());
        JS_FreeCString(ctx, str);
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
};

static const JSCFunctionListEntry ComponentClassFuncs[] = {
};

static JSValue keyboardConstructor(JSContext *ctx, JSValueConst new_target, int argc, JSValueConst *argv) {
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
        proto = JS_GetClassProto(ctx, keyboardClassID);
    } else {
        proto = JS_GetPropertyStr(ctx, new_target, "prototype");
        if (JS_IsException(proto))
            goto fail;
    }

    obj = JS_NewObjectProtoClass(ctx, proto, keyboardClassID);
    JS_FreeValue(ctx, proto);
    if (JS_IsException(obj))
        goto fail;
    s = (COMP_REF*)js_mallocz(ctx, sizeof(*s));
    s->uid = uid;
    s->comp = new keyboard(uid, NULL);

    JS_FreeCString(ctx, uid);

    if (!s)
        goto fail;

    JS_SetOpaque(obj, s);
    LV_LOG_USER("keyboard %s created", uid);
    return obj;
 fail:
    JS_FreeValue(ctx, obj);
    return JS_EXCEPTION;
};

static void keyboardFinalizer(JSRuntime *rt, JSValue val) {
    COMP_REF *th = (COMP_REF *)JS_GetOpaque(val, keyboardClassID);
    LV_LOG_USER("keyboard %s release", th->uid);
    if (th) {
        delete static_cast<keyboard*>(th->comp);
        free(th);
    }
};

static JSClassDef keyboardClass = {
    "keyboard",
    .finalizer = keyboardFinalizer,
};

void NativeComponentkeyboardInit (JSContext* ctx, JSValue ns) {
    JS_NewClassID(&keyboardClassID);
    JS_NewClass(JS_GetRuntime(ctx), keyboardClassID, &keyboardClass);
    JSValue proto = JS_NewObject(ctx);
    JS_SetPropertyFunctionList(ctx, proto, ComponentProtoFuncs, countof(ComponentProtoFuncs));
    JS_SetClassProto(ctx, keyboardClassID, proto);

    JSValue obj = JS_NewCFunction2(ctx, keyboardConstructor, "keyboard", 1, JS_CFUNC_constructor, 0);
    JS_SetConstructor(ctx, obj, proto);
    JS_SetPropertyFunctionList(ctx, obj, ComponentClassFuncs, countof(ComponentClassFuncs));
    JS_DefinePropertyValueStr(ctx, ns, "keyboard", obj, JS_PROP_C_W_E);
};

