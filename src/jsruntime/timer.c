#include <sjs.h>
#include <jsapi.h>

typedef struct {
    JSContext *ctx;
    uv_timer_t handle;
    int interval;
    JSValue obj;
    JSValue func;
    int argc;
    JSValue argv[];
} SJSTimer;

static void SJSClearTimer(SJSTimer *th) {
    int i;
    JSContext *ctx = th->ctx;

    JS_FreeValue(ctx, th->func);
    th->func = JS_UNDEFINED;

    for (i = 0; i < th->argc; i++) {
        JS_FreeValue(ctx, th->argv[i]);
        th->argv[i] = JS_UNDEFINED;
    }
    th->argc = 0;

    JSValue obj = th->obj;
    th->obj = JS_UNDEFINED;
    JS_FreeValue(ctx, obj);
}

static void SJSInvokeTimerCallback(SJSTimer *th) {
    JSContext *ctx = th->ctx;
    JSValue ret, func1;
    /* 'func' might be destroyed when calling itself (if it frees the handler), so must take extra care */
    func1 = JS_DupValue(ctx, th->func);
    ret = JS_Call(ctx, func1, JS_UNDEFINED, th->argc, (JSValueConst *) th->argv);
    JS_FreeValue(ctx, func1);
    if (JS_IsException(ret))
        SJSDumpError(ctx);
    JS_FreeValue(ctx, ret);
}

static void uv__timer_close(uv_handle_t *handle) {
    SJSTimer *th = handle->data;
    free(th);
}

static void uv__timer_cb(uv_timer_t *handle) {
    SJSTimer *th = handle->data;

    /* Timer always executes before check phase in libuv,
       so clear the microtask queue here before running setTimeout macrotasks */
    SJSExecuteJobs(th->ctx);

    SJSInvokeTimerCallback(th);
    if (!th->interval)
        SJSClearTimer(th);
}

static JSClassID SJSTimerClassID;

static void SJSTimerFinalizer(JSRuntime *rt, JSValue val) {
    SJSTimer *th = JS_GetOpaque(val, SJSTimerClassID);
    if (th) {
        SJSClearTimer(th);
        uv_close((uv_handle_t *) &th->handle, uv__timer_close);
    }
}

static void SJSTimerMark(JSRuntime *rt, JSValueConst val, JS_MarkFunc *mark_func) {
    int i;
    SJSTimer *th = JS_GetOpaque(val, SJSTimerClassID);
    if (th) {
        JS_MarkValue(rt, th->func, mark_func);
        for (i = 0; i < th->argc; i++)
            JS_MarkValue(rt, th->argv[i], mark_func);
    }
}

static JSClassDef SJSTimerClass = {
    "Timer",
    .finalizer = SJSTimerFinalizer,
    .gc_mark = SJSTimerMark,
};

static JSValue SJSSetTimeout(JSContext *ctx, JSValueConst this_val, int argc, JSValueConst *argv, int magic) {
    int64_t delay;
    JSValueConst func;
    SJSTimer *th;
    JSValue obj;
    int i;

    func = argv[0];
    if (!JS_IsFunction(ctx, func))
        return JS_ThrowTypeError(ctx, "not a function");

    if (argc <= 1) {
        delay = 0;
    } else {
        if (JS_ToInt64(ctx, &delay, argv[1]))
            return JS_EXCEPTION;
    }

    obj = JS_NewObjectClass(ctx, SJSTimerClassID);
    if (JS_IsException(obj))
        return obj;

    int nargs = argc - 2;
    if (nargs < 0) {
        nargs = 0;
    }
    th = calloc(1, sizeof(*th) + nargs * sizeof(JSValue));
    if (!th) {
        JS_FreeValue(ctx, obj);
        return JS_EXCEPTION;
    }

    th->ctx = ctx;
    uv_timer_init(SJSGetLoop(ctx), &th->handle);
    th->handle.data = th;
    th->interval = magic;
    th->obj = JS_DupValue(ctx, obj);
    th->func = JS_DupValue(ctx, func);
    th->argc = nargs;
    for (i = 0; i < nargs; i++)
        th->argv[i] = JS_DupValue(ctx, argv[i + 2]);

    uv_timer_start(&th->handle, uv__timer_cb, delay, magic ? delay : 0 /* repeat */);

    JS_SetOpaque(obj, th);
    return obj;
};

static JSValue SJSClearTimeout(JSContext *ctx, JSValueConst this_val, int argc, JSValueConst *argv) {
    SJSTimer *th = JS_GetOpaque2(ctx, argv[0], SJSTimerClassID);
    if (!th)
        return JS_EXCEPTION;

    uv_timer_stop(&th->handle);
    SJSClearTimer(th);

    return JS_UNDEFINED;
};

static const JSCFunctionListEntry SJSTimerFuncs[] = {
    JS_CFUNC_MAGIC_DEF("setTimeout", 2, SJSSetTimeout, 0),
    SJS_CFUNC_DEF("clearTimeout", 1, SJSClearTimeout),
    JS_CFUNC_MAGIC_DEF("setInterval", 2, SJSSetTimeout, 1),
    SJS_CFUNC_DEF("clearInterval", 1, SJSClearTimeout)
};

void SJSTimersInit(SJSRuntime *qrt, JSValue ns) {
    JS_NewClassID(&SJSTimerClassID);
    JS_NewClass(qrt->rt, SJSTimerClassID, &SJSTimerClass);
    JS_SetPropertyFunctionList(qrt->ctx, ns, SJSTimerFuncs, 4);
};
