#ifndef SJS_JSAPI_H
#define SJS_JSAPI_H

#include <util.h>
#include <quickjs.h>

#include <sjs.h>

BOOL SJSJSApiInit (SJSRuntime *qrt);

BOOL SJSRegistJSApi (JSCFunctionListEntry *data);

BOOL SJSJSBridgeInit (SJSRuntime *qrt);

BOOL SJSJSApiListInit ();

BOOL SJSClearJSApi ();

JSValue SJSGetJSBridge (JSContext* ctx);

#endif