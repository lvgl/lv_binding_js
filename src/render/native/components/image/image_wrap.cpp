#include "image.hpp"

static JSClassID ImageClassID;

WRAPPED_JS_SETSTYLE(Image, "Image")
WRAPPED_JS_AddEventListener(Image, "Image")
WRAPPED_JS_Align(Image, "Image")
WRAPPED_JS_Align_To(Image, "Image")
STYLE_INFO(Image, "Image")
WRAPPED_MOVE_TO_FRONT(Image, "Image")
WRAPPED_MOVE_TO_BACKGROUND(Image, "Image")
WRAPPED_SCROLL_INTO_VIEW(Image, "Image")
WRAPPED_JS_CLOSE_COMPONENT(Image, "Image")

static JSValue NativeCompSetImageBinary(JSContext *ctx, JSValueConst this_val, int argc, JSValueConst *argv) {
    if (argc >= 1 && JS_IsObject(argv[0])) {
        size_t size;
        uint8_t* buf = JS_GetArrayBuffer(ctx, &size, argv[0]);
        COMP_REF* s = (COMP_REF*)JS_GetOpaque(this_val, ImageClassID);
        JSValue byteLength = JS_GetPropertyStr(ctx, argv[0], "byteLength");
        int32_t image_bytelength;
        JS_ToInt32(ctx, &image_bytelength, byteLength);

        ((Image*)(s->comp))->setImageBinary(buf, static_cast<size_t>(image_bytelength));
        LV_LOG_USER("Image %s setImage", s->uid);

        return JS_NewBool(ctx, 1);
    fail:
        return JS_ThrowInternalError(ctx, "image setBinary fail");
    }
    return JS_UNDEFINED;
};

static JSValue NativeCompSetSymbol(JSContext *ctx, JSValueConst this_val, int argc, JSValueConst *argv) {
    if (argc >= 1 && JS_IsString(argv[0])) {
        COMP_REF* ref = (COMP_REF*)JS_GetOpaque(this_val, ImageClassID);
        size_t len;
        const char* str = JS_ToCStringLen(ctx, &len, argv[0]);
        std::string s = str;
        s.resize(len);

        ((Image*)(ref->comp))->setSymbol(s);
        LV_LOG_USER("Image %s setYmbol", ref->uid);
        JS_FreeCString(ctx, str);

        return JS_NewBool(ctx, 1);
    fail:
        return JS_ThrowInternalError(ctx, "image setSymbol fail");
    }
    return JS_UNDEFINED;
};

static const JSCFunctionListEntry ComponentProtoFuncs[] = {
    TJS_CFUNC_DEF("nativeSetStyle", 0, NativeCompSetStyle),
    TJS_CFUNC_DEF("addEventListener", 0, NativeCompAddEventListener),
    TJS_CFUNC_DEF("setImageBinary", 0, NativeCompSetImageBinary),
    TJS_CFUNC_DEF("setSymbol", 0, NativeCompSetSymbol),
    TJS_CFUNC_DEF("align", 0, NativeCompSetAlign),
    TJS_CFUNC_DEF("alignTo", 0, NativeCompSetAlignTo),
    JS_OBJECT_DEF("style", style_funcs, countof(style_funcs), JS_PROP_WRITABLE | JS_PROP_CONFIGURABLE),
    TJS_CFUNC_DEF("getBoundingClientRect", 0, GetStyleBoundClinetRect),
    TJS_CFUNC_DEF("moveToFront", 0, NativeCompMoveToFront),
    TJS_CFUNC_DEF("moveToBackground", 0, NativeCompMoveToBackground),
    TJS_CFUNC_DEF("scrollIntoView", 0, NativeCompScrollIntoView),
    TJS_CFUNC_DEF("close", 0, NativeCompCloseComponent),
};

static const JSCFunctionListEntry ComponentClassFuncs[] = {
};

static JSValue ImageConstructor(JSContext *ctx, JSValueConst new_target, int argc, JSValueConst *argv) {
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
        proto = JS_GetClassProto(ctx, ImageClassID);
    } else {
        proto = JS_GetPropertyStr(ctx, new_target, "prototype");
        if (JS_IsException(proto))
            goto fail;
    }

    obj = JS_NewObjectProtoClass(ctx, proto, ImageClassID);
    JS_FreeValue(ctx, proto);
    if (JS_IsException(obj))
        goto fail;
    s = (COMP_REF*)js_mallocz(ctx, sizeof(*s));
    s->uid = uid;
    s->comp = new Image(uid, NULL);

    JS_FreeCString(ctx, uid);

    if (!s)
        goto fail;

    JS_SetOpaque(obj, s);
    LV_LOG_USER("Image %s created", uid);
    return obj;
 fail:
    JS_FreeValue(ctx, obj);
    return JS_EXCEPTION;
};

static void ImageFinalizer(JSRuntime *rt, JSValue val) {
    COMP_REF *th = (COMP_REF *)JS_GetOpaque(val, ImageClassID);
    LV_LOG_USER("Image %s release", th->uid);
    if (th) {
        delete static_cast<Image*>(th->comp);
        js_free_rt(rt, th);
    }
};

static JSClassDef ImageClass = {
    .class_name = "Image",
    .finalizer = ImageFinalizer,
};

void NativeComponentImageInit (JSContext* ctx, JSValue ns) {
    JS_NewClassID(JS_GetRuntime(ctx), &ImageClassID);
    JS_NewClass(JS_GetRuntime(ctx), ImageClassID, &ImageClass);
    JSValue proto = JS_NewObject(ctx);
    JS_SetPropertyFunctionList(ctx, proto, ComponentProtoFuncs, countof(ComponentProtoFuncs));
    JS_SetClassProto(ctx, ImageClassID, proto);

    JSValue obj = JS_NewCFunction2(ctx, ImageConstructor, "Image", 1, JS_CFUNC_constructor, 0);
    JS_SetConstructor(ctx, obj, proto);
    JS_SetPropertyFunctionList(ctx, obj, ComponentClassFuncs, countof(ComponentClassFuncs));
    JS_DefinePropertyValueStr(ctx, ns, "Image", obj, JS_PROP_C_W_E);
};

