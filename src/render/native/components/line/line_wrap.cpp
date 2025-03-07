#include "line.hpp"

static JSClassID LineClassID;

WRAPPED_JS_SETSTYLE(Line, "Line")
WRAPPED_JS_AddEventListener(Line, "Line")
WRAPPED_JS_Align(Line, "Line")
WRAPPED_JS_Align_To(Line, "Line")
STYLE_INFO(Line, "Line")
WRAPPED_JS_BACKGROUND_IMAGE(Line,"Line")
WRAPPED_MOVE_TO_FRONT(Line, "Line")
WRAPPED_MOVE_TO_BACKGROUND(Line, "Line")
WRAPPED_SCROLL_INTO_VIEW(Line, "Line")
WRAPPED_JS_CLOSE_COMPONENT(Line, "Line")

static JSValue NativeCompSetPoints(JSContext *ctx, JSValueConst this_val, int argc, JSValueConst *argv) {
    if (argc >= 1 && JS_IsArray(ctx, argv[0]) && JS_IsNumber(argv[1])) {
        COMP_REF* ref = (COMP_REF*)JS_GetOpaque(this_val, LineClassID);

        int32_t len;
        int32_t num = 0;
        JS_ToInt32(ctx, &len, argv[1]);
        JSValue item;
        JSValue first_value;
        JSValue second_value;
        int32_t first;
        int32_t second;
        std::vector<lv_point_precise_t> points;

        for (int i=0; i<len; i++) {
            item = JS_GetPropertyUint32(ctx, argv[0], i);
            if (JS_IsArray(ctx, item)) {
                first_value = JS_GetPropertyUint32(ctx, item, 0);
                second_value = JS_GetPropertyUint32(ctx, item, 1);
                if (JS_IsNumber(first_value) && JS_IsNumber(second_value)) {
                    JS_ToInt32(ctx, &first, first_value);
                    JS_ToInt32(ctx, &second, second_value);

                    num += 1;
                    points.push_back({ .x = static_cast<lv_value_precise_t>(first), .y = static_cast<lv_value_precise_t>(second) });
                }

                JS_FreeValue(ctx, first_value);
                JS_FreeValue(ctx, second_value);
            }
            JS_FreeValue(ctx, item);
        }

        ((Line*)(ref->comp))->setPoints(points, num);
        LV_LOG_USER("Line %s setPoints", ref->uid);
    }
    return JS_UNDEFINED;
};

static const JSCFunctionListEntry ComponentProtoFuncs[] = {
    TJS_CFUNC_DEF("nativeSetStyle", 0, NativeCompSetStyle),
    TJS_CFUNC_DEF("addEventListener", 0, NativeCompAddEventListener),
    TJS_CFUNC_DEF("align", 0, NativeCompSetAlign),
    TJS_CFUNC_DEF("alignTo", 0, NativeCompSetAlignTo),
    TJS_CFUNC_DEF("getBoundingClientRect", 0, GetStyleBoundClinetRect),
    JS_OBJECT_DEF("style", style_funcs, countof(style_funcs), JS_PROP_WRITABLE | JS_PROP_CONFIGURABLE),
    TJS_CFUNC_DEF("setPoints", 0, NativeCompSetPoints),
    TJS_CFUNC_DEF("moveToFront", 0, NativeCompMoveToFront),
    TJS_CFUNC_DEF("moveToBackground", 0, NativeCompMoveToBackground),
    TJS_CFUNC_DEF("scrollIntoView", 0, NativeCompScrollIntoView),
    TJS_CFUNC_DEF("close", 0, NativeCompCloseComponent),
};

static const JSCFunctionListEntry ComponentClassFuncs[] = {
};

static JSValue LineConstructor(JSContext *ctx, JSValueConst new_target, int argc, JSValueConst *argv) {
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
        proto = JS_GetClassProto(ctx, LineClassID);
    } else {
        proto = JS_GetPropertyStr(ctx, new_target, "prototype");
        if (JS_IsException(proto))
            goto fail;
    }

    obj = JS_NewObjectProtoClass(ctx, proto, LineClassID);
    JS_FreeValue(ctx, proto);
    if (JS_IsException(obj))
        goto fail;
    s = (COMP_REF*)js_mallocz(ctx, sizeof(*s));
    s->uid = uid;
    s->comp = new Line(uid, NULL);

    JS_FreeCString(ctx, uid);

    if (!s)
        goto fail;

    JS_SetOpaque(obj, s);
    LV_LOG_USER("Line %s created", uid);
    return obj;
 fail:
    JS_FreeValue(ctx, obj);
    return JS_EXCEPTION;
};

static void LineFinalizer(JSRuntime *rt, JSValue val) {
    COMP_REF *th = (COMP_REF *)JS_GetOpaque(val, LineClassID);
    LV_LOG_USER("Line %s release", th->uid);
    if (th) {
        delete static_cast<Line*>(th->comp);
        js_free_rt(rt, th);
    }
};

static JSClassDef LineClass = {
    .class_name = "Line",
    .finalizer = LineFinalizer,
};

void NativeComponentLineInit (JSContext* ctx, JSValue ns) {
    JS_NewClassID(JS_GetRuntime(ctx), &LineClassID);
    JS_NewClass(JS_GetRuntime(ctx), LineClassID, &LineClass);
    JSValue proto = JS_NewObject(ctx);
    JS_SetPropertyFunctionList(ctx, proto, ComponentProtoFuncs, countof(ComponentProtoFuncs));
    JS_SetClassProto(ctx, LineClassID, proto);

    JSValue obj = JS_NewCFunction2(ctx, LineConstructor, "Line", 1, JS_CFUNC_constructor, 0);
    JS_SetConstructor(ctx, obj, proto);
    JS_SetPropertyFunctionList(ctx, obj, ComponentClassFuncs, countof(ComponentClassFuncs));
    JS_DefinePropertyValueStr(ctx, ns, "Line", obj, JS_PROP_C_W_E);
};

