#include "component.hpp"

#define NATIVE_COMPONENT "NativeComponents"

void NativeComponentInit (JSContext* ctx, JSValue ns) {
    JSValue component_obj = JS_NewObject(ctx);
    JS_SetPropertyStr(ctx, ns, NATIVE_COMPONENT, component_obj);

    NativeComponentDropdownlistInit(ctx, component_obj);
    NativeComponentCheckboxInit(ctx, component_obj);
    NativeComponentKeyboardInit(ctx, component_obj);
    NativeComponentTextareaInit(ctx, component_obj);
    NativeComponentSliderInit(ctx, component_obj);
    NativeComponentButtonInit(ctx, component_obj);
    NativeComponentImageInit(ctx, component_obj);
    NativeComponentViewInit(ctx, component_obj);
    NativeComponentTextInit(ctx, component_obj);
    NativeComponentSwitchInit(ctx, component_obj);
    NativeComponentWindowInit (ctx, component_obj);
};