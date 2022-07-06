
#include <util.h>
#include <malloc.h>
#include <sjs.h>

Array ArrayCreat(size_t init_size, size_t item_size) {
    Array arr;

    arr.array = malloc(init_size * item_size);
    arr.total_size = init_size;
    arr.size = 0;
    arr.item_size = item_size;

    return arr;
};

BOOL ArrayAppend(Array *arr, void* data) {
    ArrayExpand(arr);

    // do copy
    memcpy((void *)(arr->array) + arr->size * arr->item_size, data, arr->item_size);
    arr->size++;
};

BOOL ArrayExpand (Array *arr) {
    if (arr->size >= arr->total_size) {
        size_t new_size = arr->total_size * 2 * arr->item_size;
        arr->array = realloc(arr->array, new_size);
        arr->total_size = arr->total_size * 2;
    }
};

uv_loop_t* SJSGetLoop(JSContext *ctx) {
    SJSRuntime *qrt = JS_GetContextOpaque(ctx);

    return &(qrt->loop);
};

SJSRuntime *SJSGetRuntime(JSContext *ctx) {
    return JS_GetContextOpaque(ctx);
};

JSValue SJSInitPromise(JSContext *ctx, SJSPromise *p) {
    JSValue rfuncs[2];
    p->p = JS_NewPromiseCapability(ctx, rfuncs);
    if (JS_IsException(p->p))
        return JS_EXCEPTION;
    p->rfuncs[0] = JS_DupValue(ctx, rfuncs[0]);
    p->rfuncs[1] = JS_DupValue(ctx, rfuncs[1]);
    return JS_DupValue(ctx, p->p);
};

void SJSSettlePromise(JSContext *ctx, SJSPromise *p, BOOL is_reject, int argc, JSValueConst *argv) {
    JSValue ret = JS_Call(ctx, p->rfuncs[is_reject], JS_UNDEFINED, argc, argv);
    for (int i = 0; i < argc; i++)
        JS_FreeValue(ctx, argv[i]);
    JS_FreeValue(ctx, ret); /* XXX: what to do if exception ? */
    JS_FreeValue(ctx, p->rfuncs[0]);
    JS_FreeValue(ctx, p->rfuncs[1]);
    SJS_FreePromise(ctx, p);
};

static inline JSValue SJSSettledPromise(JSContext *ctx, BOOL is_reject, int argc, JSValueConst *argv) {
    JSValue promise, resolving_funcs[2], ret;

    promise = JS_NewPromiseCapability(ctx, resolving_funcs);
    if (JS_IsException(promise))
        return JS_EXCEPTION;

    ret = JS_Call(ctx, resolving_funcs[is_reject], JS_UNDEFINED, argc, argv);

    for (int i = 0; i < argc; i++)
        JS_FreeValue(ctx, argv[i]);
    JS_FreeValue(ctx, ret);
    JS_FreeValue(ctx, resolving_funcs[0]);
    JS_FreeValue(ctx, resolving_funcs[1]);

    return promise;
};

JSValue SJSNewResolvedPromise(JSContext *ctx, int argc, JSValueConst *argv) {
    return SJSSettledPromise(ctx, FALSE, argc, argv);
};

JSValue SJSNewRejectedPromise(JSContext *ctx, int argc, JSValueConst *argv) {
    return SJSSettledPromise(ctx, TRUE, argc, argv);
};

void SJS_FreePromise(JSContext *ctx, SJSPromise *p) {
    JS_FreeValue(ctx, p->rfuncs[0]);
    JS_FreeValue(ctx, p->rfuncs[1]);
    JS_FreeValue(ctx, p->p);
};

static void SJSDumpObj(JSContext *ctx, FILE *f, JSValueConst val) {
    const char *str = JS_ToCString(ctx, val);
    if (str) {
        fprintf(f, "%s\n", str);
        JS_FreeCString(ctx, str);
    } else {
        fprintf(f, "[exception]\n");
    }
};

void SJSDumpError(JSContext *ctx) {
    JSValue exception_val = JS_GetException(ctx);
    SJSDumpError1(ctx, exception_val);
    JS_FreeValue(ctx, exception_val);
};

void SJSDumpError1(JSContext *ctx, JSValueConst exception_val) {
    int is_error = JS_IsError(ctx, exception_val);
    SJSDumpObj(ctx, stderr, exception_val);
    if (is_error) {
        JSValue val = JS_GetPropertyStr(ctx, exception_val, "stack");
        if (!JS_IsUndefined(val))
            SJSDumpObj(ctx, stderr, val);
        JS_FreeValue(ctx, val);
    }
};

int SJSLoadFile(JSContext *ctx, DynBuf *dbuf, const char *filename) {
    uv_fs_t req;
    uv_file fd;
    int r;

    r = uv_fs_open(NULL, &req, filename, O_RDONLY, 0, NULL);
    uv_fs_req_cleanup(&req);
    if (r < 0)
        return r;

    fd = r;
    char buf[64 * 1024];
    uv_buf_t b = uv_buf_init(buf, sizeof(buf));
    size_t offset = 0;

    do {
        r = uv_fs_read(NULL, &req, fd, &b, 1, offset, NULL);
        uv_fs_req_cleanup(&req);
        if (r <= 0)
            break;
        offset += r;
        r = dbuf_put(dbuf, (const uint8_t *) b.base, r);
        if (r != 0)
            break;
    } while (1);

    uv_fs_close(NULL, &req, fd, NULL);
    uv_fs_req_cleanup(&req);

    return r;
};

static void SJSBufFree(JSRuntime *rt, void *opaque, void *ptr) {
    js_free_rt(rt, ptr);
};

JSValue SJSNewUint8Array(JSContext *ctx, uint8_t *data, size_t size) {
    JSValue abuf = JS_NewArrayBuffer(ctx, data, size, SJSBufFree, NULL, FALSE);
    if (JS_IsException(abuf))
        return abuf;
    SJSRuntime *qrt = SJSGetRuntime(ctx);
    JSValue buf = JS_CallConstructor(ctx, qrt->builtins.u8array_ctor, 1, &abuf);
    JS_FreeValue(ctx, abuf);
    return buf;
};

JSValue SJSNewDate(JSContext *ctx, double epoch_ms) {
    SJSRuntime *qrt = SJSGetRuntime(ctx);
    JSValue data = JS_NewFloat64(ctx, epoch_ms);
    JSValue d = JS_CallConstructor(ctx, qrt->builtins.date_ctor, 1, &data);
    JS_FreeValue(ctx, data);
    return d;
};

JSValue MakeObjError(JSContext *ctx, JSValue obj, int err)
{
    JSValue arr;
    if (JS_IsException(obj))
        return obj;
    arr = JS_NewArray(ctx);
    if (JS_IsException(arr))
        return JS_EXCEPTION;
    JS_DefinePropertyValueUint32(ctx, arr, 0, obj,
                                 JS_PROP_C_W_E);
    JS_DefinePropertyValueUint32(ctx, arr, 1, JS_NewInt32(ctx, err),
                                 JS_PROP_C_W_E);
    return arr;
};

JSValue MakeStringError(JSContext *ctx, const char *buf, int err)
{
    return MakeObjError(ctx, JS_NewString(ctx, buf), err);
};
