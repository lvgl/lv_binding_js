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

void NativeComponentSwitchInit (JSContext* ctx, JSValue ns);

void NativeComponentTextareaInit (JSContext* ctx, JSValue ns);

void NativeComponentkeyboardInit (JSContext* ctx, JSValue ns);

#define WRAPPED_JS_SETSTYLE(COMPONENT,COMPONENT_NAME)                                                                       \
    static JSValue NativeCompSetStyle(JSContext* ctx, JSValueConst this_val, int argc, JSValueConst* argv) {                \
        if (argc >= 2 && JS_IsObject(argv[0]) && JS_IsArray(ctx, argv[1]) && JS_IsNumber(argv[2]) && JS_IsNumber(argv[3]) && JS_IsBool(argv[4])) {       \
            int len;                                                                                                        \
            std::vector<std::string> keys;                                                                                  \
            std::string key;                                                                                                \
            size_t keylen;                                                                                                  \
            JSValue value;                                                                                                  \
            const char* ori_str;                                                                                            \
            int32_t type;                                                                                                   \
            bool isinit;                                                                                                    \
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
            isinit = JS_ToBool(ctx, argv[4]);                                                                               \
                                                                                                                            \
            static_cast<COMPONENT*>(ref->comp)->BasicComponent::setStyle(ctx, argv[0], keys, type, isinit);                 \
            LV_LOG_USER("%s %s setStyle", COMPONENT_NAME, ref->uid);                                                        \
        }                                                                                                                   \
        return JS_UNDEFINED;                                                                                                \
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

#define WRAPPED_JS_Align(COMPONENT,COMPONENT_NAME)                                                                          \
    static JSValue NativeCompSetAlign(JSContext *ctx, JSValueConst this_val, int argc, JSValueConst *argv) {                \
        if (argc >= 1 && JS_IsNumber(argv[0]) && JS_IsArray(ctx, argv[1])) {                                                \
            COMP_REF* s = (COMP_REF*)JS_GetOpaque3(this_val);                                                               \
            int32_t x;                                                                                                      \
            int32_t y;                                                                                                      \
            JSValue x_value = JS_GetPropertyUint32(ctx, argv[1], 0);                                                        \
            JSValue y_value = JS_GetPropertyUint32(ctx, argv[1], 1);                                                        \
            JS_ToInt32(ctx, &x, x_value);                                                                                   \
            JS_ToInt32(ctx, &y, y_value);                                                                                   \
                                                                                                                            \
            int align_type;                                                                                                 \
            JS_ToInt32(ctx, &align_type, argv[0]);                                                                          \
            ((COMPONENT*)(s->comp))->BasicComponent::setAlign(align_type, x, y);                                            \
            LV_LOG_USER("%s %s setAlign", COMPONENT_NAME, s->uid);                                                          \
            JS_FreeValue(ctx, x_value);                                                                                     \
            JS_FreeValue(ctx, y_value);                                                                                     \
            return JS_NewBool(ctx, 1);                                                                                      \
        }                                                                                                                   \
        return JS_NewBool(ctx, 0);                                                                                          \   
    }                                                                                                                       \

#define WRAPPED_JS_Align_To(COMPONENT,COMPONENT_NAME)                                                                       \
    static JSValue NativeCompSetAlignTo(JSContext *ctx, JSValueConst this_val, int argc, JSValueConst *argv) {              \
        if (argc >= 1 && JS_IsNumber(argv[0]) && JS_IsArray(ctx, argv[1]) && JS_IsObject(argv[2])) {                        \
            COMP_REF* s = (COMP_REF*)JS_GetOpaque3(this_val);                                                               \
            int32_t x;                                                                                                      \
            int32_t y;                                                                                                      \
            JSValue x_value = JS_GetPropertyUint32(ctx, argv[1], 0);                                                        \
            JSValue y_value = JS_GetPropertyUint32(ctx, argv[1], 1);                                                        \
            JS_ToInt32(ctx, &x, x_value);                                                                                   \
            JS_ToInt32(ctx, &y, y_value);                                                                                   \
                                                                                                                            \
            int align_type;                                                                                                 \
            JS_ToInt32(ctx, &align_type, argv[0]);                                                                          \
                                                                                                                            \
            s = (COMP_REF*)JS_GetOpaque3(argv[2]);                                                                          \
                                                                                                                            \
            ((COMPONENT*)(s->comp))->BasicComponent::setAlignTo(align_type, x, y, static_cast<BasicComponent*>(s->comp));   \
            LV_LOG_USER("%s %s setAlignTo", COMPONENT_NAME, s->uid);                                                        \
            JS_FreeValue(ctx, x_value);                                                                                     \
            JS_FreeValue(ctx, y_value);                                                                                     \
            return JS_NewBool(ctx, 1);                                                                                      \
        }                                                                                                                   \
        return JS_NewBool(ctx, 0);                                                                                          \
    }                                                                                                                       \

#define STYLE_INFO(COMPONENT,COMPONENT_NAME)                                                                                \
    static JSValue GetStyleLeft (JSContext *ctx, JSValueConst this_val, int argc, JSValueConst *argv) {                     \
        lv_refr_now(NULL);                                                                                                  \
        COMP_REF* s = (COMP_REF*)JS_GetOpaque3(this_val);                                                                   \
        lv_obj_t* instance = static_cast<lv_obj_t*>(((COMPONENT*)(s->comp))->instance);                                     \
        lv_coord_t left = lv_obj_get_x(instance);                                                                           \
        return JS_NewInt32(ctx, static_cast<int32_t>(left));                                                                \
    };                                                                                                                      \
                                                                                                                            \
    static JSValue GetStyleTop (JSContext *ctx, JSValueConst this_val, int argc, JSValueConst *argv) {                      \
        lv_refr_now(NULL);                                                                                                  \
        COMP_REF* s = (COMP_REF*)JS_GetOpaque3(this_val);                                                                   \
        lv_obj_t* instance = static_cast<lv_obj_t*>(((COMPONENT*)(s->comp))->instance);                                     \
        lv_coord_t top = lv_obj_get_y(instance);                                                                            \
        return JS_NewInt32(ctx, static_cast<int32_t>(top));                                                                 \
    };                                                                                                                      \
                                                                                                                            \
    static JSValue GetStyleWidth (JSContext *ctx, JSValueConst this_val, int argc, JSValueConst *argv) {                    \
        lv_refr_now(NULL);                                                                                                  \
        COMP_REF* s = (COMP_REF*)JS_GetOpaque3(this_val);                                                                   \
        lv_obj_t* instance = static_cast<lv_obj_t*>(((COMPONENT*)(s->comp))->instance);                                     \
        lv_coord_t width = lv_obj_get_width(instance);                                                                      \
        return JS_NewInt32(ctx, static_cast<int32_t>(width));                                                               \
    };                                                                                                                      \
                                                                                                                            \
    static JSValue GetStyleHeight (JSContext *ctx, JSValueConst this_val, int argc, JSValueConst *argv) {                   \
        lv_refr_now(NULL);                                                                                                  \
        COMP_REF* s = (COMP_REF*)JS_GetOpaque3(this_val);                                                                   \
        lv_obj_t* instance = static_cast<lv_obj_t*>(((COMPONENT*)(s->comp))->instance);                                     \
        lv_coord_t height = lv_obj_get_height(instance);                                                                    \
        return JS_NewInt32(ctx, static_cast<int32_t>(height));                                                              \
    };                                                                                                                      \
                                                                                                                            \
    static JSValue GetStyleBoundClinetRect (JSContext *ctx, JSValueConst this_val, int argc, JSValueConst *argv) {          \
        lv_refr_now(NULL);                                                                                                  \
        COMP_REF* s = (COMP_REF*)JS_GetOpaque3(this_val);                                                                   \
        lv_obj_t* instance = static_cast<lv_obj_t*>(((COMPONENT*)(s->comp))->instance);                                     \
        lv_coord_t width = lv_obj_get_width(instance);                                                                      \
        lv_coord_t height = lv_obj_get_height(instance);                                                                    \
        lv_coord_t left = lv_obj_get_x(instance);                                                                           \
        lv_coord_t top = lv_obj_get_y(instance);                                                                            \
        JSValue obj = JS_NewObject(ctx);                                                                                    \
        JS_SetPropertyStr(ctx, obj, "width", JS_NewInt32(ctx, static_cast<int32_t>(width)));                                \
        JS_SetPropertyStr(ctx, obj, "height", JS_NewInt32(ctx, static_cast<int32_t>(height)));                              \
        JS_SetPropertyStr(ctx, obj, "left", JS_NewInt32(ctx, static_cast<int32_t>(left)));                                  \
        JS_SetPropertyStr(ctx, obj, "top", JS_NewInt32(ctx, static_cast<int32_t>(top)));                                    \
        return obj;                                                                                                         \
    };                                                                                                                      \
                                                                                                                            \
    static const JSCFunctionListEntry style_funcs[] = {                                                                     \
        SJS_CFUNC_DEF("left", 0, GetStyleLeft),                                                                             \
        SJS_CFUNC_DEF("top", 0, GetStyleTop),                                                                               \
        SJS_CFUNC_DEF("width", 0, GetStyleWidth),                                                                           \
        SJS_CFUNC_DEF("height", 0, GetStyleHeight),                                                                         \
    };                                                                                                                      \
                                                                                                                                                                                        \
