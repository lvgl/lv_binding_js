#include "engine/engine.hpp"

Engine* LVEngine;

static SJSRuntime* qrt = nullptr;

static void JSRuntimeFree (int signal) {
    if (qrt != nullptr) {
        SJSDisableForeverLoop(qrt);
    }
};

Engine::Engine (char* filePath) {
    qrt = GetSJSInstance();
    qrt->foreverLoop = 1;

    char* path = (char*)malloc(PATH_MAX);
    GetBundlePath(path);
    SJSBootStrapGlobals(qrt->ctx, path);
    free(path);

    signal(SIGINT, JSRuntimeFree);

    SetJSEntryPath(filePath);
};

Engine::~Engine () {
    SJSFreeRuntime(qrt);
    SJSClearJSApi();
};

void Engine::Start () {
    SJSRunMain(qrt);
    SJSRunLoop(qrt);
};

SJSRuntime* Engine::GetSJSInstance () {
    if (qrt == nullptr) {
        SJSRunOptions options;
        SJSDefaultOptions(&options);
        qrt = SJSNewRuntimeOptions(&options);
    }
    
    return qrt;
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

    printf("program end \n");
};