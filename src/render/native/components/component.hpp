extern "C" {
    #include "lvgl.h"
    #include "quickjs-libc.h"
};

typedef struct COMP_REF {
    void* comp;
    const char* uid;
} COMP_REF;

void NativeComponentInit (JSContext* ctx, JSValue ns);