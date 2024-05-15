
#include "checkbox.hpp"
static JSClassID CheckboxClassID;

WRAPPED_JS_SETSTYLE(Checkbox, "Checkbox")
WRAPPED_JS_AddEventListener(Checkbox, "Checkbox")
WRAPPED_JS_Align(Checkbox, "Checkbox")
WRAPPED_JS_Align_To(Checkbox, "Checkbox")
STYLE_INFO(Checkbox, "Checkbox")
WRAPPED_JS_BACKGROUND_IMAGE(Checkbox,"Checkbox")
WRAPPED_MOVE_TO_FRONT(Checkbox, "Checkbox")
WRAPPED_MOVE_TO_BACKGROUND(Checkbox, "Checkbox")
WRAPPED_SCROLL_INTO_VIEW(Checkbox, "Checkbox")
WRAPPED_JS_CLOSE_COMPONENT(Checkbox, "Checkbox")

static JSValue NativeCompSetText(JSContext *ctx, JSValueConst this_val, int argc, JSValueConst *argv) {
    if (argc >= 1 && JS_IsString(argv[0])) {
        COMP_REF* ref = (COMP_REF*)JS_GetOpaque(this_val, CheckboxClassID);
        size_t len;
        const char* str = JS_ToCStringLen(ctx, &len, argv[0]);
        std::string s = str;
        s.resize(len);
        
        ((Checkbox*)(ref->comp))->setText(s);
        LV_LOG_USER("Checkbox %s setText", ref->uid);
        JS_FreeCString(ctx, str);
    }
    return JS_UNDEFINED;
};

static JSValue NativeCompSetChecked(JSContext *ctx, JSValueConst this_val, int argc, JSValueConst *argv) {
    if (argc >= 1 && JS_IsBool(argv[0])) {
        COMP_REF* ref = (COMP_REF*)JS_GetOpaque(this_val, CheckboxClassID);
        bool payload = JS_ToBool(ctx, argv[0]);
        
        ((Checkbox*)(ref->comp))->setChecked(payload);
        LV_LOG_USER("Checkbox %s setChecked %d", ref->uid, payload);
    }
    return JS_UNDEFINED;
};

static JSValue NativeCompSetDisabled(JSContext *ctx, JSValueConst this_val, int argc, JSValueConst *argv) {
    if (argc >= 1 && JS_IsBool(argv[0])) {
        COMP_REF* ref = (COMP_REF*)JS_GetOpaque(this_val, CheckboxClassID);
        bool payload = JS_ToBool(ctx, argv[0]);
        
        ((Checkbox*)(ref->comp))->setDisabled(payload);
        LV_LOG_USER("Checkbox %s setDisabled", ref->uid);
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
    SJS_CFUNC_DEF("setText", 0, NativeCompSetText),
    SJS_CFUNC_DEF("setChecked", 0, NativeCompSetChecked),
    SJS_CFUNC_DEF("setDisabled", 0, NativeCompSetDisabled),
    SJS_CFUNC_DEF("setBackgroundImage", 0, NativeCompSetBackgroundImage),
    SJS_CFUNC_DEF("moveToFront", 0, NativeCompMoveToFront),
    SJS_CFUNC_DEF("moveToBackground", 0, NativeCompMoveToBackground),
    SJS_CFUNC_DEF("scrollIntoView", 0, NativeCompScrollIntoView),
    SJS_CFUNC_DEF("close", 0, NativeCompCloseComponent),
};

static const JSCFunctionListEntry ComponentClassFuncs[] = {
};

static JSValue CheckboxConstructor(JSContext *ctx, JSValueConst new_target, int argc, JSValueConst *argv) {
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
        proto = JS_GetClassProto(ctx, CheckboxClassID);
    } else {
        proto = JS_GetPropertyStr(ctx, new_target, "prototype");
        if (JS_IsException(proto))
            goto fail;
    }

    obj = JS_NewObjectProtoClass(ctx, proto, CheckboxClassID);
    JS_FreeValue(ctx, proto);
    if (JS_IsException(obj))
        goto fail;
    s = (COMP_REF*)js_mallocz(ctx, sizeof(*s));
    s->uid = uid;
    s->comp = new Checkbox(uid, NULL);

    JS_FreeCString(ctx, uid);

    if (!s)
        goto fail;

    JS_SetOpaque(obj, s);
    LV_LOG_USER("Checkbox %s created", uid);
    return obj;
 fail:
    JS_FreeValue(ctx, obj);
    return JS_EXCEPTION;
};

static void CheckboxFinalizer(JSRuntime *rt, JSValue val) {
    COMP_REF *th = (COMP_REF *)JS_GetOpaque(val, CheckboxClassID);
    LV_LOG_USER("Checkbox %s release", th->uid);
    if (th) {
        delete static_cast<Checkbox*>(th->comp);
        js_free_rt(rt, th);
    }
};

static JSClassDef CheckboxClass = {
    .class_name = "Checkbox",
    .finalizer = CheckboxFinalizer,
};

void NativeComponentCheckboxInit (JSContext* ctx, JSValue ns) {
    JS_NewClassID(&CheckboxClassID);
    JS_NewClass(JS_GetRuntime(ctx), CheckboxClassID, &CheckboxClass);
    JSValue proto = JS_NewObject(ctx);
    JS_SetPropertyFunctionList(ctx, proto, ComponentProtoFuncs, countof(ComponentProtoFuncs));
    JS_SetClassProto(ctx, CheckboxClassID, proto);

    JSValue obj = JS_NewCFunction2(ctx, CheckboxConstructor, "Checkbox", 1, JS_CFUNC_constructor, 0);
    JS_SetConstructor(ctx, obj, proto);
    JS_SetPropertyFunctionList(ctx, obj, ComponentClassFuncs, countof(ComponentClassFuncs));
    JS_DefinePropertyValueStr(ctx, ns, "Checkbox", obj, JS_PROP_C_W_E);
};

