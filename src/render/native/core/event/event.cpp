#include "event.hpp"

void FireEventToJS(lv_event_t* event, std::string uid, std::string eventType) {
    SJSRuntime* qrt;
    JSValue argv[3];
    JSContext* ctx;
    int argc = 3;

    qrt = GetSJSInstance();
    ctx = qrt->ctx;
    std::map<std::string, wrapFunc>::iterator iter = WrapEventDict.find(eventType);

    if (iter != WrapEventDict.end()) {
        wrapFunc func = iter->second;

        argv[0] = JS_NewString(ctx, uid.c_str());
        argv[1] = JS_NewString(ctx, eventType.c_str());
        if (func != nullptr) {
            argv[2] = func(event, eventTarget);
        } else {
            argc -= 1;
        }

        JSValue globalObj = JS_GetGlobalObject(ctx);
        JSValue fire = JS_GetPropertyStr(ctx, globalObj, "FIRE_QEVENT_CALLBACK");
        JSValue ret = JS_Call(ctx, fire, JS_NULL, argc, argv);
        JS_FreeValue(ctx, globalObj);
        JS_FreeValue(ctx, fire);
        JS_FreeValue(ctx, ret);
        JS_FreeValue(ctx, argv[0]);
        JS_FreeValue(ctx, argv[1]);
        JS_FreeValue(ctx, argv[2]);
    };
};

void NativeEventWrapInit (JSContext* ctx) {
    NativeClickEventWrapInit(ctx);
    NativeTextChangeEventWrapInit(ctx);
    NativeFocusEventWrapInit(ctx);
};
