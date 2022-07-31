#include "event.hpp"

void FireEventToJS(lv_event_t* event, std::string uid, lv_event_code_t eventType) {
    SJSRuntime* qrt;
    JSValue argv[4];
    JSContext* ctx;
    int argc = 4;
    
    qrt = Engine::GetSJSInstance();
    ctx = qrt->ctx;
    std::map<lv_event_code_t, EventWrapFunc>::iterator iter = WrapEventDict.find(eventType);

    struct _lv_obj_t *target = event->target;
    struct _lv_obj_t *current_target = event->current_target;
    BasicComponent* target_instance = static_cast<BasicComponent*>(target->user_data);
    BasicComponent* current_target_instance = static_cast<BasicComponent*>(current_target->user_data);
    std::string target_uid = target_instance->uid;
    std::string current_target_uid = current_target_instance->uid;

    if (iter != WrapEventDict.end()) {
        EventWrapFunc func = iter->second;

        argv[0] = JS_NewString(ctx, target_uid.c_str());
        argv[1] = JS_NewString(ctx, current_target_uid.c_str());
        argv[2] = JS_NewInt32(ctx, eventType);
        if (func != nullptr) {
            argv[3] = func(event, uid);
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
        JS_FreeValue(ctx, argv[3]);
    };
};

void NativeEventWrapInit (JSContext* ctx) {
    NativeClickEventWrapInit(ctx);
    NativeValueChangeEventWrapInit(ctx);
};
