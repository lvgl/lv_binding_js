#include "arc.hpp"

static JSClassID ArcClassID;

WRAPPED_JS_SETSTYLE(Arc, "Arc")
WRAPPED_JS_AddEventListener(Arc, "Arc")
WRAPPED_JS_Align(Arc, "Arc")
WRAPPED_JS_Align_To(Arc, "Arc")
STYLE_INFO(Arc, "Arc")
WRAPPED_JS_BACKGROUND_IMAGE(Arc,"Arc")
WRAPPED_INT32_VALUE(Arc, "Arc", StartAngle)
WRAPPED_INT32_VALUE(Arc, "Arc", EndAngle)
WRAPPED_INT32_VALUE(Arc, "Arc", BackgroundStartAngle)
WRAPPED_INT32_VALUE(Arc, "Arc", BackgroundEndAngle)
WRAPPED_INT32_VALUE(Arc, "Arc", Rotation)
WRAPPED_INT32_VALUE(Arc, "Arc", Mode)
WRAPPED_INT32_VALUE(Arc, "Arc", ChangeRate)
WRAPPED_MOVE_TO_FRONT(Arc, "Arc")
WRAPPED_MOVE_TO_BACKGROUND(Arc, "Arc")
WRAPPED_SCROLL_INTO_VIEW(Arc, "Arc")
WRAPPED_JS_CLOSE_COMPONENT(Arc, "Arc")

static JSValue NativeCompSetRange(JSContext *ctx, JSValueConst this_val, int argc, JSValueConst *argv) {
    if (argc >= 1 && JS_IsArray(ctx, argv[0])) {
        COMP_REF* ref = (COMP_REF*)JS_GetOpaque3(this_val);
        int32_t min;
        int32_t max;
        JSValue min_value = JS_GetPropertyUint32(ctx, argv[0], 0);
        JSValue max_value = JS_GetPropertyUint32(ctx, argv[0], 1);

        JS_ToInt32(ctx, &min, min_value);
        JS_ToInt32(ctx, &max, max_value);

        ((Arc*)(ref->comp))->setRange(min, max);
        LV_LOG_USER("Arc %s set range", ref->uid);
    }
    return JS_UNDEFINED;
};

static JSValue NativeCompSetValue(JSContext *ctx, JSValueConst this_val, int argc, JSValueConst *argv) {
    if (argc >= 1 && JS_IsNumber(argv[0])) {
        COMP_REF* ref = (COMP_REF*)JS_GetOpaque3(this_val);
        int32_t value;
        JS_ToInt32(ctx, &value, argv[0]);

        ((Arc*)(ref->comp))->setValue(value);
        LV_LOG_USER("Arc %s set value", ref->uid);
    }
    return JS_UNDEFINED;
};

static JSValue NativeCompSetArcImage(JSContext *ctx, JSValueConst this_val, int argc, JSValueConst *argv) {
  if (argc >= 1 && (JS_IsObject(argv[0]) || JS_IsNull(argv[0])) && JS_IsNumber(argv[1])) {
    COMP_REF* s = (COMP_REF*)JS_GetOpaque3(this_val);
    size_t size;
    int32_t type;
    int32_t image_bytelength = 0;
    uint8_t* buf = nullptr;
    std::string image_symbol;
    if (JS_IsObject(argv[0])) {
      buf = JS_GetArrayBuffer(ctx, &size, argv[0]);
      JSValue byteLength = JS_GetPropertyStr(ctx, argv[0], "byteLength");
      JS_ToInt32(ctx, &image_bytelength, byteLength);
    }
    if (JS_IsString(argv[2])) {
      size_t len;
      const char* str = JS_ToCStringLen(ctx, &len, argv[2]);
      image_symbol = str;
      image_symbol.resize(len);
      JS_FreeCString(ctx, str);
    }
    JS_ToInt32(ctx, &type, argv[1]);

    ((Arc*)(s->comp))->setArcImage(buf, static_cast<size_t>(image_bytelength), type, image_symbol);
    LV_LOG_USER("%s %s setArcImage type %d", "Arc", s->uid, type);
    return JS_NewBool(ctx, 1);
  }
  return JS_NewBool(ctx, 0);
};

static const JSCFunctionListEntry ComponentProtoFuncs[] = {
    SJS_CFUNC_DEF("nativeSetStyle", 0, NativeCompSetStyle),
    SJS_CFUNC_DEF("addEventListener", 0, NativeCompAddEventListener),
    SJS_CFUNC_DEF("setRange", 0, NativeCompSetRange),
    SJS_CFUNC_DEF("setValue", 0, NativeCompSetValue),
    SJS_CFUNC_DEF("setStartAngle", 0, NativeCompSetStartAngle),
    SJS_CFUNC_DEF("setEndAngle", 0, NativeCompSetEndAngle),
    SJS_CFUNC_DEF("setBackgroundStartAngle", 0, NativeCompSetBackgroundStartAngle),
    SJS_CFUNC_DEF("setBackgroundEndAngle", 0, NativeCompSetBackgroundEndAngle),
    SJS_CFUNC_DEF("setRotation", 0, NativeCompSetRotation),
    SJS_CFUNC_DEF("setMode", 0, NativeCompSetMode),
    SJS_CFUNC_DEF("setChangeRate", 0, NativeCompSetChangeRate),
    SJS_CFUNC_DEF("align", 0, NativeCompSetAlign),
    SJS_CFUNC_DEF("alignTo", 0, NativeCompSetAlignTo),
    SJS_OBJECT_DEF("style", style_funcs, countof(style_funcs)),
    SJS_CFUNC_DEF("getBoundingClientRect", 0, GetStyleBoundClinetRect),
    SJS_CFUNC_DEF("setBackgroundImage", 0, NativeCompSetBackgroundImage),
    SJS_CFUNC_DEF("setArcImage", 0, NativeCompSetArcImage),
    SJS_CFUNC_DEF("moveToFront", 0, NativeCompMoveToFront),
    SJS_CFUNC_DEF("moveToBackground", 0, NativeCompMoveToBackground),
    SJS_CFUNC_DEF("scrollIntoView", 0, NativeCompScrollIntoView),
    SJS_CFUNC_DEF("close", 0, NativeCompCloseComponent),
};

static const JSCFunctionListEntry ComponentClassFuncs[] = {
};

static JSValue ArcConstructor(JSContext *ctx, JSValueConst new_target, int argc, JSValueConst *argv) {
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
        proto = JS_GetClassProto(ctx, ArcClassID);
    } else {
        proto = JS_GetPropertyStr(ctx, new_target, "prototype");
        if (JS_IsException(proto))
            goto fail;
    }

    obj = JS_NewObjectProtoClass(ctx, proto, ArcClassID);
    JS_FreeValue(ctx, proto);
    if (JS_IsException(obj))
        goto fail;
    s = (COMP_REF*)js_mallocz(ctx, sizeof(*s));
    s->uid = uid;
    s->comp = new Arc(uid, NULL);

    JS_FreeCString(ctx, uid);

    if (!s)
        goto fail;

    JS_SetOpaque(obj, s);
    LV_LOG_USER("Arc %s created", uid);
    return obj;
 fail:
    JS_FreeValue(ctx, obj);
    return JS_EXCEPTION;
};

static void ArcFinalizer(JSRuntime *rt, JSValue val) {
    COMP_REF *th = (COMP_REF *)JS_GetOpaque(val, ArcClassID);
    LV_LOG_USER("Arc %s release", th->uid);
    if (th) {
        delete static_cast<Arc*>(th->comp);
        js_free_rt(rt, th);
    }
};

static JSClassDef ArcClass = {
    .class_name = "Arc",
    .finalizer = ArcFinalizer,
};

void NativeComponentArcInit (JSContext* ctx, JSValue ns) {
    JS_NewClassID(JS_GetRuntime(ctx), &ArcClassID);
    JS_NewClass(JS_GetRuntime(ctx), ArcClassID, &ArcClass);
    JSValue proto = JS_NewObject(ctx);
    JS_SetPropertyFunctionList(ctx, proto, ComponentProtoFuncs, countof(ComponentProtoFuncs));
    JS_SetClassProto(ctx, ArcClassID, proto);

    JSValue obj = JS_NewCFunction2(ctx, ArcConstructor, "Arc", 1, JS_CFUNC_constructor, 0);
    JS_SetConstructor(ctx, obj, proto);
    JS_SetPropertyFunctionList(ctx, obj, ComponentClassFuncs, countof(ComponentClassFuncs));
    JS_DefinePropertyValueStr(ctx, ns, "Arc", obj, JS_PROP_C_W_E);
};

