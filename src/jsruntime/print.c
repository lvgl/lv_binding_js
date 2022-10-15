#include "sjs.h"
#include <cutils.h>

static JSValue SJSPrint(JSContext *ctx, JSValueConst this_val,
                              int argc, JSValueConst *argv)
{
    int i;
    const char *str;
    size_t len;

    for(i = 0; i < argc; i++) {
        if (i != 0)
            putchar(' ');
        str = JS_ToCStringLen(ctx, &len, argv[i]);
        if (!str)
            return JS_EXCEPTION;
        fwrite(str, 1, len, stdout);
        JS_FreeCString(ctx, str);
    }
    putchar('\n');
    return JS_UNDEFINED;
}

static const JSCFunctionListEntry js_console_funcs[] = {
    SJS_CFUNC_DEF("Print", 1, SJSPrint )
};

BOOL SJSPrintInit (SJSRuntime* qrt, JSValue ns) {
    SJSRegistJSApi(&js_console_funcs);
}