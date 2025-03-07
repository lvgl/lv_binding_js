#include "event.hpp"

#include "engine.hpp"

void FireEventToJS(lv_event_t* event, std::string uid, lv_event_code_t eventType) {
    TJSRuntime* qrt;
    JSValue argv[4];
    JSContext* ctx;
    int argc = 4;

    qrt = GetRuntime();
    ctx = qrt->ctx;
    std::map<lv_event_code_t, EventWrapFunc>::iterator iter = WrapEventDict.find(eventType);

    lv_obj_t *target = (lv_obj_t*) lv_event_get_target(event);
    lv_obj_t *current_target = (lv_obj_t*) lv_event_get_current_target(event);
    BasicComponent* target_instance = static_cast<BasicComponent*>(lv_obj_get_user_data(target));
    BasicComponent* current_target_instance = static_cast<BasicComponent*>(lv_obj_get_user_data(current_target));
    std::string target_uid;
    std::string current_target_uid;
    if (target_instance) {
        target_uid = target_instance->uid;
    }
    current_target_uid = current_target_instance->uid;

    if (iter != WrapEventDict.end()) {
        EventWrapFunc func = iter->second;

        if (target_instance) {
            argv[0] = JS_NewString(ctx, target_uid.c_str());
        } else {
            argv[0] = JS_UNDEFINED;
        }
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
        if (JS_IsException(ret))
            tjs_dump_error(ctx);
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
    NativeSelectEventWrapInit(ctx);
    NativeNormalEventWrapInit(ctx);
    NativeValueChangeEventWrapInit(ctx);
    NativeClickEventWrapInit(ctx);
};
