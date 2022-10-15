#include "sjs.h"
#include "utils.h"

#if defined(_WIN32)
#define SJSPATHSEP  "\\"
#else
#define SJSPATHSEP  "/"
#endif

static char* BuiltInModuleNames[] = { "internal", "path" };

char *JSModuleNormalizeName(JSContext *ctx, const char *base_name, const char *name)
{
    char basedir[PATH_MAX] = {0};
    char filePath[PATH_MAX] = {0};
    char newName[PATH_MAX] = {0};
    char* buf = (char*)malloc(PATH_MAX);

    strcat(newName, name);
    ReplenishExt(newName);

    char first = name[0];
    if (first != "." && first != SJSPATHSEP) {
        char moduleName[PATH_MAX] = {0};
        strcat(moduleName, name);
        strtok(moduleName, "/");

        int i;
        int isBuiltIn = 0;
        for (i = 0; i < countof(BuiltInModuleNames); i++) {
            if (strcmp(BuiltInModuleNames[i], moduleName) == 0) {
                isBuiltIn = 1;
            }
        }

        if (isBuiltIn) {
            char cwd[PATH_MAX] = {0};
            GetProgramDir(cwd);
            sprintf(buf, "%s/lib/%s", cwd, newName);
            return buf;
        }
    }

    strcat(basedir, base_name);
    dirname(basedir);

    strcat(filePath, basedir);
    strcat(filePath, SJSPATHSEP);
    strcat(filePath, name);

    realpath(filePath, buf);
    return buf;
}

int JSModuleSetImportMeta(JSContext *ctx, JSValueConst func_val, JS_BOOL is_main) {
    JSModuleDef *m;
    char buf[PATH_MAX] = {0};
    int r;
    JSValue meta_obj;
    JSAtom module_name_atom;
    const char *module_name;
    char module_dirname[PATH_MAX] = {0};

    m = JS_VALUE_GET_PTR(func_val);

    module_name_atom = JS_GetModuleName(ctx, m);
    module_name = JS_AtomToCString(ctx, module_name_atom);
#if 1
    fprintf(stdout, "loaded module: %s\n", module_name);
#endif
    JS_FreeAtom(ctx, module_name_atom);
    if (!module_name)
        return -1;

    strcat(buf, module_name);
    strcat(module_dirname, module_name);

    dirname(module_dirname);

    JS_FreeCString(ctx, module_name);

    meta_obj = JS_GetImportMeta(ctx, m);
    if (JS_IsException(meta_obj))
        return -1;
    JS_DefinePropertyValueStr(ctx, meta_obj, "url", JS_NewString(ctx, buf), JS_PROP_C_W_E);
    JS_DefinePropertyValueStr(ctx, meta_obj, "main", JS_NewBool(ctx, is_main), JS_PROP_C_W_E);
    JS_DefinePropertyValueStr(ctx, meta_obj, "dirname", JS_NewString(ctx, module_dirname), JS_PROP_C_W_E);
    JS_FreeValue(ctx, meta_obj);
    return 0;
}

JSModuleDef *SJSModuleLoader(JSContext *ctx, const char *module_name, void *opaque) {
    static const char json_tpl_start[] = "export default JSON.parse(`";
    static const char json_tpl_end[] = "`);";

    JSModuleDef *m;
    JSValue func_val;
    int r, is_json;
    DynBuf dbuf;

    dbuf_init(&dbuf);

    is_json = has_suffix(module_name, ".json");

    if (is_json)
        dbuf_put(&dbuf, (const uint8_t *) json_tpl_start, strlen(json_tpl_start));
    
    r = SJSLoadFile(ctx, &dbuf, module_name);
    if (r != 0) {
        dbuf_free(&dbuf);
        JS_ThrowReferenceError(ctx, "could not load '%s'", module_name);
        return NULL;
    }

    if (is_json)
        dbuf_put(&dbuf, (const uint8_t *) json_tpl_end, strlen(json_tpl_end));

    dbuf_putc(&dbuf, '\0');

    func_val = JS_Eval(ctx, (char *) dbuf.buf, dbuf.size - 1, module_name, JS_EVAL_TYPE_MODULE | JS_EVAL_FLAG_COMPILE_ONLY);
    dbuf_free(&dbuf);
    if (JS_IsException(func_val)) {
        JS_FreeValue(ctx, func_val);
        return NULL;
    }

    JSModuleSetImportMeta(ctx, func_val, FALSE);
    m = JS_VALUE_GET_PTR(func_val);
    JS_FreeValue(ctx, func_val);

    return m;
}