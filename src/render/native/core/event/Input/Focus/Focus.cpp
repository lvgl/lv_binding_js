#include "Focus.hpp"

static JSClassID WrapFocusEventID;

WRAPPED_STOPPROPAGATION

static void EventFinalizer(JSRuntime *rt, JSValue val) {
    EVENT_REF *th = (EVENT_REF *)JS_GetOpaque(val, WrapFocusEventID);
    if (th) {
        free(th);
    }
};

static JSClassDef FocusEventWrapClass = {
    "event",
    .finalizer = EventFinalizer,
};

JSValue WrapFocusEvent (QEvent* e, QObject* eventTarget) {
    SJSRuntime* qrt;
    JSContext* ctx;
    JSValue proto;
    JSValue obj;
    QString valueString;
    char* value;

    qrt = GetSJSInstance();
    ctx = qrt->ctx;
    proto = JS_GetClassProto(ctx, WrapFocusEventID);
    obj = JS_NewObjectProtoClass(ctx, proto, WrapFocusEventID);
    JS_FreeValue(ctx, proto);

    return obj;
};

static const JSCFunctionListEntry component_proto_funcs[] = {
    SJS_CFUNC_DEF("stopPropagation", 0, NativeEventStopPropagation)
};

void NativeFocusEventWrapInit (JSContext* ctx) {
    JS_NewClassID(&WrapFocusEventID);
    JS_NewClass(JS_GetRuntime(ctx), WrapFocusEventID, &FocusEventWrapClass);
    JSValue proto = JS_NewObject(ctx);
    JS_SetPropertyFunctionList(ctx, proto, component_proto_funcs, countof(component_proto_funcs));
    JS_SetClassProto(ctx, WrapFocusEventID, proto);
};