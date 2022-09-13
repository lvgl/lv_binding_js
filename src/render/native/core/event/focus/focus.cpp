#include "focus.hpp"

static JSClassID WrapFocusEventID;

WRAPPED_STOPPROPAGATION

static void EventFinalizer(JSRuntime *rt, JSValue val) {
}

static JSClassDef ClickEventWrapClass = {
    "focus",
    .finalizer = EventFinalizer,
};

JSValue WrapFocusEvent (lv_event_t* e, std::string uid) {
    SJSRuntime* qrt;
    JSContext* ctx;
    JSValue proto;
    JSValue obj;

    qrt = Engine::GetSJSInstance();
    ctx = qrt->ctx;
    proto = JS_GetClassProto(ctx, WrapFocusEventID);
    obj = JS_NewObjectProtoClass(ctx, proto, WrapFocusEventID);
    JS_FreeValue(ctx, proto);

    JS_SetOpaque(obj, e);

    return obj;
};

static const JSCFunctionListEntry component_proto_funcs[] = {
    SJS_CFUNC_DEF("stopPropagation", 0, NativeEventStopPropagation)
};

void NativeFocusEventWrapInit (JSContext* ctx) {
    JS_NewClassID(&WrapFocusEventID);
    JS_NewClass(JS_GetRuntime(ctx), WrapFocusEventID, &ClickEventWrapClass);
    JSValue proto = JS_NewObject(ctx);
    JS_SetPropertyFunctionList(ctx, proto, component_proto_funcs, countof(component_proto_funcs));
    JS_SetClassProto(ctx, WrapFocusEventID, proto);
}