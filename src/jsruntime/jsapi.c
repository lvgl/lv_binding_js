#include <quickjs.h>

#include <jsapi.h>

#include <sjs.h>

#include <stdlib.h>

#define JSBRIDGE "SJSJSBridge"

static BOOL jsapi_inited;

static Array jsapi_list;

BOOL SJSJSApiListInit () {
    if (!jsapi_inited) {
        jsapi_list = ArrayCreat(2, sizeof(JSCFunctionListEntry));
        jsapi_inited = TRUE;
    }
}

BOOL SJSRegistJSApi (JSCFunctionListEntry* data) {
    SJSJSApiListInit();

    ArrayAppend(&jsapi_list, data);
}

BOOL SJSClearJSApi () {
    printf("clear jsapiList \n");
    free(jsapi_list.array);
}

JSValue SJSGetJSBridge (JSContext* ctx) {
    JSValue globalObj = JS_GetGlobalObject(ctx);
    JSValue jsBridge = JS_GetPropertyStr(ctx, globalObj, JSBRIDGE);
    JS_FreeValue(ctx, globalObj);
    return jsBridge;
}

BOOL SJSJSApiInit(SJSRuntime *qrt) {
    int i;
    JSContext* ctx = qrt->ctx;
    JSValue globalObj = JS_GetGlobalObject(qrt->ctx);
    JSValue jsBridge = JS_GetPropertyStr(ctx, globalObj, JSBRIDGE);

    JS_SetPropertyFunctionList(ctx, jsBridge, jsapi_list.array, jsapi_list.size);
    JS_FreeValue(ctx, globalObj);
    JS_FreeValue(ctx, jsBridge);
}

BOOL SJSJSBridgeInit (SJSRuntime *qrt) {
    JSValue globalObj = JS_GetGlobalObject(qrt->ctx);
    JSAtom jsbridge_atom = JS_NewAtom(qrt->ctx, JSBRIDGE);
    JSValue jsBridge = JS_NewObjectProto(qrt->ctx, JS_NULL);
    JS_SetProperty(qrt->ctx, globalObj, jsbridge_atom, jsBridge);
    JS_FreeValue(qrt->ctx, globalObj);
    JS_FreeAtom(qrt->ctx, jsbridge_atom);
}