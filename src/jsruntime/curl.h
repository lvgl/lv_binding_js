
#ifndef SJSCURLH
#define SJSCURLH

#include <curl/curl.h>
#include "sjs.h"

typedef void (*SJSCurlDoneCb)(CURLMsg *message, void *arg);
typedef struct {
    void *arg;
    SJSCurlDoneCb done_cb;
} SJSCurlPrivate;

void SJSCurlInit(void);
int SJSCurlLoadHttp(DynBuf *dbuf, const char *url);
CURLM *SJSGETCURLM(JSContext *ctx);

#endif