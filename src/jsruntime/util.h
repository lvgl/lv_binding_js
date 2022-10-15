
#ifndef SJS_UTIL_H
#define SJS_UTIL_H

#include "uv.h"
#include "quickjs.h"
#include "cutils.h"

typedef struct Array {
    size_t *array;
    size_t total_size;
    size_t size;
    size_t item_size;
} Array;

Array ArrayCreat(size_t init_size, size_t item_size);

BOOL ArrayAppend(Array *arr, void* data);

BOOL ArrayExpand(Array *arr);

typedef struct {
    JSValue p;
    JSValue rfuncs[2];
} SJSPromise;

JSValue SJSInitPromise(JSContext *ctx, SJSPromise *p);

void SJSFreePromise(JSContext *ctx, SJSPromise *p);

void SJSSettlePromise(JSContext *ctx, SJSPromise *p, BOOL is_reject, int argc, JSValueConst *argv);

uv_loop_t *SJSGetLoop(JSContext *ctx);

void SJSDumpError(JSContext *ctx);

void SJSDumpError1(JSContext *ctx, JSValueConst exception_val);

int SJSLoadFile(JSContext *ctx, DynBuf *dbuf, const char *filename);

int SJSWriteFile(JSContext *ctx, char* buf, size_t len, const char *filename);

JSValue SJSNewResolvedPromise(JSContext *ctx, int argc, JSValueConst *argv);

JSValue SJSNewRejectedPromise(JSContext *ctx, int argc, JSValueConst *argv);

JSValue SJSNewUint8Array(JSContext *ctx, uint8_t *data, size_t size);

JSValue SJSNewDate(JSContext *ctx, double epoch_ms);

JSValue MakeObjError(JSContext *ctx, JSValue obj, int err);

JSValue MakeStringError(JSContext *ctx, const char *buf, int err);

#endif