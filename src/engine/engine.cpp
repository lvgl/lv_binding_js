extern "C" {
    #include <jsapi.h>
    #include "quickjs-libc.h"
    #include <sjs.h>
    #include <uv.h>
};
#include "render/render.h"
#include "engine.hpp"

#include <signal.h>
#include <pthread.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>

#include "engineUtils.hpp"

static SJSRuntime* qrt = nullptr;
static uv_loop_t *loop;

void FreeJSRuntime (int signal) {
    SJSDisableForeverLoop(qrt);
}

SJSRuntime* GetSJSInstance () {
    if (qrt == nullptr) {
        SJSRunOptions options;

        SJSDefaultOptions(&options);

        qrt = SJSNewRuntimeOptions(&options);
    }
    
    return qrt;
}

class Engine {
    Engine::Engine () {
        SJSSetupArgs (argc, argv);

    };
}

void* StartJSRuntime (int argc, char *argv[]) {
    printf("js vm Start\n");

    char* filePath = argv[1];

    SJSRuntime* qrt;

    qrt = GetSJSInstance();
    qrt->foreverLoop = 1;

    NativeRenderInit(qrt->ctx);

    char* path = (char*)malloc(PATH_MAX);
    GetBundlePath(path);
    SJSBootStrapGlobals(qrt->ctx, path);
    free(path);

    // signal(SIGSEGV, FreeJSRuntime);
    signal(SIGINT, FreeJSRuntime);

    char* absolutePath = SetJSEntryPath(filePath);
    SJSRunMain(qrt, absolutePath);
    SJSRun(qrt);

    free(absolutePath);
    SJSFreeRuntime(qrt);
    SJSClearJSApi();
    printf("js vm End \n");
}

int main (int argc, char *argv[]) {
    SJSSetupArgs (argc, argv);

    StartJSRuntime(argc, argv);

    printf("program end\n");
}