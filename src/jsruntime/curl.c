/*
 * QuickJS libuv bindings
 *
 * Copyright (c) 2019-present Saúl Ibarra Corretgé <s@saghul.net>
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

#include "curl.h"


static uv_once_t CurlInitOnce = UV_ONCE_INIT;

void SJSCurlInitOnce(void) {
    curl_global_init(CURL_GLOBAL_ALL);
}

void SJSCurlInit(void) {
    uv_once(&CurlInitOnce, SJSCurlInitOnce);
}

size_t CurlWriteCb(char *ptr, size_t size, size_t nmemb, void *userdata) {
    size_t realsize = size * nmemb;
    DynBuf *dbuf = userdata;
    if (dbuf_put(dbuf, (const uint8_t *) ptr, realsize))
        return -1;
    return realsize;
}

int SJSCurlLoadHttp(DynBuf *dbuf, const char *url) {
    SJSCurlInit();

    CURL *curl_handle;
    CURLcode res;
    int r = -1;

    /* init the curl session */
    curl_handle = curl_easy_init();

    /* specify URL to get */
    curl_easy_setopt(curl_handle, CURLOPT_URL, url);

    /* send all data to this function  */
    curl_easy_setopt(curl_handle, CURLOPT_WRITEFUNCTION, CurlWriteCb);

    /* we pass our 'chunk' struct to the callback function */
    curl_easy_setopt(curl_handle, CURLOPT_WRITEDATA, (void *) dbuf);

    /* some servers don't like requests that are made without a user-agent field, so we provide one */
    curl_easy_setopt(curl_handle, CURLOPT_USERAGENT, "sjs/1.0");

    /* get it! */
    res = curl_easy_perform(curl_handle);

    if (res == CURLE_OK) {
        long code = 0;
        res = curl_easy_getinfo(curl_handle, CURLINFO_RESPONSE_CODE, &code);
        if (res == CURLE_OK)
            r = (int) code;
    }

    if (res != CURLE_OK) {
        r = -res;
#if 0
        printf("CURL ERROR: %d %s\n", res,  curl_easy_strerror(res));
#endif
    }

    /* cleanup curl stuff */
    curl_easy_cleanup(curl_handle);

    /* curl won't null terminate the memory, do it ourselves */
    dbuf_putc(dbuf, '\0');

    return r;
}

static void CheckMultiInfo(SJSRuntime *qrt) {
    char *done_url;
    CURLMsg *message;
    int pending;

    while ((message = curl_multi_info_read(qrt->curl_ctx.curlm_h, &pending))) {
        switch (message->msg) {
            case CURLMSG_DONE: {
                /* Do not use message data after calling curl_multi_remove_handle() and
                   curl_easy_cleanup(). As per curl_multi_info_read() docs:
                   "WARNING: The data the returned pointer points to will not survive
                   calling curl_multi_cleanup, curl_multi_remove_handle or
                   curl_easy_cleanup." */
                CURL *easy_handle = message->easy_handle;

                SJSCurlPrivate *curlPrivate = NULL;
                curl_easy_getinfo(easy_handle, CURLINFO_PRIVATE, &curlPrivate);
                curlPrivate->done_cb(message, curlPrivate->arg);

                curl_multi_remove_handle(qrt->curl_ctx.curlm_h, easy_handle);
                curl_easy_cleanup(easy_handle);
                break;
            }
            default:
                abort();
        }
    }
}

typedef struct {
    uv_poll_t poll;
    curl_socket_t sockfd;
    SJSRuntime *qrt;
} SJSCurlPollCtx;

static void UVPollCloseCb(uv_handle_t *handle) {
    SJSCurlPollCtx *pollCtx = handle->data;
    free(pollCtx);
}

static void UVPollCb(uv_poll_t *handle, int status, int events) {
    SJSCurlPollCtx *pollCtx = handle->data;
    SJSRuntime *qrt = pollCtx->qrt;

    int flags = 0;
    if (events & UV_READABLE)
        flags |= CURL_CSELECT_IN;
    if (events & UV_WRITABLE)
        flags |= CURL_CSELECT_OUT;

    int runningHandles;
    curl_multi_socket_action(qrt->curl_ctx.curlm_h, pollCtx->sockfd, flags, &runningHandles);

    CheckMultiInfo(qrt);
}

static int CurlHandleSocket(CURL *easy, curl_socket_t s, int action, void *userp, void *socketp) {
    SJSRuntime* qrt = (SJSRuntime*)userp;

    switch (action) {
        case CURL_POLL_IN:
        case CURL_POLL_OUT:
        case CURL_POLL_INOUT: {
            SJSCurlPollCtx *pollCtx;
            if (!socketp) {
                // Initialize poll handle.
                pollCtx = malloc(sizeof(*pollCtx));
                if (!pollCtx)
                    return -1;
                uv_poll_init_socket(&qrt->loop, &pollCtx->poll, s);
                pollCtx->qrt = qrt;
                pollCtx->sockfd = s;
                pollCtx->poll.data = pollCtx;
            } else {
                pollCtx = socketp;
            }

            curl_multi_assign(qrt->curl_ctx.curlm_h, s, (void *) pollCtx);

            int events = 0;
            if (action != CURL_POLL_IN)
                events |= UV_WRITABLE;
            if (action != CURL_POLL_OUT)
                events |= UV_READABLE;

            uv_poll_start(&pollCtx->poll, events, UVPollCb);
            break;
        }
        case CURL_POLL_REMOVE:
            if (socketp) {
                SJSCurlPollCtx *pollCtx = socketp;
                uv_poll_stop(&pollCtx->poll);
                curl_multi_assign(qrt->curl_ctx.curlm_h, s, NULL);
                uv_close((uv_handle_t *) &pollCtx->poll, UVPollCloseCb);
            }
            break;
        default:
            abort();
    }

    return 0;
}

static void UVTimerCb(uv_timer_t *handle) {
    SJSRuntime *qrt = handle->data;

    int runningHandles;
    curl_multi_socket_action(qrt->curl_ctx.curlm_h, CURL_SOCKET_TIMEOUT, 0, &runningHandles);

    CheckMultiInfo(qrt);
}

static int CurlStartTimeout(CURLM *multi, long timeoutMs, void *userp) {
    SJSRuntime *qrt = userp;

    if (timeoutMs < 0) {
        uv_timer_stop(&qrt->curl_ctx.timer);
    } else {
        if (timeoutMs == 0)
            timeoutMs = 1; /* 0 means directly call socket_action, but we'll do it in a bit */
        uv_timer_start(&qrt->curl_ctx.timer, UVTimerCb, timeoutMs, 0);
    }

    return 0;
}

CURLM *SJSGetCurlm(JSContext *ctx) {
    SJSRuntime *qrt = JS_GetContextOpaque(ctx);

    if (!qrt->curl_ctx.curlm_h) {
        SJSCurlInit();
        CURLM *curlm_h = curl_multi_init();
        curl_multi_setopt(curlm_h, CURLMOPT_SOCKETFUNCTION, CurlHandleSocket);
        curl_multi_setopt(curlm_h, CURLMOPT_SOCKETDATA, qrt);
        curl_multi_setopt(curlm_h, CURLMOPT_TIMERFUNCTION, CurlStartTimeout);
        curl_multi_setopt(curlm_h, CURLMOPT_TIMERDATA, qrt);
        qrt->curl_ctx.curlm_h = curlm_h;
        uv_timer_init(&qrt->loop, &qrt->curl_ctx.timer);
        qrt->curl_ctx.timer.data = qrt;
    }

    return qrt->curl_ctx.curlm_h;
}
