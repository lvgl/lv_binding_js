#include "normal.hpp"

WRAPPED_STOPPROPAGATION

static JSClassID WrapNormalEventID;

static void EventFinalizer(JSRuntime *rt, JSValue val) {
}

static JSClassDef NormalEventWrapClass = {
    "normal",
    .finalizer = EventFinalizer,
};

JSValue WrapNormalEvent (lv_event_t* e, std::string uid) {
    SJSRuntime* qrt;
    JSContext* ctx;
    JSValue proto;
    JSValue obj;

    qrt = Engine::GetSJSInstance();
    ctx = qrt->ctx;
    proto = JS_GetClassProto(ctx, WrapNormalEventID);
    obj = JS_NewObjectProtoClass(ctx, proto, WrapNormalEventID);
    JS_FreeValue(ctx, proto);

    JS_SetOpaque(obj, e);

    return obj;
};

static const JSCFunctionListEntry component_proto_funcs[] = {
    SJS_CFUNC_DEF("stopPropagation", 0, NativeEventStopPropagation)
};

void NativeNormalEventWrapInit (JSContext* ctx) {
    JS_NewClassID(&WrapNormalEventID);
    JS_NewClass(JS_GetRuntime(ctx), WrapNormalEventID, &NormalEventWrapClass);
    JSValue proto = JS_NewObject(ctx);
    JS_SetPropertyFunctionList(ctx, proto, component_proto_funcs, countof(component_proto_funcs));
    JS_SetClassProto(ctx, WrapNormalEventID, proto);
}