#include <cutils.h>
#include <stdio.h>

#include "sjs.h"

typedef struct SJSGetAddrInfoReq {
    JSContext *ctx;
    uv_getaddrinfo_t req;
    SJSPromise result;
} SJSGetAddrInfoReq;

void SJSAddr2obj(JSContext *ctx, JSValue obj, const struct sockaddr *sa) {
    char buf[INET6_ADDRSTRLEN + 1];

    switch (sa->sa_family) {
        case AF_INET: {
            struct sockaddr_in *addr4 = (struct sockaddr_in *) sa;
            uv_ip4_name(addr4, buf, sizeof(buf));

            JS_DefinePropertyValueStr(ctx, obj, "family", JS_NewInt32(ctx, AF_INET), JS_PROP_C_W_E);
            JS_DefinePropertyValueStr(ctx, obj, "ip", JS_NewString(ctx, buf), JS_PROP_C_W_E);
            JS_DefinePropertyValueStr(ctx, obj, "port", JS_NewInt32(ctx, ntohs(addr4->sin_port)), JS_PROP_C_W_E);

            break;
        }

        case AF_INET6: {
            struct sockaddr_in6 *addr6 = (struct sockaddr_in6 *) sa;
            uv_ip6_name(addr6, buf, sizeof(buf));

            JS_DefinePropertyValueStr(ctx, obj, "family", JS_NewInt32(ctx, AF_INET6), JS_PROP_C_W_E);
            JS_DefinePropertyValueStr(ctx, obj, "ip", JS_NewString(ctx, buf), JS_PROP_C_W_E);
            JS_DefinePropertyValueStr(ctx, obj, "port", JS_NewInt32(ctx, ntohs(addr6->sin6_port)), JS_PROP_C_W_E);
            JS_DefinePropertyValueStr(ctx,
                                      obj,
                                      "flowinfo",
                                      JS_NewInt32(ctx, ntohl(addr6->sin6_flowinfo)),
                                      JS_PROP_C_W_E);
            JS_DefinePropertyValueStr(ctx, obj, "scopeId", JS_NewInt32(ctx, addr6->sin6_scope_id), JS_PROP_C_W_E);

            break;
        }
    }
}

static JSValue SJSAddrInfo2obj(JSContext *ctx, struct addrinfo *ai) {
    JSValue obj = JS_NewArray(ctx);

    struct addrinfo *ptr;
    int i = 0;
    for (ptr = ai; ptr; ptr = ptr->ai_next) {
        if (!ptr->ai_addrlen)
            continue;

        JSValue item = JS_NewObjectProto(ctx, JS_NULL);
        SJSAddr2obj(ctx, item, ptr->ai_addr);
        JS_DefinePropertyValueStr(ctx, item, "socktype", JS_NewInt32(ctx, ptr->ai_socktype), JS_PROP_C_W_E);
        JS_DefinePropertyValueStr(ctx, item, "protocol", JS_NewInt32(ctx, ptr->ai_protocol), JS_PROP_C_W_E);
        JS_DefinePropertyValueStr(ctx,
                                  item,
                                  "canonname",
                                  ptr->ai_canonname ? JS_NewString(ctx, ptr->ai_canonname) : JS_UNDEFINED,
                                  JS_PROP_C_W_E);

        JS_DefinePropertyValueUint32(ctx, obj, i, item, JS_PROP_C_W_E);
        i++;
    }

    return obj;
}

static void SJSObj2AddrInfo(JSContext *ctx, JSValue obj, struct addrinfo *ai) {
    JSValue family = JS_GetPropertyStr(ctx, obj, "family");
    if (!JS_IsUndefined(family))
        JS_ToInt32(ctx, &ai->ai_family, family);
    JS_FreeValue(ctx, family);

    JSValue socktype = JS_GetPropertyStr(ctx, obj, "socktype");
    if (!JS_IsUndefined(socktype))
        JS_ToInt32(ctx, &ai->ai_socktype, socktype);
    JS_FreeValue(ctx, socktype);

    JSValue protocol = JS_GetPropertyStr(ctx, obj, "protocol");
    if (!JS_IsUndefined(protocol))
        JS_ToInt32(ctx, &ai->ai_protocol, protocol);
    JS_FreeValue(ctx, protocol);

    JSValue flags = JS_GetPropertyStr(ctx, obj, "flags");
    if (!JS_IsUndefined(flags))
        JS_ToInt32(ctx, &ai->ai_flags, flags);
    JS_FreeValue(ctx, flags);
}

void GetAddrInfoCallback(uv_getaddrinfo_t* req, int status, struct addrinfo* res) {
    SJSGetAddrInfoReq *gr = req->data;
    JSContext *ctx = gr->ctx;
    JSValue arg;
    BOOL is_reject = status != 0;

    if (status != 0) {
        arg = JS_NewObjectProto(ctx, JS_NULL);
    } else {
        arg = SJSAddrInfo2obj(ctx, res);
    }
    SJSSettlePromise(ctx, &gr->result, is_reject, 1, (JSValueConst *) &arg);
    uv_freeaddrinfo(res);
    js_free(ctx, gr);
}

static JSValue SJSDnsGetaddrinfo(JSContext *ctx, JSValueConst this_val, int argc, JSValueConst *argv) {
    const char *service = NULL;
    const char *node = NULL;
    if (!JS_IsUndefined(argv[0])) {
        node = JS_ToCString(ctx, argv[0]);
        if (!node)
            return JS_EXCEPTION;
    }

    if (!JS_IsUndefined(argv[1])) {
        service = JS_ToCString(ctx, argv[1]);

        if (!service) {
            JS_FreeCString(ctx, node);
            return JS_EXCEPTION;
        }
    }

    SJSGetAddrInfoReq *gr = js_malloc(ctx, sizeof(*gr));
    if (!gr) {
        JS_FreeCString(ctx, node);
        JS_FreeCString(ctx, service);
        return JS_EXCEPTION;
    }

    gr->ctx = ctx;
    gr->req.data = gr;

    struct addrinfo hints;
    memset(&hints, 0, sizeof(hints));

    JSValue opts = argv[2];
    if (JS_IsObject(opts)) {
        SJSObj2AddrInfo(ctx, opts, &hints);
    }
    
    int r = uv_getaddrinfo(SJSGetLoop(ctx), &(gr->req), GetAddrInfoCallback, node, service, &hints);
    JS_FreeCString(ctx, node);
    JS_FreeCString(ctx, service);

    return SJSInitPromise(ctx, &gr->result);
};

static const JSCFunctionListEntry NetworkFuncs[] = {
    SJS_CFUNC_DEF("getAddrInfo", 1, SJSDnsGetaddrinfo ),
    SJS_CONST(SOCK_STREAM),
    SJS_CONST(SOCK_DGRAM),
    SJS_CONST(IPPROTO_TCP),
    SJS_CONST(IPPROTO_UDP)
};

static const JSCFunctionListEntry network[] = {
    SJS_OBJECT_DEF("net", NetworkFuncs, countof(NetworkFuncs))
};

BOOL SJSNetworkInit (SJSRuntime* qrt, JSValue ns) {
    SJSRegistJSApi(&network);
};