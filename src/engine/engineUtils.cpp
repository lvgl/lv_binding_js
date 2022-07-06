#include <libgen.h>
#include <stdlib.h>
#include <string.h>
#include <stdio.h>
#include <unistd.h>

extern "C" {
    #include "utils/utils.h"
}

char* JSEntryPath;

void GetEngineDir (char* buf) {
    GetProgramDir(buf);
};

void GetBuiltInLibPath (char* result) {
    char path[1000];
    GetEngineDir(path);
    strcat(path, "/");
    strcat(path, "lib");
    realpath(path, result);
}

void GetEngineAssetPath (char* buf, char* relativePath) {
    GetEngineDir(buf);
    strcat(buf, "/");
    strcat(buf, relativePath);
};

void GetBundlePath (char* buf) {
    GetEngineDir(buf);
    strcat(buf, "/bundle.js");
};

char* SetJSEntryPath (char* filePath) {
    char* buf = (char*)malloc(1000);
    realpath(filePath, buf);
    JSEntryPath = buf;

    return JSEntryPath;
};

void GetJSAssetsPath (char* buf, const char* url) {
    strcpy(buf, JSEntryPath);
    dirname(buf);
    strcat(buf, url);
};