#include "engine.hpp"

static Engine* LVEngine;

SJSRuntime* Engine::qrt = nullptr;

static void JSRuntimeFree (int signal) {
    if (Engine::qrt != nullptr) {
        SJSDisableForeverLoop(Engine::qrt);
    }
};

Engine::Engine (char* filePath) {
    SJSRuntime* qrt = Engine::GetSJSInstance();
    
    qrt->foreverLoop = 1;

    qrt->ui_handler = &lv_timer_handler;

    NativeRenderInit(qrt->ctx);

    lv_init();
    if (1) {
        hal_init();
    }

    char* path = (char*)malloc(PATH_MAX);
    GetBundlePath(path);
    SJSBootStrapGlobals(qrt->ctx, path);
    free(path);

    signal(SIGINT, JSRuntimeFree);

    SetJSEntryPath(filePath);
};

Engine::~Engine () {
    lv_obj_clean(lv_scr_act());
    SJSFreeRuntime(Engine::qrt);
    SJSClearJSApi();
};

void Engine::Start () {
    SJSRunMain(Engine::qrt);
    SJSRunLoop(Engine::qrt);
};

SJSRuntime* Engine::GetSJSInstance () {
    if (Engine::qrt == nullptr) {
        SJSRunOptions options;
        SJSDefaultOptions(&options);
        Engine::qrt = SJSNewRuntimeOptions(&options);
    }
    
    return Engine::qrt;
};

void Engine::GetEngineDir (char* buf) {
    GetProgramDir(buf);
};

void Engine::GetBuiltInLibPath (char* result) {
    char path[1000];
    GetEngineDir(path);
    strcat(path, "/");
    strcat(path, "lib");
    realpath(path, result);
};

void Engine::GetEngineAssetPath (char* buf, char* relativePath) {
    GetEngineDir(buf);
    strcat(buf, "/");
    strcat(buf, relativePath);
};

void Engine::GetBundlePath (char* buf) {
    GetEngineDir(buf);
    strcat(buf, "/bundle.js");
};

std::string Engine::SetJSEntryPath (char* filePath) {
    char buf[1000]; 
    realpath(filePath, buf);
    JSEntryPath = buf;

    return JSEntryPath;
};

void Engine::GetJSAssetsPath (char* buf, const char* url) {
    strcpy(buf, JSEntryPath.c_str());
    dirname(buf);
    strcat(buf, url);
};

int main (int argc, char *argv[]) {
    SJSSetupArgs (argc, argv);
    char* filePath = argv[1];

    printf("program start \n");

    LVEngine = new Engine(filePath);
    LVEngine->Start();
    delete LVEngine;

    exit(0);
    printf("program end \n");
};