#ifndef SJS_H
#define SJS_H

#include <quickjs.h>
#include <quickjs-libc.h>
#include <curl/curl.h>
#include <uv.h>

#include "util.h"

typedef struct SJSRunOptions {
    size_t mem_limit;
    size_t stack_size;
} SJSRunOptions;

typedef struct SJSRuntime {
    SJSRunOptions options;
    JSRuntime *rt;
    JSContext *ctx;
    uv_loop_t loop;
    struct {
        uv_check_t check;
        uv_idle_t idle;
        uv_prepare_t prepare;
    } jobs;
    struct {
        CURLM *curlm_h;
        uv_timer_t timer;
    } curl_ctx;
    uv_async_t stop;
    void (*uv_loop_inject)();
    BOOL is_worker;
    BOOL foreverLoop;
    void *user_opaque;
    struct {
        JSValue date_ctor;
        JSValue u8array_ctor;
    } builtins;
} SJSRuntime;

SJSRuntime *SJSNewRuntimeOptions(SJSRunOptions *options);

SJSRuntime *SJSNewRuntimeInternal(BOOL is_worker, SJSRunOptions *options);

void SJSDefaultOptions(SJSRunOptions *options);

void SJSRunMain(SJSRuntime *qrt);

BOOL SJSRun(SJSRuntime *qrt);

BOOL SJSFreeRuntime(SJSRuntime* qrt);

void* SJSGetRuntimeOpaque (JSContext* ctx);

void* SJSSetRuntimeOpaque (SJSRuntime* qrt, void* data);

void SJSBootStrapGlobals(JSContext *ctx, char* filePath);

void SJSExecuteJobs(JSContext *ctx);

BOOL SJSDisableForeverLoop (SJSRuntime *qrt);

void SJSXHRInit(SJSRuntime* qrt, JSValue ns);

BOOL SJSPrintInit (SJSRuntime *qrt, JSValue ns);

BOOL SJSNetworkInit (SJSRuntime *qrt, JSValue ns);

void SJSProcessInit(SJSRuntime *qrt, JSValue ns);

void SJSTimersInit(SJSRuntime *qrt, JSValue ns);

int JSModuleSetImportMeta(JSContext *ctx, JSValueConst func_val, JS_BOOL is_main);

JSModuleDef *SJSModuleLoader(JSContext *ctx, const char *module_name, void *opaque);

char *JSModuleNormalizeName(JSContext *ctx, const char *base_name, const char *name);

JSValue SJSThrowErrno(JSContext *ctx, int err);

void SJSInitOS(SJSRuntime* qrt, JSValue ns);

JSValue SJSNewError(JSContext *ctx, int err);

void SJSFSInit(SJSRuntime* qrt, JSValue ns);

void SJSInjectBuiltInLibPath(JSContext *ctx, char* p);

void SJSSetupArgs (int a, char **b);

BOOL SJSBootStrapCore (SJSRuntime* qrt);

#define SJS_UVCONST(x) JS_PROP_INT32_DEF(#x, UV_ ## x, JS_PROP_ENUMERABLE)
#define SJS_CONST(x) JS_PROP_INT32_DEF(#x, x, JS_PROP_ENUMERABLE)
#define SJS_CONST2(name, val) JS_PROP_INT32_DEF(name, val, JS_PROP_ENUMERABLE)
#define SJS_CFUNC_DEF(name, length, func1) { name, JS_PROP_C_W_E, JS_DEF_CFUNC, 0, .u = { .func = { length, JS_CFUNC_generic, { .generic = func1 } } } }
#define SJS_CFUNC_MAGIC_DEF(name, length, func1, magic) { name, JS_PROP_C_W_E, JS_DEF_CFUNC, magic, .u = { .func = { length, JS_CFUNC_generic_magic, { .generic_magic = func1 } } } }
#define SJS_CGETSET_DEF(name, fgetter, fsetter) { name, JS_PROP_C_W_E, JS_DEF_CGETSET, 0, .u = { .getset = { .get = { .getter = fgetter }, .set = { .setter = fsetter } } } }
#define SJS_OBJECT_DEF(name, val, len) JS_OBJECT_DEF(name, val, len, JS_PROP_WRITABLE | JS_PROP_CONFIGURABLE)

#endif