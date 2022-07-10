#pragma once

extern "C" {
    #include "lvgl.h"
    #include "quickjs-libc.h"
    #include "sjs.h"
};

#include "native/components/view/view.hpp"
#include "native/components/window/window.hpp"

typedef struct COMP_REF {
    void* comp;
    const char* uid;
} COMP_REF;

void NativeComponentViewInit (JSContext* ctx, JSValue ns);

void NativeComponentInit (JSContext* ctx, JSValue ns);

void NativeComponentWindowInit (JSContext* ctx, JSValue ns);

#define WRAPPED_JS_SETSTYLE(COMPONENT,COMPONENT_NAME)                                                                       \
    static JSValue NativeCompSetStyle(JSContext* ctx, JSValueConst this_val, int argc, JSValueConst* argv) {                \
        if (argc >= 2 && JS_IsObject(argv[0]) && JS_IsArray(ctx, argv[1])) {                                                \
            COMP_REF* ref = (COMP_REF*)JS_GetOpaque3(this_val);                                                             \
            BasicComponent::setStyle(ctx, argv[0], argv[1]);                                     \
            LV_LOG_USER("%s %s setStyle", COMPONENT_NAME, ref->uid);                                                        \
        }                                                                                                                   \
    }                                                                                                                       \
                                                                                                                            \

#define WRAPPED_JS_METHODS_REGISTER                                                                       \
    SJS_CFUNC_DEF("setStyle", 0, NativeCompSetStyle),                                                     \
                                                                                                    