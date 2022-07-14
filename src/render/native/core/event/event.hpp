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

void FireEventToJS(lv_event_t* event, std::string uid, std::string eventType);

void NativeEventWrapInit (JSContext* ctx);

void NativeClickEventWrapInit (JSContext* ctx);

JSValue WrapClickEvent (lv_event_t* e, std::string uid);

typedef JSValue (*wrapFunc)(lv_event_t* e, std::string uid);

static std::map<std::string, wrapFunc> WrapEventDict {
    { "click", &WrapClickEvent },
};

#define WRAPPED_EVENT_METHODS                                                                                                           \
    static JSValue NativeEventStopPropagation(JSContext *ctx, JSValueConst this_val, int argc, JSValueConst *argv) {                    \
        lv_event_t* ref = (lv_event_t*)JS_GetOpaque3(this_val);                                                                           \
        if (ref) {                                                                                                                      \
        }                                                                                                                               \
    };                                                                                                                                  \
                                                                                                                                        \

#define WRAPPED_EVENT_METHODS_REGISTER                                                                                                  \
    SJS_CFUNC_DEF("stopPropagation", 0, NativeEventStopPropagation),                                                                    