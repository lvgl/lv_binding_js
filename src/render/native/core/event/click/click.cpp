#include "Click.hpp"

#include <stdlib.h>

WRAPPED_STOPPROPAGATION

static JSClassID WrapClickEventID;

static void EventFinalizer(JSRuntime *rt, JSValue val) {
}

static JSClassDef ClickEventWrapClass = {
    "event",
    .finalizer = EventFinalizer,
};

JSValue WrapClickEvent (lv_event_t* e, std::string uid) {
    SJSRuntime* qrt;
    JSContext* ctx;
    JSValue proto;
    JSValue obj;

    qrt = GetSJSInstance();
    ctx = qrt->ctx;
    proto = JS_GetClassProto(ctx, WrapClickEventID);
    obj = JS_NewObjectProtoClass(ctx, proto, WrapClickEventID);
    JS_FreeValue(ctx, proto);

    JS_SetOpaque(obj, e);

    return obj;
};

static const JSCFunctionListEntry component_proto_funcs[] = {
    SJS_CFUNC_DEF("stopPropagation", 0, NativeEventStopPropagation)
};

void NativeClickEventWrapInit (JSContext* ctx) {
    JS_NewClassID(&WrapClickEventID);
    JS_NewClass(JS_GetRuntime(ctx), WrapClickEventID, &ClickEventWrapClass);
    JSValue proto = JS_NewObject(ctx);
    JS_SetPropertyFunctionList(ctx, proto, component_proto_funcs, countof(component_proto_funcs));
    JS_SetClassProto(ctx, WrapClickEventID, proto);
}