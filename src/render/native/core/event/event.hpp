#pragma once

extern "C" {
    #include "quickjs-libc.h"
    #include "sjs.h"
};

#include <map>
#include <stdlib.h>

#include "engine.hpp"

extern "C" {
    #include "lvgl.h"
}

void FireEventToJS(lv_event_t* event, std::string uid, lv_event_code_t eventType);

void NativeEventWrapInit (JSContext* ctx);

void NativeClickEventWrapInit (JSContext* ctx);

JSValue WrapClickEvent (lv_event_t* e, std::string uid);

typedef JSValue (*EventWrapFunc)(lv_event_t* e, std::string uid);

static std::map<lv_event_code_t, EventWrapFunc> WrapEventDict {
    { LV_EVENT_PRESSED, &WrapClickEvent },
};

#define WRAPPED_STOPPROPAGATION                                                                                                       \
    static JSValue NativeEventStopPropagation(JSContext *ctx, JSValueConst this_val, int argc, JSValueConst *argv) {                  \
        lv_event_t* ref = static_cast<lv_event_t*>(JS_GetOpaque3(this_val));                                                          \
        if (ref) {                                                                                                                    \
            ref->stop_bubbling = 1;                                                                                                   \
        }                                                                                                                             \
    };                                                                                                                                \
                                                                                                                                      \

