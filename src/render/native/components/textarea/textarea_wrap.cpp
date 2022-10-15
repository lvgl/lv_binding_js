#include "textarea.hpp"

static JSClassID TextareaClassID;

WRAPPED_JS_SETSTYLE(Textarea, "Textarea")
WRAPPED_JS_AddEventListener(Textarea, "Textarea")
WRAPPED_JS_Align(Textarea, "Textarea")
WRAPPED_JS_Align_To(Textarea, "Textarea")
STYLE_INFO(Textarea, "Textarea")
WRAPPED_MOVE_TO_FRONT(Textarea, "Textarea")
WRAPPED_MOVE_TO_BACKGROUND(Textarea, "Textarea")
WRAPPED_SCROLL_INTO_VIEW(Textarea, "Textarea")
WRAPPED_JS_CLOSE_COMPONENT(Textarea, "Textarea")

static JSValue NativeCompSetOneLine(JSContext *ctx, JSValueConst this_val, int argc, JSValueConst *argv) {
    if (argc >= 1 && JS_IsBool(argv[0])) {
        COMP_REF* ref = (COMP_REF*)JS_GetOpaque(this_val, TextareaClassID);
        bool payload = JS_ToBool(ctx, argv[0]);
        
        ((Textarea*)(ref->comp))->setOneLine(payload);
        LV_LOG_USER("Textarea %s setOneLine %d", ref->uid, payload);
    }
    return JS_UNDEFINED;
};

static JSValue NativeCompSetText(JSContext *ctx, JSValueConst this_val, int argc, JSValueConst *argv) {
    if (argc >= 1 && JS_IsString(argv[0])) {
        COMP_REF* ref = (COMP_REF*)JS_GetOpaque(this_val, TextareaClassID);
        size_t len;
        const char* str = JS_ToCStringLen(ctx, &len, argv[0]);
        std::string s = str;
        s.resize(len);
        
        ((Textarea*)(ref->comp))->setText(s);
        LV_LOG_USER("Textarea %s setText", ref->uid);
        JS_FreeCString(ctx, str);
    }
    return JS_UNDEFINED;
};

static JSValue NativeCompPlaceHolder(JSContext *ctx, JSValueConst this_val, int argc, JSValueConst *argv) {
    if (argc >= 1 && JS_IsString(argv[0])) {
        COMP_REF* ref = (COMP_REF*)JS_GetOpaque(this_val, TextareaClassID);
        size_t len;
        const char* str = JS_ToCStringLen(ctx, &len, argv[0]);
        std::string s = str;
        s.resize(len);
        
        ((Textarea*)(ref->comp))->setPlaceHolder(s);
        LV_LOG_USER("Textarea %s setPlaceHolder", ref->uid);
        JS_FreeCString(ctx, str);
    }
    return JS_UNDEFINED;
};

static JSValue NativeCompPasswordMode(JSContext *ctx, JSValueConst this_val, int argc, JSValueConst *argv) {
    if (argc >= 1 && JS_IsBool(argv[0])) {
        COMP_REF* ref = (COMP_REF*)JS_GetOpaque(this_val, TextareaClassID);
        bool payload = JS_ToBool(ctx, argv[0]);

        ((Textarea*)(ref->comp))->setPasswordMode(payload);
        LV_LOG_USER("Textarea %s setPasswordMode %d", ref->uid, payload);
    }
    return JS_UNDEFINED;
};

static JSValue NativeCompSetMaxLength(JSContext *ctx, JSValueConst this_val, int argc, JSValueConst *argv) {
    if (argc >= 1 && JS_IsNumber(argv[0])) {
        COMP_REF* ref = (COMP_REF*)JS_GetOpaque(this_val, TextareaClassID);
        int32_t len;
        JS_ToInt32(ctx, &len, argv[0]);

        ((Textarea*)(ref->comp))->setMaxLength(len);
        LV_LOG_USER("Textarea %s setMaxLength %d", ref->uid, len);
    }
    return JS_UNDEFINED;
};

static JSValue NativeCompSetAutoKeyboard (JSContext *ctx, JSValueConst this_val, int argc, JSValueConst *argv) {
    if (argc >= 1 && JS_IsBool(argv[0])) {
        COMP_REF* ref = (COMP_REF*)JS_GetOpaque(this_val, TextareaClassID);
        int32_t payload;
        JS_ToInt32(ctx, &payload, argv[0]);

        ((Textarea*)(ref->comp))->setAutoRaiseKeyboard(payload);
        LV_LOG_USER("Textarea %s setAutoRaiseKeyboard %d", ref->uid, payload);
    }
    return JS_UNDEFINED;
};

static const JSCFunctionListEntry ComponentProtoFuncs[] = {
    SJS_CFUNC_DEF("setAutoKeyboard", 0, NativeCompSetAutoKeyboard),
    SJS_CFUNC_DEF("nativeSetStyle", 0, NativeCompSetStyle),
    SJS_CFUNC_DEF("addEventListener", 0, NativeCompAddEventListener),
    SJS_CFUNC_DEF("align", 0, NativeCompSetAlign),
    SJS_CFUNC_DEF("alignTo", 0, NativeCompSetAlignTo),
    SJS_OBJECT_DEF("style", style_funcs, countof(style_funcs)),
    SJS_CFUNC_DEF("getBoundingClientRect", 0, GetStyleBoundClinetRect),
    SJS_CFUNC_DEF("setOneLine", 0, NativeCompSetOneLine),
    SJS_CFUNC_DEF("setText", 0, NativeCompSetText),
    SJS_CFUNC_DEF("setPlaceHolder", 0, NativeCompPlaceHolder),
    SJS_CFUNC_DEF("setPasswordMode", 0, NativeCompPasswordMode),
    SJS_CFUNC_DEF("setMaxLength", 0, NativeCompSetMaxLength),
    SJS_CFUNC_DEF("moveToFront", 0, NativeCompMoveToFront),
    SJS_CFUNC_DEF("moveToBackground", 0, NativeCompMoveToBackground),
    SJS_CFUNC_DEF("scrollIntoView", 0, NativeCompScrollIntoView),
    SJS_CFUNC_DEF("close", 0, NativeCompCloseComponent),
};

static const JSCFunctionListEntry ComponentClassFuncs[] = {
};

static JSValue TextareaConstructor(JSContext *ctx, JSValueConst new_target, int argc, JSValueConst *argv) {
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
        proto = JS_GetClassProto(ctx, TextareaClassID);
    } else {
        proto = JS_GetPropertyStr(ctx, new_target, "prototype");
        if (JS_IsException(proto))
            goto fail;
    }

    obj = JS_NewObjectProtoClass(ctx, proto, TextareaClassID);
    JS_FreeValue(ctx, proto);
    if (JS_IsException(obj))
        goto fail;
    s = (COMP_REF*)js_mallocz(ctx, sizeof(*s));
    s->uid = uid;
    s->comp = new Textarea(uid, NULL);

    JS_FreeCString(ctx, uid);

    if (!s)
        goto fail;

    JS_SetOpaque(obj, s);
    LV_LOG_USER("Textarea %s created", uid);
    return obj;
 fail:
    JS_FreeValue(ctx, obj);
    return JS_EXCEPTION;
};

static void TextareaFinalizer(JSRuntime *rt, JSValue val) {
    COMP_REF *th = (COMP_REF *)JS_GetOpaque(val, TextareaClassID);
    LV_LOG_USER("Textarea %s release", th->uid);
    if (th) {
        delete static_cast<Textarea*>(th->comp);
        free(th);
    }
};

static JSClassDef TextareaClass = {
    "Textarea",
    .finalizer = TextareaFinalizer,
};

void NativeComponentTextareaInit (JSContext* ctx, JSValue ns) {
    JS_NewClassID(&TextareaClassID);
    JS_NewClass(JS_GetRuntime(ctx), TextareaClassID, &TextareaClass);
    JSValue proto = JS_NewObject(ctx);
    JS_SetPropertyFunctionList(ctx, proto, ComponentProtoFuncs, countof(ComponentProtoFuncs));
    JS_SetClassProto(ctx, TextareaClassID, proto);

    JSValue obj = JS_NewCFunction2(ctx, TextareaConstructor, "Textarea", 1, JS_CFUNC_constructor, 0);
    JS_SetConstructor(ctx, obj, proto);
    JS_SetPropertyFunctionList(ctx, obj, ComponentClassFuncs, countof(ComponentClassFuncs));
    JS_DefinePropertyValueStr(ctx, ns, "Textarea", obj, JS_PROP_C_W_E);
};

