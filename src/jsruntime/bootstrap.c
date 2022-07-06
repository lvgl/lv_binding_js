#include "sjs.h"
#include "utils.h"
#include <stdlib.h>

BOOL SJSBootStrapCore (SJSRuntime* qrt) {
    if (!COREJSAPI_INITED) {
        JSValue global_obj = JS_GetGlobalObject(qrt->ctx);
        SJSPrintInit(qrt, global_obj);
        SJSNetworkInit(qrt, global_obj);
        SJSTimersInit(qrt, global_obj);
        SJSXHRInit(qrt, global_obj);
        SJSProcessInit(qrt, global_obj);
        SJSInitOS(qrt, global_obj);
        SJSFSInit(qrt, global_obj);
        COREJSAPI_INITED = TRUE;
        JS_SetPropertyFunctionList(qrt->ctx, global_obj, SJSNativeFunction, countof(SJSNativeFunction));
        JS_FreeValue(qrt->ctx, global_obj);
    }
}

void SJSBootStrapGlobals(JSContext *ctx, char *filepath) {
    uint8_t *buf;
    size_t buf_len;
    buf = js_load_file(ctx, &buf_len, filepath);
    JSValue val = JS_Eval(ctx, buf, buf_len, filepath, JS_EVAL_TYPE_GLOBAL | JS_EVAL_FLAG_COMPILE_ONLY);

    JSModuleSetImportMeta(ctx, val, TRUE);

    JSValue ret = JS_EvalFunction(ctx, val);
    if (JS_IsException(ret)) {
        SJSDumpError(ctx);
    }

    JS_FreeValue(ctx, ret);
};

static void SJSWrapFunction (char* buf, char* content, size_t* pbuf_len, char** params, size_t paramc) {
    strcat(buf, "(function (");
    int i;
    for (i = 0; i < paramc; i++) {
        strcat(buf, params[i]);
        if (i != paramc - 1) {
            strcat(buf, ",");
        }
    }
    strcat(buf, ") {");
    strcat(buf, content);
    strcat(buf, "})");

    *pbuf_len = strlen(buf);
}

static JSValue SJSExecuteBootStrapper (JSContext* ctx, char* path, char** params, size_t paramc, JSValue* argv, size_t argc) {
    char fullPath[PATH_MAX] = {0};
    size_t buflen;
    size_t newbuflen;

    GetProgramDir(fullPath);
    strcat(fullPath, SJSPATHSEP);
    strcat(fullPath, "lib");
    strcat(fullPath, SJSPATHSEP);
    strcat(fullPath, path);

    char* buf = js_load_file(ctx, &buflen, fullPath);
    char newbuf[buflen + 1000];
    newbuf[0] = '\0';
    SJSWrapFunction(newbuf, buf, &newbuflen, params, paramc);

    JSValue func_val = JS_Eval(
        ctx,
        newbuf,
        newbuflen,
        path,
        JS_EVAL_TYPE_GLOBAL
    );
    JSValue globalObj = JS_GetGlobalObject(ctx);
    JSValue ret = JS_Call(ctx, func_val, globalObj, argc, argv);
    if (JS_IsException(ret)) {
        SJSDumpError(ctx);
    }
    JS_FreeValue(ctx, globalObj);
    JS_FreeValue(ctx, func_val);
    free(buf);
    return ret;
};

void SJSBootstrap (JSContext* ctx) {
    JSValue bootstrapLoader = SJSExecuteBootStrapper(ctx, "internal/bootstrap/loader.js", NULL, 0, NULL, 0);

    JSValue requireFunc = JS_GetPropertyStr(ctx, bootstrapLoader, "require");
    JSValue NativeModule = JS_GetPropertyStr(ctx, bootstrapLoader, "NativeModule");
    
    char** params1[1];
    JSValue argv1[1];
    params1[0] = "require";
    argv1[0] = requireFunc;
    SJSExecuteBootStrapper(ctx, "internal/modules/run_main.js", params1, 1, argv1, 1);

    JS_FreeValue(ctx, requireFunc);
    JS_FreeValue(ctx, NativeModule);
    JS_FreeValue(ctx, bootstrapLoader);
}