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

        case COMP_TYPE_CHECKBOX:
            checked = lv_obj_get_state(ins->instance) & LV_STATE_CHECKED;
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
    int32_t value_num = 0;
    const char* value_str;
    char buf[32];

    switch (comp_type)
    {
        case COMP_TYPE_SLIDER:
            value_num = lv_slider_get_value(ins->instance);
            return JS_NewInt32(ctx, value_num);
            break;

        case COMP_TYPE_TEXTAREA:
            value_str = lv_textarea_get_text(ins->instance);
            return JS_NewString(ctx, value_str);

        case COMP_TYPE_DROPDOWNLIST:
            lv_dropdown_get_selected_str(ins->instance, buf, sizeof(buf));
            return JS_NewString(ctx, buf);

        case COMP_TYPE_ROLLER:
            lv_roller_get_selected_str(ins->instance, buf, sizeof(buf));
            return JS_NewString(ctx, buf);

        case COMP_TYPE_CALENDAR:
            lv_calendar_date_t date;
            std::string result;
            lv_calendar_get_pressed_date(ins->instance, &date);
            result.append(std::to_string(date.year));
            result.append("-");
            result.append(std::to_string(date.month));
            result.append("-");
            result.append(std::to_string(date.day));
            return JS_NewString(ctx, result.c_str());
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
    SJS_CGETSET_DEF("checked", GetChecked, NULL),
    SJS_CFUNC_DEF("stopPropagation", 0, NativeEventStopPropagation)
};

void NativeValueChangeEventWrapInit (JSContext* ctx) {
    JS_NewClassID(&WrapValueChangeEventID);
    JS_NewClass(JS_GetRuntime(ctx), WrapValueChangeEventID, &ValueChangeEventWrapClass);
    JSValue proto = JS_NewObject(ctx);
    JS_SetPropertyFunctionList(ctx, proto, component_proto_funcs, countof(component_proto_funcs));
    JS_SetClassProto(ctx, WrapValueChangeEventID, proto);
};