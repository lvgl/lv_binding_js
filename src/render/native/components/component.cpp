#include "Components.h"

#define NATIVE_COMPONENT "NativeComponents"

void NativeComponentInit (JSContext* ctx, JSValue ns) {
    JSValue component_obj = JS_NewObject(ctx);
    JS_SetPropertyStr(ctx, ns, NATIVE_COMPONENT, component_obj);

    NativeComponentViewInit(ctx, component_obj);
};