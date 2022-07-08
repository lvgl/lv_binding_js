#include "View.hpp"

static JSClassID ViewClassID;

WRAPPED_JS_METHODS(SWidget, "view")

static JSValue NativeCompInsertChildBefore(JSContext *ctx, JSValueConst this_val, int argc, JSValueConst *argv) {
    if (argc >= 2 && JS_IsObject(argv[0]) && JS_IsObject(argv[1])) {
        COMP_REF* beforeChild = (COMP_REF*)JS_GetOpaque3(argv[0]);
        COMP_REF* child = (COMP_REF*)JS_GetOpaque3(argv[0]);
        COMP_REF* parent = (COMP_REF*)JS_GetOpaque(this_val, ViewClassID);

        JSAtom flexNodeAtom = JS_NewAtom(ctx, "getFlexNode");
        JSValue beforeChildFlexNode = JS_Invoke(ctx, argv[0], flexNodeAtom, 0, NULL);
        JSValue childFlexNode = JS_Invoke(ctx, argv[1], flexNodeAtom, 0, NULL);
        
        LV_LOG_INFO("view %s insertChild %s %s", parent->uid, child->uid, beforeChild->uid);
        ((SWidget*)(parent->comp))->insertChildBefore((void*)(child->comp), JS_GetOpaque3(beforeChildFlexNode), JS_GetOpaque3(childFlexNode));
        JS_FreeValue(ctx, childFlexNode);
        JS_FreeValue(ctx, beforeChildFlexNode);
        JS_FreeAtom(ctx, flexNodeAtom);
    }
    return JS_UNDEFINED;
};

static JSValue NativeCompRemoveChild(JSContext *ctx, JSValueConst this_val, int argc, JSValueConst *argv) {
    if (argc >= 1 && JS_IsObject(argv[0])) {
        COMP_REF* child = (COMP_REF*)JS_GetOpaque3(argv[0]);
        COMP_REF* parent = (COMP_REF*)JS_GetOpaque(this_val, ViewClassID);
        
        LV_LOG_INFO("view %s remove child %s", parent->uid, child->uid);
        ((View*)(parent->comp))->removeChild((void*)(child->comp));
        JS_FreeValue(ctx, childFlexNode);
        JS_FreeAtom(ctx, flexNodeAtom);
    }
    return JS_UNDEFINED;
};

static JSValue NativeCompAppendChild(JSContext *ctx, JSValueConst this_val, int argc, JSValueConst *argv) {
    if (argc >= 1 && JS_IsObject(argv[0])) {
        COMP_REF* child = (COMP_REF*)JS_GetOpaque3(argv[0]);
        COMP_REF* parent = (COMP_REF*)JS_GetOpaque(this_val, ViewClassID);
        
        ((View*)(parent->comp))->appendChild((void*)(child->comp));
        JS_FreeValue(ctx, childFlexNode);
        JS_FreeAtom(ctx, flexNodeAtom);
        LV_LOG_INFO("view %s append child %s", parent->uid, child->uid);
    }
    return JS_UNDEFINED;
};

static const JSCFunctionListEntry ComponentProtoFuncs[] = {
    SJS_CFUNC_DEF("insertChildBefore", 0, NativeCompInsertChildBefore),
    SJS_CFUNC_DEF("removeChild", 0, NativeCompRemoveChild),
    SJS_CFUNC_DEF("appendChild", 0, NativeCompAppendChild),
};

static const JSCFunctionListEntry ComponentClassFuncs[] = {
};

static JSValue ViewConstructor(JSContext *ctx, JSValueConst new_target, int argc, JSValueConst *argv) {
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
        proto = JS_GetClassProto(ctx, ViewClassID);
    } else {
        proto = JS_GetPropertyStr(ctx, new_target, "prototype");
        if (JS_IsException(proto))
            goto fail;
    }

    obj = JS_NewObjectProtoClass(ctx, proto, ViewClassID);
    JS_FreeValue(ctx, proto);
    if (JS_IsException(obj))
        goto fail;
    s = (COMP_REF*)js_mallocz(ctx, sizeof(*s));
    s->uid = uid;
    s->comp = lv_obj_create(NULL);

    JS_FreeCString(ctx, uid);

    if (!s)
        goto fail;

    JS_SetOpaque(obj, s);
    LV_LOG_INFO("view %s created", uid);
    return obj;
 fail:
    JS_FreeValue(ctx, obj);
    return JS_EXCEPTION;
};

static void ViewFinalizer(JSRuntime *rt, JSValue val) {
    COMP_REF *th = (COMP_REF *)JS_GetOpaque(val, ViewClassID);
    LV_LOG_INFO("view %s release", th->uid);
    if (th) {
        free(th);
    }
};

static JSClassDef ViewClass = {
    "view",
    .finalizer = ViewFinalizer,
};

void NativeComponentViewInit (JSContext* ctx, JSValue ns) {
    JS_NewClassID(&ViewClassID);
    JS_NewClass(JS_GetRuntime(ctx), ViewClassID, &ViewClass);
    JSValue proto = JS_NewObject(ctx);
    JS_SetPropertyFunctionList(ctx, proto, ComponentProtoFuncs, countof(ComponentProtoFuncs));
    JS_SetClassProto(ctx, ViewClassID, proto);

    JSValue obj = JS_NewCFunction2(ctx, ViewConstructor, "View", 1, JS_CFUNC_constructor, 0);
    JS_SetConstructor(ctx, obj, proto);
    JS_SetPropertyFunctionList(ctx, obj, ComponentClassFuncs, countof(ComponentClassFuncs));
    JS_DefinePropertyValueStr(ctx, ns, "View", obj, JS_PROP_C_W_E);
};

