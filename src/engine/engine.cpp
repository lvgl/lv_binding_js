#include "engine.hpp"

static Engine* LVEngine;

SJSRuntime* Engine::qrt = nullptr;

static void JSRuntimeFree (int signal) {
    if (Engine::qrt != nullptr) {
        SJSDisableForeverLoop(Engine::qrt);
        uv_stop(&Engine::qrt->loop);
    }
};

Engine::Engine (char* file_path) {
    SJSRuntime* qrt = Engine::GetSJSInstance();
    
    qrt->foreverLoop = 1;

    qrt->ui_handler = &lv_timer_handler;

    NativeRenderInit(qrt->ctx);

    hal_init();

    WindowInit();

    char* path = (char*)malloc(PATH_MAX);
    
    GetBundlePath(path);
    if (access(path, F_OK) == -1) {
        printf("bundle.js miss, engine will stop \n");
        JSRuntimeFree(0);
        exit(0);
    }

    SJSBootStrapGlobals(qrt->ctx, path);
    free(path);

    signal(SIGINT, JSRuntimeFree);

    SetJSEntryPath(file_path);
};

Engine::~Engine () {
    lv_obj_clean(lv_scr_act());
    SJSFreeRuntime(Engine::qrt);
    SJSClearJSApi();
};

void Engine::close () {
    
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
    strcat(path, SJSPATHSEP);
    strcat(path, "lib");
    realpath(path, result);
};

void Engine::GetEngineAssetPath (char* buf, char* relative_path) {
    GetEngineDir(buf);
    strcat(buf, SJSPATHSEP);
    strcat(buf, relative_path);
};

void Engine::GetBundlePath (char* buf) {
    GetEngineDir(buf);
    strcat(buf, SJSPATHSEP);
    strcat(buf, "lib");
    strcat(buf, SJSPATHSEP);
    strcat(buf, "bundle.js");
};

std::string Engine::SetJSEntryPath (char* file_path) {
    char buf[PATH_MAX]; 
    realpath(file_path, buf);
    js_entry_path = buf;

    return js_entry_path;
};

void Engine::GetJSAssetsPath (char* buf, const char* url) {
    strcpy(buf, js_entry_path.c_str());
    dirname(buf);
    strcat(buf, url);
};

int main (int argc, char *argv[]) {
    SJSSetupArgs (argc, argv);
    char* filePath = argv[1];

    printf("engine start \n");

    LVEngine = new Engine(filePath);
    LVEngine->Start();
    delete LVEngine;

    exit(0);
    printf("engine end \n");
};