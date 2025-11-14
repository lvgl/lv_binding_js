#include "engine.hpp"

#include <stdlib.h>

#include "hal/hal.hpp"
#include "native/bootstrap/render_bootstrap.hpp"
#include "native/components/component.hpp"

static TJSRuntime* qrt;

static void timer_cb(uv_timer_t *handle) {
    lv_timer_handler();
}

int main(int argc, char **argv) {
    TJS_Initialize(argc, argv);

    qrt = TJS_NewRuntime();
    CHECK_NOT_NULL(qrt);

    JSValue global_obj = JS_GetGlobalObject(qrt->ctx);
    JSValue render_sym = JS_NewSymbol(qrt->ctx, "lvgljs", true);
    JSAtom render_atom = JS_ValueToAtom(qrt->ctx, render_sym);
    JSValue render = JS_NewObjectProto(qrt->ctx, JS_NULL);

    CHECK_EQ(JS_DefinePropertyValue(qrt->ctx, global_obj, render_atom, render, JS_PROP_C_W_E), true);

    NativeRenderInit(qrt->ctx, render);

    JS_FreeAtom(qrt->ctx, render_atom);
    JS_FreeValue(qrt->ctx, render_sym);
    JS_FreeValue(qrt->ctx, global_obj);

    hal_init();
    WindowInit();

    // create timer for rendering
    static uv_timer_t handle;
    handle.data = qrt;
    if (uv_timer_init(&qrt->loop, &handle) != 0) {
        printf("uv_timer_init failed\n");
    } else if (uv_timer_start(&handle, timer_cb, 30, 30) != 0) {
        printf("uv_timer_start failed\n");
    }

    int exit_code = TJS_Run(qrt);

    TJS_FreeRuntime(qrt);

    return exit_code;
}

TJSRuntime* GetRuntime() {
    return qrt;
}
