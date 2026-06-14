#pragma once

#include "lv_bindings_js.h"

#include <vector>
#include <string>

#include "native/core/utils/utils.hpp"

struct COMP_REF {
    void* comp = nullptr;

private:
    const char* uid_ = nullptr;

public:
    const char* getUid() const { return uid_; }

    friend void CompRefStoreUid(JSContext* ctx, COMP_REF* ref, const char* uid);
    friend void CompRefFreeUid(JSRuntime* rt, COMP_REF* ref);
};

void CompRefStoreUid(JSContext* ctx, COMP_REF* ref, const char* uid);
void CompRefFreeUid(JSRuntime* rt, COMP_REF* ref);

template<typename Component>
static void CompRefFinalizer(JSRuntime* rt, JSValue val, JSClassID class_id, const char* comp_name) {
    COMP_REF* th = (COMP_REF*)JS_GetOpaque(val, class_id);
    if (!th) {
        return;
    }
    LV_LOG_USER("%s %s release", comp_name, th->getUid());
    if (th->comp) {
        delete static_cast<Component*>(th->comp);
        th->comp = nullptr;
    }
    CompRefFreeUid(rt, th);
    js_free_rt(rt, th);
}

#define COMP_FINALIZER(FinalizerName, Component, ClassID) \
    static void FinalizerName(JSRuntime* rt, JSValue val) { \
        CompRefFinalizer<Component>(rt, val, ClassID, #Component); \
    }

lv_obj_t* GetWindowInstance ();

void WindowInit ();

void NativeComponentViewInit (JSContext* ctx, JSValue ns);

void NativeComponentInit (JSContext* ctx, JSValue ns);

void NativeComponentTextInit (JSContext* ctx, JSValue ns);

void NativeComponentImageInit (JSContext* ctx, JSValue ns);

void NativeComponentButtonInit (JSContext* ctx, JSValue ns);

void NativeComponentArcInit (JSContext* ctx, JSValue ns);

void NativeComponentSliderInit (JSContext* ctx, JSValue ns);

void NativeComponentSwitchInit (JSContext* ctx, JSValue ns);

void NativeComponentTextareaInit (JSContext* ctx, JSValue ns);

void NativeComponentKeyboardInit (JSContext* ctx, JSValue ns);

void NativeComponentCheckboxInit (JSContext* ctx, JSValue ns);

void NativeComponentDropdownlistInit (JSContext* ctx, JSValue ns);

void NativeComponentProgressBarInit (JSContext* ctx, JSValue ns);

void NativeComponentRollerInit (JSContext* ctx, JSValue ns);

void NativeComponentLineInit (JSContext* ctx, JSValue ns);

void NativeComponentCalendarInit (JSContext* ctx, JSValue ns);

void NativeComponentGIFInit (JSContext* ctx, JSValue ns);

void NativeComponentTabViewInit (JSContext* ctx, JSValue ns);

void NativeComponentChartInit (JSContext* ctx, JSValue ns);

void NativeComponentMaskInit (JSContext* ctx, JSValue ns);

/* TJS_CFUNC_DEF(name, length, func): use length 0 for all lvgljs bindings; validate argc in handlers.
 * See doc/wiki/Native-JS-Bindings.md */

#define WRAPPED_INT32_VALUE(COMPONENT,COMPONENT_NAME,PROPERTY_NAME) \
    static JSValue NativeCompSet##PROPERTY_NAME(JSContext *ctx, JSValueConst this_val, int argc, JSValueConst *argv) { \
        if (argc >= 1 && JS_IsNumber(argv[0])) { \
            COMP_REF* ref = (COMP_REF*)JS_GetOpaque(this_val, COMPONENT##ClassID); \
            int32_t value; \
            JS_ToInt32(ctx, &value, argv[0]); \
            \
            ((COMPONENT *)(ref->comp))->set##PROPERTY_NAME(value); \
            LV_LOG_USER(COMPONENT_NAME "%s set" #PROPERTY_NAME, ref->getUid()); \
        } \
        return JS_UNDEFINED; \
    }; \
    \

#define WRAPPED_APPEND_CHILD(COMPONENT,COMPONENT_NAME)                                                                      \
    static JSValue NativeCompAppendChild(JSContext *ctx, JSValueConst this_val, int argc, JSValueConst *argv) {             \
        if (argc >= 1 && JS_IsObject(argv[0])) {                                                                            \
            JSClassID _class_id;                                                                                            \
            COMP_REF* child = (COMP_REF*)JS_GetAnyOpaque(argv[0], &_class_id);                                              \
            COMP_REF* parent = (COMP_REF*)JS_GetAnyOpaque(this_val, &_class_id);                                            \
                                                                                                                            \
            ((COMPONENT*)(parent->comp))->appendChild((void*)(child->comp));                                                \
            LV_LOG_USER("%s %s append child %s", COMPONENT_NAME, parent->getUid(), child->getUid());                        \
        }                                                                                                                   \
        return JS_UNDEFINED;                                                                                                \
    };                                                                                                                      \
                                                                                                                            \

// Host child removal is handled in JS (reconciler detachInstance + close()).
// Do not add WRAPPED_REMOVE_CHILD; lv_obj teardown does not use native removeChild.

#define WRAPPED_INSERT_CHILD(COMPONENT,COMPONENT_NAME)                                                                      \
    static JSValue NativeCompInsertChildBefore(JSContext *ctx, JSValueConst this_val, int argc, JSValueConst *argv) {       \
        if (argc >= 1 && JS_IsObject(argv[0])) {                                                                            \
            JSClassID _class_id;                                                                                            \
            COMP_REF* child = (COMP_REF*)JS_GetAnyOpaque(argv[0], &_class_id);                                              \
            COMP_REF* parent = (COMP_REF*)JS_GetAnyOpaque(this_val, &_class_id);                                            \
                                                                                                                            \
            ((COMPONENT*)(parent->comp))->insertChildBefore((void*)(child->comp));                                          \
            LV_LOG_USER("%s %s insertChildBefore %s", COMPONENT_NAME, parent->getUid(), child->getUid());                   \
        }                                                                                                                   \
        return JS_UNDEFINED;                                                                                                \
    };                                                                                                                      \
                                                                                                                            \

#define WRAPPED_MOVE_TO_FRONT(COMPONENT,COMPONENT_NAME)                                                                     \
    static JSValue NativeCompMoveToFront(JSContext *ctx, JSValueConst this_val, int argc, JSValueConst *argv) {             \
        COMP_REF* ref = (COMP_REF*)JS_GetOpaque(this_val, COMPONENT##ClassID);                                              \
                                                                                                                            \
        ((COMPONENT*)(ref->comp))->moveToFront();                                                                           \
        LV_LOG_USER("%s %s moveToFront", COMPONENT_NAME, ref->getUid());                                                    \
        return JS_UNDEFINED;                                                                                                \
    };                                                                                                                      \
                                                                                                                            \

#define WRAPPED_MOVE_TO_BACKGROUND(COMPONENT,COMPONENT_NAME)                                                                \
    static JSValue NativeCompMoveToBackground(JSContext *ctx, JSValueConst this_val, int argc, JSValueConst *argv) {        \
        COMP_REF* ref = (COMP_REF*)JS_GetOpaque(this_val, COMPONENT##ClassID);                                              \
                                                                                                                            \
        ((COMPONENT*)(ref->comp))->moveToBackground();                                                                      \
        LV_LOG_USER("%s %s moveToBackground", COMPONENT_NAME, ref->getUid());                                               \
        return JS_UNDEFINED;                                                                                                \
    };                                                                                                                      \
                                                                                                                            \

#define WRAPPED_SCROLL_INTO_VIEW(COMPONENT,COMPONENT_NAME)                                                                  \
    static JSValue NativeCompScrollIntoView(JSContext *ctx, JSValueConst this_val, int argc, JSValueConst *argv) {          \
        COMP_REF* ref = (COMP_REF*)JS_GetOpaque(this_val, COMPONENT##ClassID);                                              \
                                                                                                                            \
        ((COMPONENT*)(ref->comp))->scrollIntoView();                                                                        \
        LV_LOG_USER("%s %s scrollIntoView", COMPONENT_NAME, ref->getUid());                                                 \
        return JS_UNDEFINED;                                                                                                \
    };                                                                                                                      \
                                                                                                                            \

#define WRAPPED_JS_SETSTYLE(COMPONENT,COMPONENT_NAME)                                                                       \
    static JSValue NativeCompSetStyle(JSContext* ctx, JSValueConst this_val, int argc, JSValueConst* argv) {                \
        if (argc >= 3 && JS_IsObject(argv[0]) && JS_IsNumber(argv[1]) && JS_IsBool(argv[2])) {                              \
            int32_t type;                                                                                                   \
            bool isinit;                                                                                                    \
                                                                                                                            \
            COMP_REF* ref = (COMP_REF*)JS_GetOpaque(this_val, COMPONENT##ClassID);                                          \
            JS_ToInt32(ctx, &type, argv[1]);                                                                                \
            isinit = JS_ToBool(ctx, argv[2]);                                                                               \
                                                                                                                            \
            static_cast<COMPONENT*>(ref->comp)->BasicComponent::setStyle(ctx, argv[0], type, isinit);                       \
            LV_LOG_USER("%s %s setStyle type %d", COMPONENT_NAME, ref->getUid(), type);                                     \
        }                                                                                                                   \
        return JS_UNDEFINED;                                                                                                \
    }                                                                                                                       \
                                                                                                                            \

#define WRAPPED_JS_AddEventListener(COMPONENT,COMPONENT_NAME)                                                               \
    static JSValue NativeCompAddEventListener(JSContext *ctx, JSValueConst this_val, int argc, JSValueConst *argv) {        \
        if (argc >= 1 && JS_IsNumber(argv[0])) {                                                                            \
            COMP_REF* s = (COMP_REF*)JS_GetOpaque(this_val, COMPONENT##ClassID);                                            \
            int event_type;                                                                                                 \
            JS_ToInt32(ctx, &event_type, argv[0]);                                                                          \
            ((COMPONENT*)(s->comp))->addEventListener(event_type);                                                          \
            return JS_NewBool(ctx, 1);                                                                                      \
        }                                                                                                                   \
        return JS_NewBool(ctx, 0);                                                                                          \
    }                                                                                                                       \
                                                                                                                            \

#define WRAPPED_JS_RemoveEventListener(COMPONENT,COMPONENT_NAME)                                                            \
    static JSValue NativeCompRemoveEventListener(JSContext *ctx, JSValueConst this_val, int argc, JSValueConst *argv) {     \
        if (argc >= 1 && JS_IsNumber(argv[0])) {                                                                            \
            COMP_REF* s = (COMP_REF*)JS_GetOpaque(this_val, COMPONENT##ClassID);                                            \
            int event_type;                                                                                                 \
            JS_ToInt32(ctx, &event_type, argv[0]);                                                                          \
            ((COMPONENT*)(s->comp))->removeEventListener(event_type);                                                       \
            return JS_NewBool(ctx, 1);                                                                                      \
        }                                                                                                                   \
        return JS_NewBool(ctx, 0);                                                                                          \
    }                                                                                                                       \
                                                                                                                            \

#define WRAPPED_JS_Align(COMPONENT,COMPONENT_NAME)                                                                          \
    static JSValue NativeCompSetAlign(JSContext *ctx, JSValueConst this_val, int argc, JSValueConst *argv) {                \
        if (argc >= 2 && JS_IsNumber(argv[0]) && JS_IsArray(argv[1])) {                                                \
            COMP_REF* s = (COMP_REF*)JS_GetOpaque(this_val, COMPONENT##ClassID);                                            \
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
            LV_LOG_USER("%s %s setAlign", COMPONENT_NAME, s->getUid());                                                     \
            JS_FreeValue(ctx, x_value);                                                                                     \
            JS_FreeValue(ctx, y_value);                                                                                     \
            return JS_NewBool(ctx, 1);                                                                                      \
        }                                                                                                                   \
        return JS_NewBool(ctx, 0);                                                                                          \
    }                                                                                                                       \
                                                                                                                            \

#define WRAPPED_JS_Align_To(COMPONENT,COMPONENT_NAME)                                                                       \
    static JSValue NativeCompSetAlignTo(JSContext *ctx, JSValueConst this_val, int argc, JSValueConst *argv) {              \
        if (argc >= 3 && JS_IsNumber(argv[0]) && JS_IsArray(argv[1]) && JS_IsObject(argv[2])) {                        \
            COMP_REF* s = (COMP_REF*)JS_GetOpaque(this_val, COMPONENT##ClassID);                                            \
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
            JSClassID _class_id;                                                                                            \
            COMP_REF* parent = (COMP_REF*)JS_GetAnyOpaque(argv[2], &_class_id);                                             \
                                                                                                                            \
            ((COMPONENT*)(s->comp))->BasicComponent::setAlignTo(align_type, x, y, static_cast<BasicComponent*>(parent->comp));   \
            LV_LOG_USER("%s %s setAlignTo", COMPONENT_NAME, s->getUid());                                                   \
            JS_FreeValue(ctx, x_value);                                                                                     \
            JS_FreeValue(ctx, y_value);                                                                                     \
            return JS_NewBool(ctx, 1);                                                                                      \
        }                                                                                                                   \
        return JS_NewBool(ctx, 0);                                                                                          \
    }                                                                                                                       \
                                                                                                                            \

#define WRAPPED_JS_BACKGROUND_IMAGE(COMPONENT,COMPONENT_NAME)                                                               \
    static JSValue NativeCompSetBackgroundImage(JSContext *ctx, JSValueConst this_val, int argc, JSValueConst *argv) {      \
        if (argc >= 3 && (JS_IsObject(argv[0]) || JS_IsNull(argv[0])) && JS_IsNumber(argv[1])) {                            \
            COMP_REF* s = (COMP_REF*)JS_GetOpaque(this_val, COMPONENT##ClassID);                                            \
            size_t size;                                                                                                    \
            int32_t type;                                                                                                   \
            int32_t image_bytelength = 0;                                                                                   \
            uint8_t* buf = nullptr;                                                                                         \
            std::string image_symbol;                                                                                       \
            if (JS_IsObject(argv[0])) {                                                                                     \
                buf = JS_GetArrayBuffer(ctx, &size, argv[0]);                                                               \
                JSValue byteLength = JS_GetPropertyStr(ctx, argv[0], "byteLength");                                         \
                JS_ToInt32(ctx, &image_bytelength, byteLength);                                                             \
            }                                                                                                               \
            if (JS_IsString(argv[2])) {                                                                                     \
                size_t len;                                                                                                 \
                const char* str = JS_ToCStringLen(ctx, &len, argv[2]);                                                      \
                image_symbol = str;                                                                                         \
                image_symbol.resize(len);                                                                                   \
                JS_FreeCString(ctx, str);                                                                                   \
            }                                                                                                               \
            JS_ToInt32(ctx, &type, argv[1]);                                                                                \
                                                                                                                            \
            ((COMPONENT*)(s->comp))->setBackgroundImage(buf, static_cast<size_t>(image_bytelength), type, image_symbol);    \
            LV_LOG_USER("%s %s setBackgroundImage type %d", COMPONENT_NAME, s->getUid(), type);                             \
            return JS_NewBool(ctx, 1);                                                                                      \
        }                                                                                                                   \
        return JS_NewBool(ctx, 0);                                                                                          \
    }                                                                                                                       \
                                                                                                                            \

#define WRAPPED_JS_REFRESH_COMPONENT(COMPONENT,COMPONENT_NAME)                                                              \
    static JSValue NativeCompRefreshComponent(JSContext *ctx, JSValueConst this_val, int argc, JSValueConst *argv) {        \
        COMP_REF* s = (COMP_REF*)JS_GetOpaque(this_val, COMPONENT##ClassID);                                                \
        lv_obj_invalidate(((BasicComponent*)(s->comp))->instance);                                                          \
        return JS_UNDEFINED;                                                                                                \
    }                                                                                                                       \
                                                                                                                            \

#define WRAPPED_JS_CLOSE_COMPONENT(COMPONENT,COMPONENT_NAME)                                                                \
    static JSValue NativeCompCloseComponent(JSContext *ctx, JSValueConst this_val, int argc, JSValueConst *argv) {          \
        COMP_REF* s = (COMP_REF*)JS_GetOpaque(this_val, COMPONENT##ClassID);                                                \
        if (s && s->comp) {                                                                                                 \
            delete (BasicComponent*)(s->comp);                                                                              \
            s->comp = nullptr;                                                                                              \
        }                                                                                                                   \
        return JS_UNDEFINED;                                                                                                \
    }                                                                                                                       \
                                                                                                                            \

#define STYLE_INFO(COMPONENT,COMPONENT_NAME)                                                                                \
    static JSValue GetStyleLeft (JSContext *ctx, JSValueConst this_val, int argc, JSValueConst *argv) {                     \
        lv_refr_now(NULL);                                                                                                  \
        COMP_REF* s = (COMP_REF*)JS_GetOpaque(this_val, COMPONENT##ClassID);                                                \
        lv_obj_t* instance = static_cast<lv_obj_t*>(((COMPONENT*)(s->comp))->instance);                                     \
        lv_coord_t left = lv_obj_get_x(instance);                                                                           \
        return JS_NewInt32(ctx, static_cast<int32_t>(left));                                                                \
    };                                                                                                                      \
                                                                                                                            \
    static JSValue GetStyleTop (JSContext *ctx, JSValueConst this_val, int argc, JSValueConst *argv) {                      \
        lv_refr_now(NULL);                                                                                                  \
        COMP_REF* s = (COMP_REF*)JS_GetOpaque(this_val, COMPONENT##ClassID);                                                \
        lv_obj_t* instance = static_cast<lv_obj_t*>(((COMPONENT*)(s->comp))->instance);                                     \
        lv_coord_t top = lv_obj_get_y(instance);                                                                            \
        return JS_NewInt32(ctx, static_cast<int32_t>(top));                                                                 \
    };                                                                                                                      \
                                                                                                                            \
    static JSValue GetStyleWidth (JSContext *ctx, JSValueConst this_val, int argc, JSValueConst *argv) {                    \
        lv_refr_now(NULL);                                                                                                  \
        COMP_REF* s = (COMP_REF*)JS_GetOpaque(this_val, COMPONENT##ClassID);                                                \
        lv_obj_t* instance = static_cast<lv_obj_t*>(((COMPONENT*)(s->comp))->instance);                                     \
        lv_coord_t width = lv_obj_get_width(instance);                                                                      \
        return JS_NewInt32(ctx, static_cast<int32_t>(width));                                                               \
    };                                                                                                                      \
                                                                                                                            \
    static JSValue GetStyleHeight (JSContext *ctx, JSValueConst this_val, int argc, JSValueConst *argv) {                   \
        lv_refr_now(NULL);                                                                                                  \
        COMP_REF* s = (COMP_REF*)JS_GetOpaque(this_val, COMPONENT##ClassID);                                                \
        lv_obj_t* instance = static_cast<lv_obj_t*>(((COMPONENT*)(s->comp))->instance);                                     \
        lv_coord_t height = lv_obj_get_height(instance);                                                                    \
        return JS_NewInt32(ctx, static_cast<int32_t>(height));                                                              \
    };                                                                                                                      \
                                                                                                                            \
    static JSValue GetStyleBoundClinetRect (JSContext *ctx, JSValueConst this_val, int argc, JSValueConst *argv) {          \
        lv_refr_now(NULL);                                                                                                  \
        COMP_REF* s = (COMP_REF*)JS_GetOpaque(this_val, COMPONENT##ClassID);                                                \
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
        TJS_CFUNC_DEF("left", 0, GetStyleLeft),                                                                             \
        TJS_CFUNC_DEF("top", 0, GetStyleTop),                                                                               \
        TJS_CFUNC_DEF("width", 0, GetStyleWidth),                                                                           \
        TJS_CFUNC_DEF("height", 0, GetStyleHeight),                                                                         \
    };
