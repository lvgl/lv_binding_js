#include "sjs.h"

static int SJSArgc = 0;
static char **SJSArgv = NULL;

void SJSSetupArgs (int a, char **b) {
    SJSArgc = a;
    SJSArgv = b;
};

JSValue SJSGetArgs(JSContext *ctx) {
    JSValue args = JS_NewArray(ctx);
    for (int i = 0; i < SJSArgc; i++) {
        JS_SetPropertyUint32(ctx, args, i, JS_NewString(ctx, SJSArgv[i]));
    }
    return args;
}

static JSValue SJSGetPwd(JSContext *ctx, JSValueConst this_val, int argc, JSValueConst *argv) {
    char buf[PATH_MAX];
    getcwd(buf, sizeof(buf));

    JSValue result = JS_NewString(ctx, buf);
    return result;
};

static JSValue SJSGetEnv(JSContext *ctx, JSValueConst this_val, int argc, JSValueConst *argv) {
    uv_env_item_t *env;
    int envcount, r;

    r = uv_os_environ(&env, &envcount);
    if (r != 0)
        return SJSThrowErrno(ctx, r);

    JSValue obj = JS_NewObjectProto(ctx, JS_NULL);

    for (int i = 0; i < envcount; i++) {
        JS_DefinePropertyValueStr(ctx, obj, env[i].name, JS_NewString(ctx, env[i].value), JS_PROP_C_W_E);
    }

    uv_os_free_environ(env, envcount);

    return obj;
};

static JSValue SJSGetExecPath (JSContext *ctx, JSValueConst this_val, int argc, JSValueConst *argv) {
    char buf[PATH_MAX];
    GetProgramDir(buf);

    JSValue result = JS_NewString(ctx, buf);
    return result;
};

static const JSCFunctionListEntry ProcessFuncs[] = {
    SJS_CFUNC_DEF("cwd", 1, SJSGetPwd),
    SJS_CGETSET_DEF("env", SJSGetEnv, NULL),
    SJS_CGETSET_DEF("execPath", SJSGetExecPath, NULL),
    SJS_CGETSET_DEF("argv", SJSGetArgs, NULL),
};

void SJSProcessInit(SJSRuntime *qrt, JSValue ns) {
    JSValue obj = JS_NewObjectProto(qrt->ctx, JS_NULL);
    JS_DefinePropertyValueStr(qrt->ctx, obj, "platform", JS_NewString(qrt->ctx, SJSPLATFORM), JS_PROP_C_W_E);
    JS_SetPropertyFunctionList(qrt->ctx, obj, ProcessFuncs, countof(ProcessFuncs));

    JS_DefinePropertyValueStr(qrt->ctx, ns, "process", obj, JS_PROP_C_W_E);
};