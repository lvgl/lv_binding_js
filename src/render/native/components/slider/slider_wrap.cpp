#include "slider.hpp"

static JSClassID SliderClassID;

WRAPPED_JS_SETSTYLE(Slider, "Slider")
WRAPPED_JS_AddEventListener(Slider, "Slider")
WRAPPED_JS_Align(Slider, "Slider")
WRAPPED_JS_Align_To(Slider, "Slider")
STYLE_INFO(Slider, "Slider")
WRAPPED_JS_BACKGROUND_IMAGE(Slider,"Slider")
WRAPPED_MOVE_TO_FRONT(Slider, "Slider")
WRAPPED_MOVE_TO_BACKGROUND(Slider, "Slider")
WRAPPED_SCROLL_INTO_VIEW(Slider, "Slider")
WRAPPED_JS_CLOSE_COMPONENT(Slider, "Slider")

static JSValue NativeCompSetRange(JSContext *ctx, JSValueConst this_val, int argc, JSValueConst *argv) {
    if (argc >= 1 && JS_IsArray(ctx, argv[0])) {
        COMP_REF* ref = (COMP_REF*)JS_GetOpaque3(this_val);
        int32_t min;
        int32_t max;
        JSValue min_value = JS_GetPropertyUint32(ctx, argv[0], 0);
        JSValue max_value = JS_GetPropertyUint32(ctx, argv[0], 1);

        JS_ToInt32(ctx, &min, min_value);
        JS_ToInt32(ctx, &max, max_value);
        
        ((Slider*)(ref->comp))->setRange(min, max);
        LV_LOG_USER("Slider %s set range", ref->uid);
    }
    return JS_UNDEFINED;
};

static JSValue NativeCompSetValue(JSContext *ctx, JSValueConst this_val, int argc, JSValueConst *argv) {
    if (argc >= 1 && JS_IsNumber(argv[0])) {
        COMP_REF* ref = (COMP_REF*)JS_GetOpaque3(this_val);
        int32_t value;
        JS_ToInt32(ctx, &value, argv[0]);
        
        ((Slider*)(ref->comp))->setValue(value);
        LV_LOG_USER("Slider %s set value", ref->uid);
    }
    return JS_UNDEFINED;
};

static const JSCFunctionListEntry ComponentProtoFuncs[] = {
    SJS_CFUNC_DEF("nativeSetStyle", 0, NativeCompSetStyle),
    SJS_CFUNC_DEF("addEventListener", 0, NativeCompAddEventListener),
    SJS_CFUNC_DEF("setRange", 0, NativeCompSetRange),
    SJS_CFUNC_DEF("setValue", 0, NativeCompSetValue),
    SJS_CFUNC_DEF("align", 0, NativeCompSetAlign),
    SJS_CFUNC_DEF("alignTo", 0, NativeCompSetAlignTo),
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

static JSValue SliderConstructor(JSContext *ctx, JSValueConst new_target, int argc, JSValueConst *argv) {
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
        proto = JS_GetClassProto(ctx, SliderClassID);
    } else {
        proto = JS_GetPropertyStr(ctx, new_target, "prototype");
        if (JS_IsException(proto))
            goto fail;
    }

    obj = JS_NewObjectProtoClass(ctx, proto, SliderClassID);
    JS_FreeValue(ctx, proto);
    if (JS_IsException(obj))
        goto fail;
    s = (COMP_REF*)js_mallocz(ctx, sizeof(*s));
    s->uid = uid;
    s->comp = new Slider(uid, NULL);

    JS_FreeCString(ctx, uid);

    if (!s)
        goto fail;

    JS_SetOpaque(obj, s);
    LV_LOG_USER("Slider %s created", uid);
    return obj;
 fail:
    JS_FreeValue(ctx, obj);
    return JS_EXCEPTION;
};

static void SliderFinalizer(JSRuntime *rt, JSValue val) {
    COMP_REF *th = (COMP_REF *)JS_GetOpaque(val, SliderClassID);
    LV_LOG_USER("Slider %s release", th->uid);
    if (th) {
        delete static_cast<Slider*>(th->comp);
        free(th);
    }
};

static JSClassDef SliderClass = {
    .class_name = "Slider",
    .finalizer = SliderFinalizer,
};

void NativeComponentSliderInit (JSContext* ctx, JSValue ns) {
    JS_NewClassID(&SliderClassID);
    JS_NewClass(JS_GetRuntime(ctx), SliderClassID, &SliderClass);
    JSValue proto = JS_NewObject(ctx);
    JS_SetPropertyFunctionList(ctx, proto, ComponentProtoFuncs, countof(ComponentProtoFuncs));
    JS_SetClassProto(ctx, SliderClassID, proto);

    JSValue obj = JS_NewCFunction2(ctx, SliderConstructor, "Slider", 1, JS_CFUNC_constructor, 0);
    JS_SetConstructor(ctx, obj, proto);
    JS_SetPropertyFunctionList(ctx, obj, ComponentClassFuncs, countof(ComponentClassFuncs));
    JS_DefinePropertyValueStr(ctx, ns, "Slider", obj, JS_PROP_C_W_E);
};

