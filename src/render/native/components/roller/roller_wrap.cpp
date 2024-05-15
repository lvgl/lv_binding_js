#include "roller.hpp"

static JSClassID RollerClassID;

WRAPPED_JS_SETSTYLE(Roller, "Roller")
WRAPPED_JS_AddEventListener(Roller, "Roller")
WRAPPED_JS_Align(Roller, "Roller")
WRAPPED_JS_Align_To(Roller, "Roller")
STYLE_INFO(Roller, "Roller")
WRAPPED_MOVE_TO_FRONT(Roller, "Roller")
WRAPPED_MOVE_TO_BACKGROUND(Roller, "Roller")
WRAPPED_SCROLL_INTO_VIEW(Roller, "Roller")
WRAPPED_JS_CLOSE_COMPONENT(Roller, "Roller")

static JSValue NativeCompSetOptions(JSContext *ctx, JSValueConst this_val, int argc, JSValueConst *argv) {
    if (argc >= 1 && JS_IsArray(ctx, argv[0]) && JS_IsNumber(argv[1]) && JS_IsBool(argv[2])) {
        COMP_REF* ref = (COMP_REF*)JS_GetOpaque3(this_val);
        std::vector<std::string> items;

        int32_t item_len;
        size_t key_len;
        std::string key;
        JSValue value;
        const char* ori_str;
        JS_ToInt32(ctx, &item_len, argv[1]);
        bool mode = JS_ToBool(ctx, argv[2]);

        for (int i=0; i<item_len; i++) {                                                                                     
            value = JS_GetPropertyUint32(ctx, argv[0], i);
            if (JS_IsString(value)) {
                ori_str = JS_ToCStringLen(ctx, &key_len, value);                                                             
                key = ori_str;                                                                                              
                JS_FreeCString(ctx, ori_str);                                                                               
                key.resize(key_len);                                                                                         
                items.push_back(key);
            }                                                         
            JS_FreeValue(ctx, value);                                                                                   
        }

        ((Roller*)(ref->comp))->setOptions(items, mode);
        LV_LOG_USER("Roller %s setOptions", ref->uid);
    }
    return JS_UNDEFINED;
};

static JSValue NativeCompSetSelectIndex(JSContext *ctx, JSValueConst this_val, int argc, JSValueConst *argv) {
    if (argc >= 1 && JS_IsNumber(argv[0])) {
        COMP_REF* ref = (COMP_REF*)JS_GetOpaque3(this_val);
        int32_t index;
        JS_ToInt32(ctx, &index, argv[0]);

        ((Roller*)(ref->comp))->setSelectIndex(index);
        LV_LOG_USER("Roller %s setSelectIndex", ref->uid);
    }
    return JS_UNDEFINED;
};

static JSValue NativeCompSetVisibleRowCount(JSContext *ctx, JSValueConst this_val, int argc, JSValueConst *argv) {
    if (argc >= 1 && JS_IsNumber(argv[0])) {
        COMP_REF* ref = (COMP_REF*)JS_GetOpaque3(this_val);
        int32_t count;
        JS_ToInt32(ctx, &count, argv[0]);

        ((Roller*)(ref->comp))->setVisibleRowCount(count);
        LV_LOG_USER("Roller %s setVisibleRowCount", ref->uid);
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
    SJS_CFUNC_DEF("setOptions", 0, NativeCompSetOptions),
    SJS_CFUNC_DEF("setSelectIndex", 0, NativeCompSetSelectIndex),
    SJS_CFUNC_DEF("setVisibleRowCount", 0, NativeCompSetVisibleRowCount),
    SJS_CFUNC_DEF("moveToFront", 0, NativeCompMoveToFront),
    SJS_CFUNC_DEF("moveToBackground", 0, NativeCompMoveToBackground),
    SJS_CFUNC_DEF("scrollIntoView", 0, NativeCompScrollIntoView),
    SJS_CFUNC_DEF("close", 0, NativeCompCloseComponent),
};

static const JSCFunctionListEntry ComponentClassFuncs[] = {
};

static JSValue RollerConstructor(JSContext *ctx, JSValueConst new_target, int argc, JSValueConst *argv) {
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
        proto = JS_GetClassProto(ctx, RollerClassID);
    } else {
        proto = JS_GetPropertyStr(ctx, new_target, "prototype");
        if (JS_IsException(proto))
            goto fail;
    }

    obj = JS_NewObjectProtoClass(ctx, proto, RollerClassID);
    JS_FreeValue(ctx, proto);
    if (JS_IsException(obj))
        goto fail;
    s = (COMP_REF*)js_mallocz(ctx, sizeof(*s));
    s->uid = uid;
    s->comp = new Roller(uid, NULL);

    JS_FreeCString(ctx, uid);

    if (!s)
        goto fail;

    JS_SetOpaque(obj, s);
    LV_LOG_USER("Roller %s created", uid);
    return obj;
 fail:
    JS_FreeValue(ctx, obj);
    return JS_EXCEPTION;
};

static void RollerFinalizer(JSRuntime *rt, JSValue val) {
    COMP_REF *th = (COMP_REF *)JS_GetOpaque(val, RollerClassID);
    LV_LOG_USER("Roller %s release", th->uid);
    if (th) {
        delete static_cast<Roller*>(th->comp);
        js_free_rt(rt, th);
    }
};

static JSClassDef RollerClass = {
    .class_name = "Roller",
    .finalizer = RollerFinalizer,
};

void NativeComponentRollerInit (JSContext* ctx, JSValue ns) {
    JS_NewClassID(JS_GetRuntime(ctx), &RollerClassID);
    JS_NewClass(JS_GetRuntime(ctx), RollerClassID, &RollerClass);
    JSValue proto = JS_NewObject(ctx);
    JS_SetPropertyFunctionList(ctx, proto, ComponentProtoFuncs, countof(ComponentProtoFuncs));
    JS_SetClassProto(ctx, RollerClassID, proto);

    JSValue obj = JS_NewCFunction2(ctx, RollerConstructor, "Roller", 1, JS_CFUNC_constructor, 0);
    JS_SetConstructor(ctx, obj, proto);
    JS_SetPropertyFunctionList(ctx, obj, ComponentClassFuncs, countof(ComponentClassFuncs));
    JS_DefinePropertyValueStr(ctx, ns, "Roller", obj, JS_PROP_C_W_E);
};

