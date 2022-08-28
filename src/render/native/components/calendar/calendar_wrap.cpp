#include "Calendar.hpp"

static JSClassID CalendarClassID;

WRAPPED_JS_SETSTYLE(Calendar, "Calendar")
WRAPPED_JS_AddEventListener(Calendar, "Calendar")
WRAPPED_JS_Align(Calendar, "Calendar")
WRAPPED_JS_Align_To(Calendar, "Calendar")
STYLE_INFO(Calendar, "Calendar")

static JSValue NativeCompSetHightLights(JSContext *ctx, JSValueConst this_val, int argc, JSValueConst *argv) {
    if (argc >= 1 && JS_IsArray(ctx, argv[0]) && JS_IsNumber(argv[1])) {
        COMP_REF* ref = (COMP_REF*)JS_GetOpaque3(this_val);

        int32_t len;
        int32_t num = 0;
        JS_ToInt32(ctx, &len, argv[1]);
        JSValue item;
        JSValue year_value;
        JSValue day_value;
        JSValue month_value;
        int32_t year;
        int32_t month;
        int32_t day;
        std::vector<lv_calendar_date_t> dates;

        for (int i=0; i<len; i++) {                                                                                     
            item = JS_GetPropertyUint32(ctx, argv[0], i);
            if (JS_IsArray(ctx, item)) {
                year_value = JS_GetPropertyUint32(ctx, item, 0);
                month_value = JS_GetPropertyUint32(ctx, item, 1);
                day_value = JS_GetPropertyUint32(ctx, item, 2);
                if (JS_IsNumber(year_value) && JS_IsNumber(month_value) && JS_IsNumber(day_value)) {
                    JS_ToInt32(ctx, &year, year_value);
                    JS_ToInt32(ctx, &month, month_value);
                    JS_ToInt32(ctx, &day, day_value);

                    num += 1;
                    dates.push_back({ .year = year, .month = month, .day = day });
                }

                JS_FreeValue(ctx, year_value);                                                                                   
                JS_FreeValue(ctx, month_value);   
                JS_FreeValue(ctx, day_value);                                                                                
            }                                                         
            JS_FreeValue(ctx, item);                                                                                   
        }
        
        ((Calendar*)(ref->comp))->setHighlightDates(dates, num);
        LV_LOG_USER("Calendar %s setHighlightDates", ref->uid);
    }
    return JS_UNDEFINED;
};

static JSValue NativeCompSetToday (JSContext *ctx, JSValueConst this_val, int argc, JSValueConst *argv) {
    if (argc >= 1 && JS_IsNumber(argv[0]) && JS_IsNumber(argv[1]) && JS_IsNumber(argv[2])) {
        COMP_REF* ref = (COMP_REF*)JS_GetOpaque3(this_val);

        int32_t year;
        int32_t month;
        int32_t day;
        JS_ToInt32(ctx, &year, argv[0]);
        JS_ToInt32(ctx, &month, argv[1]);
        JS_ToInt32(ctx, &day, argv[2]);

        ((Calendar*)(ref->comp))->setToday(year, month, day);
        LV_LOG_USER("Calendar %s setToday", ref->uid);
    }
};

static JSValue NativeCompSetShownMonth (JSContext *ctx, JSValueConst this_val, int argc, JSValueConst *argv) {
    if (argc >= 1 && JS_IsNumber(argv[0]) && JS_IsNumber(argv[1])) {
        COMP_REF* ref = (COMP_REF*)JS_GetOpaque3(this_val);

        int32_t year;
        int32_t month;
        JS_ToInt32(ctx, &year, argv[0]);
        JS_ToInt32(ctx, &month, argv[1]);

        ((Calendar*)(ref->comp))->setShownMonth(year, month);
        LV_LOG_USER("Calendar %s setShownMonth", ref->uid);
    }
};

static const JSCFunctionListEntry ComponentProtoFuncs[] = {
    SJS_CFUNC_DEF("nativeSetStyle", 0, NativeCompSetStyle),
    SJS_CFUNC_DEF("addEventListener", 0, NativeCompAddEventListener),
    SJS_CFUNC_DEF("align", 0, NativeCompSetAlign),
    SJS_CFUNC_DEF("alignTo", 0, NativeCompSetAlignTo),
    SJS_CFUNC_DEF("getBoundingClientRect", 0, GetStyleBoundClinetRect),
    SJS_OBJECT_DEF("style", style_funcs, countof(style_funcs)),
    SJS_CFUNC_DEF("setHighlightDates", 0, NativeCompSetHightLights),
    SJS_CFUNC_DEF("setToday", 0, NativeCompSetToday),
    SJS_CFUNC_DEF("setShownMonth", 0, NativeCompSetShownMonth),
};

static const JSCFunctionListEntry ComponentClassFuncs[] = {
};

static JSValue CalendarConstructor(JSContext *ctx, JSValueConst new_target, int argc, JSValueConst *argv) {
    JSValue proto;
    JSValue obj;
    JSValue arg;
    JSValue jsUid;
    const char* uid;

    COMP_REF *s;

    if (JS_IsObject(argv[0])) {
        arg = argv[0];
        jsUid = JS_GetPropertyStr(ctx, arg, "uid");
        if (JS_IsString(jsUid)) {
            uid = JS_ToCString(ctx, jsUid);
            JS_FreeValue(ctx, jsUid);
        }
    }

    if (JS_IsUndefined(new_target)) {
        proto = JS_GetClassProto(ctx, CalendarClassID);
    } else {
        proto = JS_GetPropertyStr(ctx, new_target, "prototype");
        if (JS_IsException(proto))
            goto fail;
    }

    obj = JS_NewObjectProtoClass(ctx, proto, CalendarClassID);
    JS_FreeValue(ctx, proto);
    if (JS_IsException(obj))
        goto fail;
    s = (COMP_REF*)js_mallocz(ctx, sizeof(*s));
    s->uid = uid;
    s->comp = new Calendar(uid, NULL);

    JS_FreeCString(ctx, uid);

    if (!s)
        goto fail;

    JS_SetOpaque(obj, s);
    LV_LOG_USER("Calendar %s created", uid);
    return obj;
 fail:
    JS_FreeValue(ctx, obj);
    return JS_EXCEPTION;
};

static void CalendarFinalizer(JSRuntime *rt, JSValue val) {
    COMP_REF *th = (COMP_REF *)JS_GetOpaque(val, CalendarClassID);
    LV_LOG_USER("Calendar %s release", th->uid);
    if (th) {
        delete static_cast<Calendar*>(th->comp);
        free(th);
    }
};

static JSClassDef CalendarClass = {
    "Calendar",
    .finalizer = CalendarFinalizer,
};

void NativeComponentCalendarInit (JSContext* ctx, JSValue ns) {
    JS_NewClassID(&CalendarClassID);
    JS_NewClass(JS_GetRuntime(ctx), CalendarClassID, &CalendarClass);
    JSValue proto = JS_NewObject(ctx);
    JS_SetPropertyFunctionList(ctx, proto, ComponentProtoFuncs, countof(ComponentProtoFuncs));
    JS_SetClassProto(ctx, CalendarClassID, proto);

    JSValue obj = JS_NewCFunction2(ctx, CalendarConstructor, "Calendar", 1, JS_CFUNC_constructor, 0);
    JS_SetConstructor(ctx, obj, proto);
    JS_SetPropertyFunctionList(ctx, obj, ComponentClassFuncs, countof(ComponentClassFuncs));
    JS_DefinePropertyValueStr(ctx, ns, "Calendar", obj, JS_PROP_C_W_E);
};

