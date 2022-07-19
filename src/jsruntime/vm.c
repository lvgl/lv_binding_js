#include <sjs.h>
#include <jsapi.h>

#include <string.h>
#include <unistd.h>
#include <stdio.h>
#include <sys/time.h>

void* SJSGetRuntimeOpaque (JSContext* ctx) {
    SJSRuntime* qrt = JS_GetContextOpaque(ctx);
    return qrt->user_opaque;
}

void* SJSSetRuntimeOpaque (SJSRuntime* qrt, void* data) {
    qrt->user_opaque = data;
}

static void UVStop(uv_async_t *handle) {
    SJSRuntime *qrt = handle->data;

    uv_stop(&qrt->loop);
}

#define SJS_DEFAULT_STACK_SIZE 1048576

void SJSDefaultOptions(SJSRunOptions *options) {
    static SJSRunOptions default_options = {
        .mem_limit = -1,
        .stack_size = SJS_DEFAULT_STACK_SIZE
    };

    memcpy(options, &default_options, sizeof(*options));
}

SJSRuntime* SJSNewRuntimeOptions(SJSRunOptions *options) {
    return SJSNewRuntimeInternal(FALSE, options);
}

SJSRuntime* SJSNewRuntimeInternal(BOOL is_worker, SJSRunOptions *options) {
    SJSRuntime *qrt = calloc(1, sizeof(*qrt));
    memcpy(&(qrt->options), options, sizeof(options));

    qrt->rt = JS_NewRuntime();
    qrt->ctx = JS_NewContext(qrt->rt);

    JS_SetRuntimeOpaque(qrt->rt, qrt);
    JS_SetContextOpaque(qrt->ctx, qrt);

    JS_SetModuleLoaderFunc(qrt->rt, JSModuleNormalizeName, SJSModuleLoader, qrt);

    /* Set memory limit */
    JS_SetMemoryLimit(qrt->rt, options->mem_limit);

    /* Set stack size */
    JS_SetMaxStackSize(qrt->rt, options->stack_size);

    /* Enable BigFloat and BigDecimal */
    JS_AddIntrinsicBigFloat(qrt->ctx);
    JS_AddIntrinsicBigDecimal(qrt->ctx);

    JSValue global_obj = JS_GetGlobalObject(qrt->ctx);
    qrt->builtins.u8array_ctor = JS_GetPropertyStr(qrt->ctx, global_obj, "Uint8Array");
    JS_FreeValue(qrt->ctx, global_obj);

    qrt->is_worker = is_worker;

    uv_loop_init(&qrt->loop);

    uv_idle_init(&qrt->loop, &qrt->jobs.idle);
    qrt->jobs.idle.data = qrt;

    SJSJSBridgeInit(qrt);

    SJSBootStrapCore(qrt);

    SJSJSApiInit(qrt);
    return qrt;
};

static char* SJSMakeEntryCommonJS (char* buf, size_t *pbuf_len, char* filePath) {
    strcat(buf, "(function () { __loadMainModule(\"");
    strcat(buf, filePath);
    strcat(buf, "\")})()");

    *pbuf_len = strlen(buf);
};

void SJSRunMain(SJSRuntime *qrt) {
    size_t buf_len;
    char buf[1000]= {0};
    JSContext *ctx = qrt->ctx;

    SJSBootstrap(ctx);
};

BOOL SJSFreeRuntime(SJSRuntime* qrt) {
    if (qrt->foreverLoop) {
        uv_unref((uv_handle_t *) &qrt->jobs.idle);
    }

    uv_idle_stop((uv_handle_t *) &qrt->jobs.idle);

    JS_FreeValue(qrt->ctx, qrt->builtins.u8array_ctor);
    
    JS_FreeContext(qrt->ctx);
    JS_FreeRuntime(qrt->rt);

    if (qrt->curl_ctx.curlm_h) {
        curl_multi_cleanup(qrt->curl_ctx.curlm_h);
        uv_close((uv_handle_t *) &qrt->curl_ctx.timer, NULL);
    }

    int closed = 0;
    for (int i = 0; i < 5; i++) {
        if (uv_loop_close(&qrt->loop) == 0) {
            closed = 1;
            break;
        }
        uv_run(&qrt->loop, UV_RUN_NOWAIT);
    }

    free(qrt);
};

#define UI_TIME 16

static void SJSUVIdleCallback(uv_idle_t *handle) {
    SJSRuntime *qrt = handle->data;

    if (qrt->ui_handler) {
        struct timeval tstart,tcur,tsub;
        gettimeofday(&tstart, NULL);

        while (1) {
            qrt->ui_handler();
            usleep(5 * 1000);
            gettimeofday(&tcur, NULL);
            timersub(&tcur, &tstart, &tsub);
            if ((tsub.tv_sec * 1000 + (1.0 * tsub.tv_usec) / 1000) > UI_TIME) {
                break;
            }
        }
    }

    SJSExecuteJobs(qrt->ctx);
};

void SJSExecuteJobs(JSContext *ctx) {
    JSContext *ctx1;
    int err;

    for (;;) {
        err = JS_ExecutePendingJob(JS_GetRuntime(ctx), &ctx1);
        if (err <= 0) {
            if (err < 0) {
                SJSDumpError(ctx1);
            }
            break;
        }
    }
};

BOOL SJSDisableForeverLoop (SJSRuntime *qrt) {
    uv_unref((uv_handle_t *) &qrt->jobs.idle);
};

BOOL SJSRunLoop(SJSRuntime *qrt) {
    uv_idle_start(&qrt->jobs.idle, SJSUVIdleCallback);

    if (!qrt->foreverLoop) {
        uv_unref((uv_handle_t *) &qrt->jobs.idle);
    }

    uv_run(&qrt->loop, UV_RUN_DEFAULT);

    int ret = 0;
    JSValue exc = JS_GetException(qrt->ctx);
    if (!JS_IsNull(exc)) {
        SJSDumpError1(qrt->ctx, exc);
        ret = 1;
    }

    JS_FreeValue(qrt->ctx, exc);

    return ret;
};