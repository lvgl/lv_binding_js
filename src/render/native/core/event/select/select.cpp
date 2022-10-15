#include "./select.hpp"

WRAPPED_STOPPROPAGATION

static JSClassID WrapSelectEventID;

static void EventFinalizer(JSRuntime *rt, JSValue val) {
};

static JSClassDef SelectEventWrapClass = {
    "Select",
    .finalizer = EventFinalizer,
};

static JSValue GetValue (JSContext* ctx, JSValueConst this_val) {
    lv_event_t* e = static_cast<lv_event_t*>(JS_GetOpaque(this_val, WrapSelectEventID));
    BasicComponent* comp = static_cast<BasicComponent*>(e->user_data);
    ECOMP_TYPE comp_type = comp->type;
    int32_t value_num = 0;

    switch (comp_type)
    {
        case COMP_TYPE_CHART:
            value_num = lv_chart_get_pressed_point(comp->instance);
            if(value_num == LV_CHART_POINT_NONE) break;
            return JS_NewInt32(ctx, value_num);
            break;
    }

    return JS_UNDEFINED;
};

JSValue WrapSelectEvent (lv_event_t* e, std::string uid) {
    SJSRuntime* qrt;
    JSContext* ctx;
    JSValue proto;
    JSValue obj;

    qrt = Engine::GetSJSInstance();
    ctx = qrt->ctx;
    proto = JS_GetClassProto(ctx, WrapSelectEventID);
    obj = JS_NewObjectProtoClass(ctx, proto, WrapSelectEventID);
    JS_FreeValue(ctx, proto);

    JS_SetOpaque(obj, e);

    return obj;
};

static const JSCFunctionListEntry component_proto_funcs[] = {
    SJS_CGETSET_DEF("value", GetValue, NULL),
    SJS_CFUNC_DEF("stopPropagation", 0, NativeEventStopPropagation)
};

void NativeSelectEventWrapInit (JSContext* ctx) {
    JS_NewClassID(&WrapSelectEventID);
    JS_NewClass(JS_GetRuntime(ctx), WrapSelectEventID, &SelectEventWrapClass);
    JSValue proto = JS_NewObject(ctx);
    JS_SetPropertyFunctionList(ctx, proto, component_proto_funcs, countof(component_proto_funcs));
    JS_SetClassProto(ctx, WrapSelectEventID, proto);
};