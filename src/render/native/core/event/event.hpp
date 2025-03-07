#pragma once

extern "C" {
    #include "lvgl.h"
    #include "private.h"
    #include "utils.h"
};

#include <map>
#include <stdlib.h>

#include "native/core/basic/comp.hpp"

void FireEventToJS(lv_event_t* event, std::string uid, lv_event_code_t eventType);

void NativeEventWrapInit (JSContext* ctx);

void NativeNormalEventWrapInit (JSContext* ctx);

JSValue WrapNormalEvent (lv_event_t* e, std::string uid);

void NativeClickEventWrapInit (JSContext* ctx);

JSValue WrapClickEvent (lv_event_t* e, std::string uid);

void NativeSelectEventWrapInit (JSContext* ctx);

JSValue WrapSelectEvent (lv_event_t* e, std::string uid);

void NativeValueChangeEventWrapInit (JSContext* ctx);

JSValue WrapValueChangeEvent (lv_event_t* e, std::string uid);

typedef JSValue (*EventWrapFunc)(lv_event_t* e, std::string uid);

static std::map<lv_event_code_t, EventWrapFunc> WrapEventDict {
    { LV_EVENT_PRESSED, &WrapClickEvent },
    { LV_EVENT_PRESSING, &WrapClickEvent },
    { LV_EVENT_PRESS_LOST, &WrapClickEvent },
    { LV_EVENT_CLICKED, &WrapClickEvent },
    { LV_EVENT_SHORT_CLICKED, &WrapClickEvent },
    { LV_EVENT_LONG_PRESSED, &WrapClickEvent },
    { LV_EVENT_LONG_PRESSED_REPEAT, &WrapClickEvent },
    { LV_EVENT_VALUE_CHANGED, &WrapValueChangeEvent },
    { LV_EVENT_FOCUSED, &WrapNormalEvent },
    { LV_EVENT_DEFOCUSED, &WrapNormalEvent },
    { LV_EVENT_CANCEL, &WrapNormalEvent },
    { LV_EVENT_READY, &WrapNormalEvent },
    { LV_EVENT_RELEASED, &WrapNormalEvent },
};

#define WRAPPED_STOPPROPAGATION                                                                                                       \
    static JSValue NativeEventStopPropagation(JSContext *ctx, JSValueConst this_val, int argc, JSValueConst *argv) {                  \
        JSClassID _class_id;                                                                                                          \
        lv_event_t* ref = static_cast<lv_event_t*>(JS_GetAnyOpaque(this_val, &_class_id));                                            \
        if (ref) {                                                                                                                    \
            lv_event_stop_bubbling(ref);                                                                                              \
        }                                                                                                                             \
    };                                                                                                                                \
                                                                                                                                      \

