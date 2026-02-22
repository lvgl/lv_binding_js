#pragma once

extern "C" {
    #include "private.h"
};

void EngineInit(int argc, char **argv);
int EngineRun();
TJSRuntime* GetRuntime();

