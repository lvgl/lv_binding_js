#pragma once

extern "C" {
    #include "lvgl.h"
    #include "quickjs-libc.h"
    #include "sjs.h"
};

#include <vector>
#include <string>

typedef struct COMP_REF {
    void* comp;
    const char* uid;
} COMP_REF;

void NativeComponentViewInit (JSContext* ctx, JSValue ns);

void NativeComponentInit (JSContext* ctx, JSValue ns);

void NativeComponentWindowInit (JSContext* ctx, JSValue ns);

void NativeComponentTextInit (JSContext* ctx, JSValue ns);

void NativeComponentImageInit (JSContext* ctx, JSValue ns);

void NativeComponentButtonInit (JSContext* ctx, JSValue ns);

void NativeComponentSliderInit (JSContext* ctx, JSValue ns);

#define WRAPPED_JS_SETSTYLE(COMPONENT,COMPONENT_NAME)                                                                       \
    static JSValue NativeCompSetStyle(JSContext* ctx, JSValueConst this_val, int argc, JSValueConst* argv) {                \
        if (argc >= 2 && JS_IsObject(argv[0]) && JS_IsArray(ctx, argv[1]) && JS_IsNumber(argv[2]) && JS_IsNumber(argv[3])) {                        \
            int len;                                                                                                        \
            std::vector<std::string> keys;                                                                                  \
            std::string key;                                                                                                \
            size_t keylen;                                                                                                  \
            JSValue value;                                                                                                  \
            const char* ori_str;                                                                                            \
            int32_t type;                                                                                                   \
                                                                                                                            \
            COMP_REF* ref = (COMP_REF*)JS_GetOpaque3(this_val);                                                             \
            JS_ToInt32(ctx, &len, argv[2]);                                                                                 \
            for (int i=0; i<len; i++) {                                                                                     \
                value = JS_GetPropertyUint32(ctx, argv[1], i);                                                              \
                ori_str = JS_ToCStringLen(ctx, &keylen, value);                                                             \
                key = ori_str;                                                                                              \
                JS_FreeCString(ctx, ori_str);                                                                               \
                key.resize(keylen);                                                                                         \
                keys.push_back(key);                                                                                        \
                JS_FreeValue(ctx, value);                                                                                   \
            }                                                                                                               \
            JS_ToInt32(ctx, &type, argv[3]);                                                                                \
                                                                                                                            \
            static_cast<COMPONENT*>(ref->comp)->BasicComponent::setStyle(ctx, argv[0], keys, type);                         \
            LV_LOG_USER("%s %s setStyle", COMPONENT_NAME, ref->uid);                                                        \
        }                                                                                                                   \
    }                                                                                                                       \
                                                                                                                            \

#define WRAPPED_JS_AddEventListener(COMPONENT,COMPONENT_NAME)                                                               \
    static JSValue NativeCompAddEventListener(JSContext *ctx, JSValueConst this_val, int argc, JSValueConst *argv) {        \
        if (argc >= 1 && JS_IsNumber(argv[0])) {                                                                            \
            COMP_REF* s = (COMP_REF*)JS_GetOpaque3(this_val);                                                               \
            int event_type;                                                                                                 \
            JS_ToInt32(ctx, &event_type, argv[0]);                                                                          \
            ((COMPONENT*)(s->comp))->addEventListener(event_type);                                                          \
            return JS_NewBool(ctx, 1);                                                                                      \
        }                                                                                                                   \
        return JS_NewBool(ctx, 0);                                                                                          \    
    }                                                                                                                       \
                                                                                                                            \

                                                                                                    