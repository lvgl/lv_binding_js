#include "text.hpp"

static JSClassID TextClassID;

WRAPPED_JS_SETSTYLE(Text, "Text")
WRAPPED_JS_AddEventListener(Text, "Text")
WRAPPED_JS_Align(Text, "Text")
WRAPPED_JS_Align_To(Text, "Text")

static JSValue NativeCompSetText(JSContext *ctx, JSValueConst this_val, int argc, JSValueConst *argv) {
    if (argc >= 1 && JS_IsString(argv[0])) {
        size_t len;
        const char* ori_str = JS_ToCStringLen(ctx, &len, argv[0]);
        std::string str = ori_str;
        str.resize(len);
        COMP_REF* s = (COMP_REF*)JS_GetOpaque(this_val, TextClassID);
        ((Text*)(s->comp))->setText(str);
        JS_FreeCString(ctx, ori_str);
        LV_LOG_USER("Text %s setText\n", s->uid);
    }
};

static const JSCFunctionListEntry ComponentProtoFuncs[] = {
    SJS_CFUNC_DEF("nativeSetStyle", 0, NativeCompSetStyle),
    SJS_CFUNC_DEF("addEventListener", 0, NativeCompAddEventListener),
    SJS_CFUNC_DEF("setText", 0, NativeCompSetText),
    SJS_CFUNC_DEF("align", 0, NativeCompSetAlign),
    SJS_CFUNC_DEF("alignTo", 0, NativeCompSetAlignTo),
};

static const JSCFunctionListEntry ComponentClassFuncs[] = {

};

static JSValue TextConstructor(JSContext *ctx, JSValueConst new_target, int argc, JSValueConst *argv) {
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
        proto = JS_GetClassProto(ctx, TextClassID);
    } else {
        proto = JS_GetPropertyStr(ctx, new_target, "prototype");
        if (JS_IsException(proto))
            goto fail;
    }

    obj = JS_NewObjectProtoClass(ctx, proto, TextClassID);
    JS_FreeValue(ctx, proto);
    if (JS_IsException(obj))
        goto fail;
    s = (COMP_REF*)js_mallocz(ctx, sizeof(*s));
    s->uid = uid;
    s->comp = new Text(uid, NULL);

    JS_FreeCString(ctx, uid);

    if (!s)
        goto fail;

    JS_SetOpaque(obj, s);
    LV_LOG_USER("Text %s created", uid);
    return obj;
 fail:
    JS_FreeValue(ctx, obj);
    return JS_EXCEPTION;
};

static void TextFinalizer(JSRuntime *rt, JSValue val) {
    COMP_REF *th = (COMP_REF *)JS_GetOpaque(val, TextClassID);
    LV_LOG_USER("Text %s release", th->uid);
    if (th) {
        delete static_cast<Text*>(th->comp);
        free(th);
    }
};

static JSClassDef ViewClass = {
    "Text",
    .finalizer = TextFinalizer,
};

void NativeComponentTextInit (JSContext* ctx, JSValue ns) {
    JS_NewClassID(&TextClassID);
    JS_NewClass(JS_GetRuntime(ctx), TextClassID, &ViewClass);
    JSValue proto = JS_NewObject(ctx);
    JS_SetPropertyFunctionList(ctx, proto, ComponentProtoFuncs, countof(ComponentProtoFuncs));
    JS_SetClassProto(ctx, TextClassID, proto);

    JSValue obj = JS_NewCFunction2(ctx, TextConstructor, "Text", 1, JS_CFUNC_constructor, 0);
    JS_SetConstructor(ctx, obj, proto);
    JS_SetPropertyFunctionList(ctx, obj, ComponentClassFuncs, countof(ComponentClassFuncs));
    JS_DefinePropertyValueStr(ctx, ns, "Text", obj, JS_PROP_C_W_E);
};

