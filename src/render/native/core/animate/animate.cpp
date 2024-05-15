#include "animate.hpp"

static JSClassID AnimateClassID;

static MemoryPool<sizeof(lv_anim_t), 30> animate_pool;

std::unordered_map<int32_t, lv_anim_t*> animate_map;

static std::unordered_map<std::string, lv_anim_path_cb_t> animate_funcs = {
    { "linear", &lv_anim_path_linear },
    { "ease-in", &lv_anim_path_ease_in },
    { "ease-out", &lv_anim_path_ease_out },
    { "ease-in-out", &lv_anim_path_ease_in_out },
    { "overshoot", &lv_anim_path_overshoot },
    { "bounce", &lv_anim_path_bounce },
    { "step", &lv_anim_path_step },
};

static void Animate_Exec_Callback (void* opaque, int32_t v) {
    JSValue argv[2];
    int argc = 2;
    ANIMATE_REF* ref = static_cast<ANIMATE_REF*>(opaque);

    SJSRuntime* qrt = Engine::GetSJSInstance();
    JSContext* ctx = qrt->ctx;
    
    argv[0] = JS_NewInt32(ctx, ref->exec_uid);
    argv[1] = JS_NewInt32(ctx, v);
    JSValue globalObj = JS_GetGlobalObject(ctx);
    JSValue fire = JS_GetPropertyStr(ctx, globalObj, "ANIMIATE_CALLBACK");
    JSValue ret = JS_Call(ctx, fire, JS_NULL, argc, argv);

    JS_FreeValue(ctx, globalObj);
    JS_FreeValue(ctx, fire);
    JS_FreeValue(ctx, ret);
    JS_FreeValue(ctx, argv[0]);
    JS_FreeValue(ctx, argv[1]);
};

static void Animate_Start_Callback (lv_anim_t* a) {
    JSValue argv[1];
    int argc = 1;
    ANIMATE_REF* ref = static_cast<ANIMATE_REF*>(a->var);

    SJSRuntime* qrt = Engine::GetSJSInstance();
    JSContext* ctx = qrt->ctx;
    
    argv[0] = JS_NewInt32(ctx, ref->startcb_uid);
    JSValue globalObj = JS_GetGlobalObject(ctx);
    JSValue fire = JS_GetPropertyStr(ctx, globalObj, "ANIMIATE_CALLBACK");
    JSValue ret = JS_Call(ctx, fire, JS_NULL, argc, argv);

    JS_FreeValue(ctx, globalObj);
    JS_FreeValue(ctx, fire);
    JS_FreeValue(ctx, ret);
    JS_FreeValue(ctx, argv[0]);
};

static void Animate_Ready_Callback (lv_anim_t* a) {
    JSValue argv[1];
    int argc = 1;
    ANIMATE_REF* ref = static_cast<ANIMATE_REF*>(a->var);

    SJSRuntime* qrt = Engine::GetSJSInstance();
    JSContext* ctx = qrt->ctx;
    
    argv[0] = JS_NewInt32(ctx, ref->readycb_uid);
    JSValue globalObj = JS_GetGlobalObject(ctx);
    JSValue fire = JS_GetPropertyStr(ctx, globalObj, "ANIMIATE_CALLBACK");
    JSValue ret = JS_Call(ctx, fire, JS_NULL, argc, argv);

    JS_FreeValue(ctx, globalObj);
    JS_FreeValue(ctx, fire);
    JS_FreeValue(ctx, ret);
    JS_FreeValue(ctx, argv[0]);
};

static JSValue NativeAnimateStart(JSContext *ctx, JSValueConst this_val, int argc, JSValueConst *argv) {
    if (argc >= 1 && JS_IsObject(argv[0])) {
        ANIMATE_REF* ref = (ANIMATE_REF*)JS_GetOpaque(this_val, AnimateClassID);

        int32_t uid;
        int32_t exec_uid;
        int32_t startcb_uid;
        int32_t readycb_uid;

        bool use_native;
        JSValue uid_value;
        JSValue execcb_value;
        JSValue startcb_value;
        JSValue readycb_value;
        JSValue use_native_value;
        lv_anim_t* animate;

        uid_value = JS_GetPropertyStr(ctx, argv[0], "uid");
        execcb_value = JS_GetPropertyStr(ctx, argv[0], "execUid");
        startcb_value = JS_GetPropertyStr(ctx, argv[0], "startCbUid");
        readycb_value = JS_GetPropertyStr(ctx, argv[0], "readyCbUid");
        use_native_value = JS_GetPropertyStr(ctx, argv[0], "useNative");

        if (animate_map.find(uid) != animate_map.end()) {
            animate = animate_map.at(uid);
        } else {
            animate = static_cast<lv_anim_t*>(animate_pool.allocate());
            animate_map[uid] = animate;
        }
        lv_anim_init(animate);

        if (JS_IsNumber(uid_value)) {
            JS_ToInt32(ctx, &uid, uid_value);
            ref->uid = uid;
        }
        if (JS_IsNumber(execcb_value)) {
            JS_ToInt32(ctx, &exec_uid, execcb_value);
            ref->exec_uid = exec_uid;
            lv_anim_set_exec_cb(animate, Animate_Exec_Callback);
        }
        if (JS_IsNumber(startcb_value)) {
            JS_ToInt32(ctx, &startcb_uid, startcb_value);
            ref->startcb_uid = startcb_uid;
            lv_anim_set_start_cb(animate, Animate_Start_Callback);
        }
        if (JS_IsNumber(readycb_value)) {
            JS_ToInt32(ctx, &readycb_uid, readycb_value);
            ref->readycb_uid = readycb_uid;
            lv_anim_set_ready_cb(animate, Animate_Ready_Callback);
        }
        if (JS_IsBool(use_native_value)) {
            use_native = JS_ToBool(ctx, use_native_value);
            ref->use_native = use_native;
        }
        JS_FreeValue(ctx, uid_value);
        JS_FreeValue(ctx, execcb_value);
        JS_FreeValue(ctx, startcb_value);
        JS_FreeValue(ctx, readycb_value);
        JS_FreeValue(ctx, use_native_value);

        int32_t duration;
        JSValue dura_value;

        int32_t start;
        int32_t end;
        JSValue start_value;
        JSValue end_value;

        int32_t delay;
        JSValue delay_value;

        int32_t playback_delay;
        JSValue playback_delay_value;

        int32_t playback_time;
        JSValue playback_time_value;

        int32_t repeat_delay;
        JSValue repeat_delay_value;

        int32_t repeat_count;
        JSValue repeat_count_value;

        size_t func_len;
        const char* func;
        JSValue func_value;
        std::string func_str;
        lv_anim_path_cb_t path_func = lv_anim_path_linear;

        lv_anim_set_var(animate, ref);

        dura_value = JS_GetPropertyStr(ctx, argv[0], "duration");
        if (JS_IsNumber(dura_value)) {
            JS_ToInt32(ctx, &duration, dura_value);
            lv_anim_set_time(animate, duration);
        }
        JS_FreeValue(ctx, dura_value);

        start_value = JS_GetPropertyStr(ctx, argv[0], "startValue");
        end_value = JS_GetPropertyStr(ctx, argv[0], "endValue");
        if (JS_IsNumber(start_value) && JS_IsNumber(end_value)) {
            JS_ToInt32(ctx, &start, start_value);
            JS_ToInt32(ctx, &end, end_value);
            lv_anim_set_values(animate, start, end);
        }
        JS_FreeValue(ctx, start_value);
        JS_FreeValue(ctx, end_value);

        delay_value = JS_GetPropertyStr(ctx, argv[0], "delay");
        if (JS_IsNumber(delay_value)) {
            JS_ToInt32(ctx, &delay, delay_value);
            lv_anim_set_delay(animate, delay);
        }
        JS_FreeValue(ctx, delay_value);

        playback_delay_value = JS_GetPropertyStr(ctx, argv[0], "playBackDelay");
        if (JS_IsNumber(playback_delay_value)) {
            JS_ToInt32(ctx, &playback_delay, playback_delay_value);
            lv_anim_set_playback_delay(animate, playback_delay);
        }
        JS_FreeValue(ctx, playback_delay_value);

        playback_time_value = JS_GetPropertyStr(ctx, argv[0], "playBackTime");
        if (JS_IsNumber(playback_time_value)) {
            JS_ToInt32(ctx, &playback_time, playback_time_value);
            lv_anim_set_playback_time(animate, playback_time);
        }
        JS_FreeValue(ctx, playback_time_value);

        repeat_delay_value = JS_GetPropertyStr(ctx, argv[0], "repeatDelay");
        if (JS_IsNumber(repeat_delay_value)) {
            JS_ToInt32(ctx, &repeat_delay, repeat_delay_value);
            lv_anim_set_repeat_delay(animate, repeat_delay);
        }
        JS_FreeValue(ctx, repeat_delay_value);

        repeat_count_value = JS_GetPropertyStr(ctx, argv[0], "repeatCount");
        if (JS_IsNumber(repeat_count_value)) {
            JS_ToInt32(ctx, &repeat_count, repeat_count_value);
            lv_anim_set_repeat_count(animate, repeat_count);
        }
        JS_FreeValue(ctx, repeat_count_value);

        func_value = JS_GetPropertyStr(ctx, argv[0], "easing");
        func = JS_ToCStringLen(ctx, &func_len, func_value);
        func_str = func;
        func_str.resize(func_len);
        if (animate_funcs.find(func_str) != animate_funcs.end()) {
            path_func = animate_funcs.at(func_str);
        }
        lv_anim_set_path_cb(animate, path_func);
        JS_FreeCString(ctx, func);
        JS_FreeValue(ctx, func_value);

        lv_anim_start(animate);
    }
};

static const JSCFunctionListEntry ComponentProtoFuncs[] = {
    TJS_CFUNC_DEF("start", 0, NativeAnimateStart),
};

static JSValue AnimateConstructor(JSContext *ctx, JSValueConst new_target, int argc, JSValueConst *argv) {
    JSValue proto;
    JSValue obj;
    ANIMATE_REF *s;

    if (JS_IsUndefined(new_target)) {
        proto = JS_GetClassProto(ctx, AnimateClassID);
    } else {
        proto = JS_GetPropertyStr(ctx, new_target, "prototype");
        if (JS_IsException(proto))
            goto fail;
    }

    obj = JS_NewObjectProtoClass(ctx, proto, AnimateClassID);
    JS_FreeValue(ctx, proto);
    if (JS_IsException(obj))
        goto fail;
    s = (ANIMATE_REF*)js_mallocz(ctx, sizeof(*s));
    JS_SetOpaque(obj, s);
    
    LV_LOG_USER("Animate created");
    return obj;
 fail:
    JS_FreeValue(ctx, obj);
    return JS_EXCEPTION;
};

static void AnimateFinalizer(JSRuntime *rt, JSValue val) {
    ANIMATE_REF* ref = (ANIMATE_REF*)JS_GetOpaque(val, AnimateClassID);
    LV_LOG_USER("Animate %d release", ref->uid);
    if (ref) {
        if (animate_map.find(ref->uid) != animate_map.end()) {
            lv_anim_t* animate = animate_map.at(ref->uid);
            animate_pool.deallocate(static_cast<void*>(animate));
            animate_map.erase(ref->uid);
        }
        js_free_rt(rt, ref);
    }
};

static JSClassDef AnimateClass = {
    .class_name = "Animate",
    .finalizer = AnimateFinalizer,
};

static const JSCFunctionListEntry ComponentClassFuncs[] = {
};

void NativeAnimateInit (JSContext* ctx, JSValue ns) {
    JS_NewClassID(JS_GetRuntime(ctx), &AnimateClassID);
    JS_NewClass(JS_GetRuntime(ctx), AnimateClassID, &AnimateClass);
    JSValue proto = JS_NewObject(ctx);
    JS_SetPropertyFunctionList(ctx, proto, ComponentProtoFuncs, countof(ComponentProtoFuncs));
    JS_SetClassProto(ctx, AnimateClassID, proto);

    JSValue obj = JS_NewCFunction2(ctx, AnimateConstructor, "Animate", 1, JS_CFUNC_constructor, 0);
    JS_SetConstructor(ctx, obj, proto);
    JS_SetPropertyFunctionList(ctx, obj, ComponentClassFuncs, countof(ComponentClassFuncs));
    JS_DefinePropertyValueStr(ctx, ns, "Animate", obj, JS_PROP_C_W_E);
};