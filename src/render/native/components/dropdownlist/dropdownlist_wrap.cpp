#include "dropdownlist.hpp"

static JSClassID DropdownlistClassID;

WRAPPED_JS_SETSTYLE(Dropdownlist, "Dropdownlist")
WRAPPED_JS_AddEventListener(Dropdownlist, "Dropdownlist")
WRAPPED_JS_Align(Dropdownlist, "Dropdownlist")
WRAPPED_JS_Align_To(Dropdownlist, "Dropdownlist")
STYLE_INFO(Dropdownlist, "Dropdownlist")

static JSValue NativeCompSetItems(JSContext *ctx, JSValueConst this_val, int argc, JSValueConst *argv) {
    if (argc >= 1 && JS_IsArray(ctx, argv[0]) && JS_IsNumber(argv[1])) {
        COMP_REF* ref = (COMP_REF*)JS_GetOpaque3(this_val);
        std::vector<std::string> items;

        int32_t item_len;
        size_t key_len;
        std::string key;
        JSValue value;
        const char* ori_str;
        JS_ToInt32(ctx, &item_len, argv[1]);                                                                                 
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

        ((Dropdownlist*)(ref->comp))->setItems(items);
        LV_LOG_USER("Dropdownlist %s setItems", ref->uid);
    }
    return JS_UNDEFINED;
};

static JSValue NativeCompSetValue(JSContext *ctx, JSValueConst this_val, int argc, JSValueConst *argv) {
    if (argc >= 1 && JS_IsNumber(argv[0])) {
        COMP_REF* ref = (COMP_REF*)JS_GetOpaque3(this_val);
        int32_t index;
        JS_ToInt32(ctx, &index, argv[0]);

        ((Dropdownlist*)(ref->comp))->setValue(index);
        LV_LOG_USER("Dropdownlist %s setValue", ref->uid);
    }
    return JS_UNDEFINED;
};

static JSValue NativeCompSeText(JSContext *ctx, JSValueConst this_val, int argc, JSValueConst *argv) {
    if (argc >= 1 && JS_IsString(argv[0])) {
        COMP_REF* ref = (COMP_REF*)JS_GetOpaque3(this_val);
        size_t len;
        const char* str = JS_ToCStringLen(ctx, &len, argv[0]);
        std::string s = str;
        s.resize(len);

        ((Dropdownlist*)(ref->comp))->setText(s);
        LV_LOG_USER("Dropdownlist %s setText", ref->uid);
    }
    return JS_UNDEFINED;
};

static JSValue NativeCompSetDir(JSContext *ctx, JSValueConst this_val, int argc, JSValueConst *argv) {
    if (argc >= 1 && JS_IsNumber(argv[0])) {
        COMP_REF* ref = (COMP_REF*)JS_GetOpaque3(this_val);
        int32_t dir;
        JS_ToInt32(ctx, &dir, argv[0]);

        ((Dropdownlist*)(ref->comp))->setDir(dir);
        LV_LOG_USER("Dropdownlist %s setDir", ref->uid);
    }
    return JS_UNDEFINED;
};

static JSValue NativeCompSetArrowDir(JSContext *ctx, JSValueConst this_val, int argc, JSValueConst *argv) {
    if (argc >= 1 && JS_IsNumber(argv[0])) {
        COMP_REF* ref = (COMP_REF*)JS_GetOpaque3(this_val);
        int32_t dir;
        JS_ToInt32(ctx, &dir, argv[0]);

        ((Dropdownlist*)(ref->comp))->setArrowDir(dir);
        LV_LOG_USER("Dropdownlist %s setArrowDir", ref->uid);
    }
    return JS_UNDEFINED;
};

static JSValue NativeCompSetHighLightSelect(JSContext *ctx, JSValueConst this_val, int argc, JSValueConst *argv) {
    if (argc >= 1 && JS_IsBool(argv[0])) {
        COMP_REF* ref = (COMP_REF*)JS_GetOpaque3(this_val);
        bool payload = JS_ToBool(ctx, argv[0]);

        ((Dropdownlist*)(ref->comp))->setHighLightSelect(payload);
        LV_LOG_USER("Dropdownlist %s setHighLightSelect", ref->uid);
    }
    return JS_UNDEFINED;
};

static const JSCFunctionListEntry ComponentProtoFuncs[] = {
    SJS_CFUNC_DEF("nativeSetStyle", 0, NativeCompSetStyle),
    SJS_CFUNC_DEF("addEventListener", 0, NativeCompAddEventListener),
    SJS_CFUNC_DEF("align", 0, NativeCompSetAlign),
    SJS_CFUNC_DEF("alignTo", 0, NativeCompSetAlignTo),
    SJS_CFUNC_DEF("getBoundingClientRect", 0, GetStyleBoundClinetRect),
    SJS_OBJECT_DEF("style", style_funcs, countof(style_funcs)),
    SJS_CFUNC_DEF("setItems", 0, NativeCompSetItems),
    SJS_CFUNC_DEF("setValue", 0, NativeCompSetValue),
    SJS_CFUNC_DEF("setText", 0, NativeCompSeText),
    SJS_CFUNC_DEF("setDir", 0, NativeCompSetDir),
    SJS_CFUNC_DEF("setArrowDir", 0, NativeCompSetArrowDir),
    SJS_CFUNC_DEF("setHighLightSelect", 0, NativeCompSetHighLightSelect),
};

static const JSCFunctionListEntry ComponentClassFuncs[] = {
};

static JSValue DropdownlistConstructor(JSContext *ctx, JSValueConst new_target, int argc, JSValueConst *argv) {
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
        proto = JS_GetClassProto(ctx, DropdownlistClassID);
    } else {
        proto = JS_GetPropertyStr(ctx, new_target, "prototype");
        if (JS_IsException(proto))
            goto fail;
    }

    obj = JS_NewObjectProtoClass(ctx, proto, DropdownlistClassID);
    JS_FreeValue(ctx, proto);
    if (JS_IsException(obj))
        goto fail;
    s = (COMP_REF*)js_mallocz(ctx, sizeof(*s));
    s->uid = uid;
    s->comp = new Dropdownlist(uid, NULL);

    JS_FreeCString(ctx, uid);

    if (!s)
        goto fail;

    JS_SetOpaque(obj, s);
    LV_LOG_USER("Dropdownlist %s created", uid);
    return obj;
 fail:
    JS_FreeValue(ctx, obj);
    return JS_EXCEPTION;
};

static void DropdownlistFinalizer(JSRuntime *rt, JSValue val) {
    COMP_REF *th = (COMP_REF *)JS_GetOpaque(val, DropdownlistClassID);
    LV_LOG_USER("Dropdownlist %s release", th->uid);
    if (th) {
        delete static_cast<Dropdownlist*>(th->comp);
        free(th);
    }
};

static JSClassDef DropdownlistClass = {
    "Dropdownlist",
    .finalizer = DropdownlistFinalizer,
};

void NativeComponentDropdownlistInit (JSContext* ctx, JSValue ns) {
    JS_NewClassID(&DropdownlistClassID);
    JS_NewClass(JS_GetRuntime(ctx), DropdownlistClassID, &DropdownlistClass);
    JSValue proto = JS_NewObject(ctx);
    JS_SetPropertyFunctionList(ctx, proto, ComponentProtoFuncs, countof(ComponentProtoFuncs));
    JS_SetClassProto(ctx, DropdownlistClassID, proto);

    JSValue obj = JS_NewCFunction2(ctx, DropdownlistConstructor, "Dropdownlist", 1, JS_CFUNC_constructor, 0);
    JS_SetConstructor(ctx, obj, proto);
    JS_SetPropertyFunctionList(ctx, obj, ComponentClassFuncs, countof(ComponentClassFuncs));
    JS_DefinePropertyValueStr(ctx, ns, "Dropdownlist", obj, JS_PROP_C_W_E);
};

