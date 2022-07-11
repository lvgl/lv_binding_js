#pragma once

extern "C" {
    #include "lvgl.h"
    #include "quickjs-libc.h"
    #include "sjs.h"
};

#include "native/components/view/view.hpp"
#include "native/components/window/window.hpp"

#include <vector>
#include <string>

typedef struct COMP_REF {
    void* comp;
    const char* uid;
} COMP_REF;

void NativeComponentViewInit (JSContext* ctx, JSValue ns);

void NativeComponentInit (JSContext* ctx, JSValue ns);

void NativeComponentWindowInit (JSContext* ctx, JSValue ns);

#define WRAPPED_JS_SETSTYLE(COMPONENT,COMPONENT_NAME)                                                                       \
    static JSValue NativeCompSetStyle(JSContext* ctx, JSValueConst this_val, int argc, JSValueConst* argv) {                \
        if (argc >= 2 && JS_IsObject(argv[0]) && JS_IsArray(ctx, argv[1]) && JS_IsNumber(argv[2])) {                        \
            int len;                                                                                                        \
            std::vector<std::string> keys;                                                                                  \
            std::string key;                                                                                                \
            size_t keylen;                                                                                                  \
            JSValue value;                                                                                                  \
                                                                                                                            \
            COMP_REF* ref = (COMP_REF*)JS_GetOpaque3(this_val);                                                             \
            JS_ToInt32(ctx, &len, argv[2]);                                                                                 \
            for (int i=0; i<len; i++) {                                                                                     \
                value = JS_GetPropertyUint32(ctx, argv[2], i);                                                              \
                key = JS_ToCStringLen(ctx, &keylen, value);                                                                 \
                key.resize(keylen);                                                                                         \
                keys.append(key);                                                                                           \
            }                                                                                                               \
                                                                                                                            \
            BasicComponent::setStyle(ctx, argv[0], keys);                                                                   \
            LV_LOG_USER("%s %s setStyle", COMPONENT_NAME, ref->uid);                                                        \
        }                                                                                                                   \
    }                                                                                                                       \
                                                                                                                            \

#define WRAPPED_JS_METHODS_REGISTER                                                                       \
    SJS_CFUNC_DEF("setStyle", 0, NativeCompSetStyle),                                                     \
                                                                                                    