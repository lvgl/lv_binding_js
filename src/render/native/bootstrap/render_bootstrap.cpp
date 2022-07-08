#include "render_bootstrap.hpp"

#define NATIVE_RENDER_OBJ "NativeRender"

void NativeRenderInit (JSContext* ctx) {
    JSValue JSBridge = SJSGetJSBridge(ctx);

    JSValue obj = JS_NewObject(ctx);
    JS_SetPropertyStr(ctx, JSBridge, NATIVE_RENDER_OBJ, obj);
    JS_FreeValue(ctx, JSBridge);
    
    NativeComponentInit(ctx, obj);
};