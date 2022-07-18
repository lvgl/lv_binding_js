extern "C" {
    #include "jsruntime/jsapi.h"
    #include "quickjs-libc.h"
    #include "jsruntime/sjs.h"
    #include "uv.h"
    #include "utils/utils.h"
};

#include <signal.h>
#include <pthread.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <string>

#include "render/native/bootstrap/render_bootstrap.hpp"
#include "./dev/monitor.hpp"

class Engine {
  public:  
    std::string JSEntryPath;

    Engine (char* filePath);
    ~Engine ();

    void Start ();
    static SJSRuntime* GetSJSInstance ();
    static SJSRuntime* qrt;

    void GetEngineDir (char* buf);
    void GetBuiltInLibPath (char* result);
    void GetEngineAssetPath (char* buf, char* relativePath);
    void GetBundlePath (char* buf);
    std::string SetJSEntryPath (char* filePath);
    void GetJSAssetsPath (char* buf, const char* url);
};