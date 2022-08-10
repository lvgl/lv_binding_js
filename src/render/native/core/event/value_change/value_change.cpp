#include "value_change.hpp"

WRAPPED_STOPPROPAGATION

static JSClassID WrapValueChangeEventID;

static void EventFinalizer(JSRuntime *rt, JSValue val) {
};

static JSClassDef ValueChangeEventWrapClass = {
    "ValueChange",
    .finalizer = EventFinalizer,
};

static JSValue GetChecked (JSContext* ctx, JSValueConst this_val) {
    lv_event_t* e = static_cast<lv_event_t*>(JS_GetOpaque(this_val, WrapValueChangeEventID));
    BasicComponent* ins = static_cast<BasicComponent*>(e->user_data);
    ECOMP_TYPE comp_type = ins->type;
    bool checked = false;

    switch (comp_type)
    {
        case COMP_TYPE_SWITCH:
            checked = lv_obj_has_state(ins->instance, LV_STATE_CHECKED);
            return JS_NewBool(ctx, checked);
            break;
        default:
            break;
    }

    return JS_UNDEFINED;
};

static JSValue GetValue (JSContext* ctx, JSValueConst this_val) {
    lv_event_t* e = static_cast<lv_event_t*>(JS_GetOpaque(this_val, WrapValueChangeEventID));
    BasicComponent* ins = static_cast<BasicComponent*>(e->user_data);
    ECOMP_TYPE comp_type = ins->type;
    int32_t value = 0;

    switch (comp_type)
    {
        case COMP_TYPE_SLIDER:
            value = lv_slider_get_value(ins->instance);
            return JS_NewInt32(ctx, value);
            break;
        
        default:
            break;
    }

    return JS_UNDEFINED;
};

JSValue WrapValueChangeEvent (lv_event_t* e, std::string uid) {
    SJSRuntime* qrt;
    JSContext* ctx;
    JSValue proto;
    JSValue obj;

    qrt = Engine::GetSJSInstance();
    ctx = qrt->ctx;
    proto = JS_GetClassProto(ctx, WrapValueChangeEventID);
    obj = JS_NewObjectProtoClass(ctx, proto, WrapValueChangeEventID);
    JS_FreeValue(ctx, proto);

    JS_SetOpaque(obj, e);

    return obj;
};

static const JSCFunctionListEntry component_proto_funcs[] = {
    SJS_CGETSET_DEF("value", GetValue, NULL),
    SJS_CGETSET_DEF("checked", GetChecked, NULL)
};

void NativeValueChangeEventWrapInit (JSContext* ctx) {
    JS_NewClassID(&WrapValueChangeEventID);
    JS_NewClass(JS_GetRuntime(ctx), WrapValueChangeEventID, &ValueChangeEventWrapClass);
    JSValue proto = JS_NewObject(ctx);
    JS_SetPropertyFunctionList(ctx, proto, component_proto_funcs, countof(component_proto_funcs));
    JS_SetClassProto(ctx, WrapValueChangeEventID, proto);
};