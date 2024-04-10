#include "chart.hpp"

static JSClassID ChartClassID;

WRAPPED_JS_SETSTYLE(Chart, "Chart")
WRAPPED_JS_AddEventListener(Chart, "Chart")
WRAPPED_JS_Align(Chart, "Chart")
WRAPPED_JS_Align_To(Chart, "Chart")
STYLE_INFO(Chart, "Chart")
WRAPPED_JS_BACKGROUND_IMAGE(Chart,"Chart")
WRAPPED_MOVE_TO_FRONT(Chart, "Chart")
WRAPPED_MOVE_TO_BACKGROUND(Chart, "Chart")
WRAPPED_SCROLL_INTO_VIEW(Chart, "Chart")
WRAPPED_JS_REFRESH_COMPONENT(Chart, "Chart")
WRAPPED_JS_CLOSE_COMPONENT(Chart, "Chart")

static JSValue NativeCompSetLeftAxisLabels(JSContext *ctx, JSValueConst this_val, int argc, JSValueConst *argv) {
    if (argc >= 1 && JS_IsArray(ctx, argv[0])) {
        COMP_REF* ref = (COMP_REF*)JS_GetOpaque(this_val, ChartClassID);

        int32_t len, i;
        size_t item_len;
        const char* str_ori;
        std::vector<std::string> result;
        std::string item;
        JSValue item_value;
        JSValue len_value = JS_GetPropertyStr(ctx, argv[0], "length");
        JS_ToInt32(ctx, &len, len_value);
        JS_FreeValue(ctx, len_value);

        for (i=0; i<len; i++) {
            item_value = JS_GetPropertyUint32(ctx, argv[0], i);
            str_ori = JS_ToCStringLen(ctx, &item_len, item_value);
            item = str_ori;
            item.resize(item_len);
            result.push_back(item);

            JS_FreeValue(ctx, item_value);
            JS_FreeCString(ctx, str_ori);
        }

        ((Chart*)(ref->comp))->setLeftAxisLabels(result);
        LV_LOG_USER("Chart %s setLeftAxisLabels", ref->uid);
    }
    return JS_UNDEFINED;
};

static JSValue NativeCompSetRightAxisLabels(JSContext *ctx, JSValueConst this_val, int argc, JSValueConst *argv) {
    if (argc >= 1 && JS_IsArray(ctx, argv[0])) {
        COMP_REF* ref = (COMP_REF*)JS_GetOpaque(this_val, ChartClassID);

        int32_t len, i;
        size_t item_len;
        const char* str_ori;
        std::vector<std::string> result;
        std::string item;
        JSValue item_value;
        JSValue len_value = JS_GetPropertyStr(ctx, argv[0], "length");
        JS_ToInt32(ctx, &len, len_value);
        JS_FreeValue(ctx, len_value);

        for (i=0; i<len; i++) {
            item_value = JS_GetPropertyUint32(ctx, argv[0], i);
            str_ori = JS_ToCStringLen(ctx, &item_len, item_value);
            item = str_ori;
            item.resize(item_len);
            result.push_back(item);

            JS_FreeValue(ctx, item_value);
            JS_FreeCString(ctx, str_ori);
        }

        JS_FreeValue(ctx, len_value);

        ((Chart*)(ref->comp))->setRightAxisLabels(result);
        LV_LOG_USER("Chart %s setRightAxisLabels", ref->uid);
    }
    return JS_UNDEFINED;
};

static JSValue NativeCompSetTopAxisLabels(JSContext *ctx, JSValueConst this_val, int argc, JSValueConst *argv) {
    if (argc >= 1 && JS_IsArray(ctx, argv[0])) {
        COMP_REF* ref = (COMP_REF*)JS_GetOpaque(this_val, ChartClassID);

        int32_t len, i;
        size_t item_len;
        const char* str_ori;
        std::vector<std::string> result;
        std::string item;
        JSValue item_value;
        JSValue len_value = JS_GetPropertyStr(ctx, argv[0], "length");
        JS_ToInt32(ctx, &len, len_value);
        JS_FreeValue(ctx, len_value);

        for (i=0; i<len; i++) {
            item_value = JS_GetPropertyUint32(ctx, argv[0], i);
            str_ori = JS_ToCStringLen(ctx, &item_len, item_value);
            item = str_ori;
            item.resize(item_len);
            result.push_back(item);

            JS_FreeValue(ctx, item_value);
            JS_FreeCString(ctx, str_ori);
        }

        ((Chart*)(ref->comp))->setTopAxisLabels(result);
        LV_LOG_USER("Chart %s setTopAxisLabels", ref->uid);
    }
    return JS_UNDEFINED;
};

static JSValue NativeCompSetBottomAxisLabels(JSContext *ctx, JSValueConst this_val, int argc, JSValueConst *argv) {
    if (argc >= 1 && JS_IsArray(ctx, argv[0])) {
        COMP_REF* ref = (COMP_REF*)JS_GetOpaque(this_val, ChartClassID);

        int32_t len, i;
        size_t item_len;
        const char* str_ori;
        std::vector<std::string> result;
        std::string item;
        JSValue item_value;
        JSValue len_value = JS_GetPropertyStr(ctx, argv[0], "length");
        JS_ToInt32(ctx, &len, len_value);
        JS_FreeValue(ctx, len_value);

        for (i=0; i<len; i++) {
            item_value = JS_GetPropertyUint32(ctx, argv[0], i);
            str_ori = JS_ToCStringLen(ctx, &item_len, item_value);
            item = str_ori;
            item.resize(item_len);
            result.push_back(item);

            JS_FreeValue(ctx, item_value);
            JS_FreeCString(ctx, str_ori);
        }

        ((Chart*)(ref->comp))->setBottomAxisLabels(result);
        LV_LOG_USER("Chart %s setBottomAxisLabels", ref->uid);
    }
    return JS_UNDEFINED;
};

static JSValue NativeCompSetDivLine(JSContext *ctx, JSValueConst this_val, int argc, JSValueConst *argv) {
    if (argc >= 1 && JS_IsArray(ctx, argv[0])) {
        COMP_REF* ref = (COMP_REF*)JS_GetOpaque(this_val, ChartClassID);
        int32_t hdiv, vdiv;

        JSValue hdiv_value = JS_GetPropertyUint32(ctx, argv[0], 0);
        JSValue vdiv_value = JS_GetPropertyUint32(ctx, argv[0], 1);

        JS_ToInt32(ctx, &hdiv, hdiv_value);
        JS_ToInt32(ctx, &vdiv, vdiv_value);

        JS_FreeValue(ctx, hdiv_value);
        JS_FreeValue(ctx, vdiv_value);
        
        ((Chart*)(ref->comp))->setDivLineCount(hdiv, vdiv);
        LV_LOG_USER("Chart %s setDivLineCount %d %d", ref->uid, hdiv, vdiv);
    }
    return JS_UNDEFINED;
};

static JSValue NativeCompSetPointNum(JSContext *ctx, JSValueConst this_val, int argc, JSValueConst *argv) {
    if (argc >= 1 && JS_IsNumber(argv[0])) {
        COMP_REF* ref = (COMP_REF*)JS_GetOpaque(this_val, ChartClassID);
        int32_t pointNUm;
        JS_ToInt32(ctx, &pointNUm, argv[0]);
        
        ((Chart*)(ref->comp))->setPointNum(pointNUm);
        LV_LOG_USER("Chart %s setPointNum %d", ref->uid, pointNUm);
    }
    return JS_UNDEFINED;
};

static JSValue NativeCompSetType(JSContext *ctx, JSValueConst this_val, int argc, JSValueConst *argv) {
    if (argc >= 1 && JS_IsNumber(argv[0])) {
        COMP_REF* ref = (COMP_REF*)JS_GetOpaque(this_val, ChartClassID);
        int32_t type;
        JS_ToInt32(ctx, &type, argv[0]);
        
        ((Chart*)(ref->comp))->setType(type);
        LV_LOG_USER("Chart %s setType %d", ref->uid, type);
    }
    return JS_UNDEFINED;
};

static JSValue NativeCompSetLeftAxisOption(JSContext *ctx, JSValueConst this_val, int argc, JSValueConst *argv) {
    if (argc >= 1 && JS_IsObject(argv[0])) {
        COMP_REF* ref = (COMP_REF*)JS_GetOpaque(this_val, ChartClassID);
        JSValue major_len_value = JS_GetPropertyStr(ctx, argv[0], "majorLen");
        JSValue minor_len_value = JS_GetPropertyStr(ctx, argv[0], "minorLen");
        JSValue major_num_value = JS_GetPropertyStr(ctx, argv[0], "majorNum");
        JSValue minor_num_value = JS_GetPropertyStr(ctx, argv[0], "minorNum");
        JSValue draw_size_value = JS_GetPropertyStr(ctx, argv[0], "drawSize");

        int32_t major_len, minor_len, major_num, minor_num, draw_size;
        JS_ToInt32(ctx, &major_len, major_len_value);
        JS_ToInt32(ctx, &minor_len, minor_len_value);
        JS_ToInt32(ctx, &major_num, major_num_value);
        JS_ToInt32(ctx, &minor_num, minor_num_value);
        JS_ToInt32(ctx, &draw_size, draw_size_value);

        JS_FreeValue(ctx, major_len_value);
        JS_FreeValue(ctx, minor_len_value);
        JS_FreeValue(ctx, major_num_value);
        JS_FreeValue(ctx, minor_num_value);
        JS_FreeValue(ctx, draw_size_value);
        
        ((Chart*)(ref->comp))->setLeftAxisOption(major_len, minor_len, major_num, minor_num, draw_size);
        LV_LOG_USER("Chart %s setLeftAxisOption", ref->uid);
    }
    return JS_UNDEFINED;
};

static JSValue NativeCompSetRightAxisOption(JSContext *ctx, JSValueConst this_val, int argc, JSValueConst *argv) {
    if (argc >= 1 && JS_IsObject(argv[0])) {
        COMP_REF* ref = (COMP_REF*)JS_GetOpaque(this_val, ChartClassID);
        JSValue major_len_value = JS_GetPropertyStr(ctx, argv[0], "majorLen");
        JSValue minor_len_value = JS_GetPropertyStr(ctx, argv[0], "minorLen");
        JSValue major_num_value = JS_GetPropertyStr(ctx, argv[0], "majorNum");
        JSValue minor_num_value = JS_GetPropertyStr(ctx, argv[0], "minorNum");
        JSValue draw_size_value = JS_GetPropertyStr(ctx, argv[0], "drawSize");

        int32_t major_len, minor_len, major_num, minor_num, draw_size;
        JS_ToInt32(ctx, &major_len, major_len_value);
        JS_ToInt32(ctx, &minor_len, minor_len_value);
        JS_ToInt32(ctx, &major_num, major_num_value);
        JS_ToInt32(ctx, &minor_num, minor_num_value);
        JS_ToInt32(ctx, &draw_size, draw_size_value);

        JS_FreeValue(ctx, major_len_value);
        JS_FreeValue(ctx, minor_len_value);
        JS_FreeValue(ctx, major_num_value);
        JS_FreeValue(ctx, minor_num_value);
        JS_FreeValue(ctx, draw_size_value);
        
        ((Chart*)(ref->comp))->setRightAxisOption(major_len, minor_len, major_num, minor_num, draw_size);
        LV_LOG_USER("Chart %s setRightAxisOption", ref->uid);
    }
    return JS_UNDEFINED;
};

static JSValue NativeCompSetTopAxisOption(JSContext *ctx, JSValueConst this_val, int argc, JSValueConst *argv) {
    if (argc >= 1 && JS_IsObject(argv[0])) {
        COMP_REF* ref = (COMP_REF*)JS_GetOpaque(this_val, ChartClassID);
        JSValue major_len_value = JS_GetPropertyStr(ctx, argv[0], "majorLen");
        JSValue minor_len_value = JS_GetPropertyStr(ctx, argv[0], "minorLen");
        JSValue major_num_value = JS_GetPropertyStr(ctx, argv[0], "majorNum");
        JSValue minor_num_value = JS_GetPropertyStr(ctx, argv[0], "minorNum");
        JSValue draw_size_value = JS_GetPropertyStr(ctx, argv[0], "drawSize");

        int32_t major_len, minor_len, major_num, minor_num, draw_size;
        JS_ToInt32(ctx, &major_len, major_len_value);
        JS_ToInt32(ctx, &minor_len, minor_len_value);
        JS_ToInt32(ctx, &major_num, major_num_value);
        JS_ToInt32(ctx, &minor_num, minor_num_value);
        JS_ToInt32(ctx, &draw_size, draw_size_value);

        JS_FreeValue(ctx, major_len_value);
        JS_FreeValue(ctx, minor_len_value);
        JS_FreeValue(ctx, major_num_value);
        JS_FreeValue(ctx, minor_num_value);
        JS_FreeValue(ctx, draw_size_value);
        
        ((Chart*)(ref->comp))->setTopAxisOption(major_len, minor_len, major_num, minor_num, draw_size);
        LV_LOG_USER("Chart %s setTopAxisOption", ref->uid);
    }
    return JS_UNDEFINED;
};

static JSValue NativeCompSetBottomAxisOption(JSContext *ctx, JSValueConst this_val, int argc, JSValueConst *argv) {
    if (argc >= 1 && JS_IsObject(argv[0])) {
        COMP_REF* ref = (COMP_REF*)JS_GetOpaque(this_val, ChartClassID);
        JSValue major_len_value = JS_GetPropertyStr(ctx, argv[0], "majorLen");
        JSValue minor_len_value = JS_GetPropertyStr(ctx, argv[0], "minorLen");
        JSValue major_num_value = JS_GetPropertyStr(ctx, argv[0], "majorNum");
        JSValue minor_num_value = JS_GetPropertyStr(ctx, argv[0], "minorNum");
        JSValue draw_size_value = JS_GetPropertyStr(ctx, argv[0], "drawSize");

        int32_t major_len, minor_len, major_num, minor_num, draw_size;
        JS_ToInt32(ctx, &major_len, major_len_value);
        JS_ToInt32(ctx, &minor_len, minor_len_value);
        JS_ToInt32(ctx, &major_num, major_num_value);
        JS_ToInt32(ctx, &minor_num, minor_num_value);
        JS_ToInt32(ctx, &draw_size, draw_size_value);

        JS_FreeValue(ctx, major_len_value);
        JS_FreeValue(ctx, minor_len_value);
        JS_FreeValue(ctx, major_num_value);
        JS_FreeValue(ctx, minor_num_value);
        JS_FreeValue(ctx, draw_size_value);
        
        ((Chart*)(ref->comp))->setBottomAxisOption(major_len, minor_len, major_num, minor_num, draw_size);
        LV_LOG_USER("Chart %s setBottomAxisOption", ref->uid);
    }
    return JS_UNDEFINED;
};

static JSValue NativeCompSetBottomAxisData(JSContext *ctx, JSValueConst this_val, int argc, JSValueConst *argv) {
    if (argc >= 1 && JS_IsArray(ctx, argv[0])) {
        COMP_REF* ref = (COMP_REF*)JS_GetOpaque(this_val, ChartClassID);

        std::vector<axis_data> data;
        int32_t len1, len2, i, color, data_item;
        JSValue item_value;
        JSValue color_value;
        JSValue data_value;
        JSValue data_item_value;
        JSValue len2_value;
        JSValue len1_value = JS_GetPropertyStr(ctx, argv[0], "length");
        JS_ToInt32(ctx, &len1, len1_value);

        for(int i=0; i<len1; i++) {
            struct axis_data item;
            item_value = JS_GetPropertyUint32(ctx, argv[0], i);

            color_value = JS_GetPropertyStr(ctx, item_value, "color");
            data_value = JS_GetPropertyStr(ctx, item_value, "data");
            len2_value = JS_GetPropertyStr(ctx, data_value, "length");

            JS_ToInt32(ctx, &color, color_value);
            item.color = color;

            JS_ToInt32(ctx, &len2, len2_value);
            
            for (int j=0; j<len2; j++) {
                data_item_value = JS_GetPropertyUint32(ctx, data_value, j);
                JS_ToInt32(ctx, &data_item, data_item_value);
                item.data.push_back(data_item);
                JS_FreeValue(ctx, data_item_value);
            }

            data.push_back(item);

            JS_FreeValue(ctx, color_value);
            JS_FreeValue(ctx, data_value);
            JS_FreeValue(ctx, len2_value);
            JS_FreeValue(ctx, item_value);
        }
        JS_FreeValue(ctx, len1_value);

        ((Chart*)(ref->comp))->setBottomAxisData(data);
        LV_LOG_USER("Chart %s setBottomAxisData", ref->uid);
    }
    return JS_UNDEFINED;
};

static JSValue NativeCompSetTopAxisData(JSContext *ctx, JSValueConst this_val, int argc, JSValueConst *argv) {
    if (argc >= 1 && JS_IsArray(ctx, argv[0])) {
        COMP_REF* ref = (COMP_REF*)JS_GetOpaque(this_val, ChartClassID);

        std::vector<axis_data> data;
        int32_t len1, len2, i, color, data_item;
        JSValue item_value;
        JSValue color_value;
        JSValue data_value;
        JSValue data_item_value;
        JSValue len2_value;
        JSValue len1_value = JS_GetPropertyStr(ctx, argv[0], "length");
        JS_ToInt32(ctx, &len1, len1_value);

        for(int i=0; i<len1; i++) {
            struct axis_data item;
            item_value = JS_GetPropertyUint32(ctx, argv[0], i);

            color_value = JS_GetPropertyStr(ctx, item_value, "color");
            data_value = JS_GetPropertyStr(ctx, item_value, "data");
            len2_value = JS_GetPropertyStr(ctx, data_value, "length");

            JS_ToInt32(ctx, &color, color_value);
            item.color = color;

            JS_ToInt32(ctx, &len2, len2_value);
            
            for (int j=0; j<len2; j++) {
                data_item_value = JS_GetPropertyUint32(ctx, data_value, j);
                JS_ToInt32(ctx, &data_item, data_item_value);
                item.data.push_back(data_item);
                JS_FreeValue(ctx, data_item_value);
            }

            data.push_back(item);

            JS_FreeValue(ctx, color_value);
            JS_FreeValue(ctx, data_value);
            JS_FreeValue(ctx, len2_value);
            JS_FreeValue(ctx, item_value);
        }
        JS_FreeValue(ctx, len1_value);

        ((Chart*)(ref->comp))->setTopAxisData(data);
        LV_LOG_USER("Chart %s setTopAxisData", ref->uid);
    }
    return JS_UNDEFINED;
};

static JSValue NativeCompSetLeftAxisData(JSContext *ctx, JSValueConst this_val, int argc, JSValueConst *argv) {
    if (argc >= 1 && JS_IsArray(ctx, argv[0])) {
        COMP_REF* ref = (COMP_REF*)JS_GetOpaque(this_val, ChartClassID);

        std::vector<axis_data> data;
        int32_t len1, len2, i, color, data_item;
        JSValue item_value;
        JSValue color_value;
        JSValue data_value;
        JSValue data_item_value;
        JSValue len2_value;
        JSValue len1_value = JS_GetPropertyStr(ctx, argv[0], "length");
        JS_ToInt32(ctx, &len1, len1_value);

        for(int i=0; i<len1; i++) {
            struct axis_data item;
            item_value = JS_GetPropertyUint32(ctx, argv[0], i);

            color_value = JS_GetPropertyStr(ctx, item_value, "color");
            data_value = JS_GetPropertyStr(ctx, item_value, "data");
            len2_value = JS_GetPropertyStr(ctx, data_value, "length");

            JS_ToInt32(ctx, &color, color_value);
            item.color = color;

            JS_ToInt32(ctx, &len2, len2_value);
            
            for (int j=0; j<len2; j++) {
                data_item_value = JS_GetPropertyUint32(ctx, data_value, j);
                JS_ToInt32(ctx, &data_item, data_item_value);
                item.data.push_back(data_item);
                JS_FreeValue(ctx, data_item_value);   
            }

            data.push_back(item);

            JS_FreeValue(ctx, color_value);
            JS_FreeValue(ctx, data_value);
            JS_FreeValue(ctx, len2_value);
            JS_FreeValue(ctx, item_value);
        }
        JS_FreeValue(ctx, len1_value);
        
        ((Chart*)(ref->comp))->setLeftAxisData(data);
        LV_LOG_USER("Chart %s setLeftAxisData", ref->uid);
    }
    return JS_UNDEFINED;
};

static JSValue NativeCompSetRightAxisData(JSContext *ctx, JSValueConst this_val, int argc, JSValueConst *argv) {
    if (argc >= 1 && JS_IsArray(ctx, argv[0])) {
        COMP_REF* ref = (COMP_REF*)JS_GetOpaque(this_val, ChartClassID);

        std::vector<axis_data> data;
        int32_t len1, len2, i, color, data_item;
        JSValue item_value;
        JSValue color_value;
        JSValue data_value;
        JSValue data_item_value;
        JSValue len2_value;
        JSValue len1_value = JS_GetPropertyStr(ctx, argv[0], "length");
        JS_ToInt32(ctx, &len1, len1_value);

        for(int i=0; i<len1; i++) {
            struct axis_data item;
            item_value = JS_GetPropertyUint32(ctx, argv[0], i);

            color_value = JS_GetPropertyStr(ctx, item_value, "color");
            data_value = JS_GetPropertyStr(ctx, item_value, "data");
            len2_value = JS_GetPropertyStr(ctx, data_value, "length");

            JS_ToInt32(ctx, &color, color_value);
            item.color = color;

            JS_ToInt32(ctx, &len2, len2_value);
            
            for (int j=0; j<len2; j++) {
                data_item_value = JS_GetPropertyUint32(ctx, data_value, j);
                JS_ToInt32(ctx, &data_item, data_item_value);
                item.data.push_back(data_item);
                JS_FreeValue(ctx, data_item_value);   
            }

            data.push_back(item);

            JS_FreeValue(ctx, color_value);
            JS_FreeValue(ctx, data_value);
            JS_FreeValue(ctx, len2_value);
            JS_FreeValue(ctx, item_value);
        }
        JS_FreeValue(ctx, len1_value);
        
        ((Chart*)(ref->comp))->setRightAxisData(data);
        LV_LOG_USER("Chart %s setRightAxisData", ref->uid);
    }
    return JS_UNDEFINED;
};

static JSValue NativeCompSetScatterData (JSContext *ctx, JSValueConst this_val, int argc, JSValueConst *argv) {
    if (argc >= 1 && JS_IsArray(ctx, argv[0])) {
        COMP_REF* ref = (COMP_REF*)JS_GetOpaque(this_val, ChartClassID);

        std::vector<axis_data> data;
        int32_t len1, len2, i, color, data_item;
        JSValue item_value;
        JSValue color_value;
        JSValue data_value;
        JSValue data_item_value;
        JSValue len2_value;
        JSValue len1_value = JS_GetPropertyStr(ctx, argv[0], "length");
        JS_ToInt32(ctx, &len1, len1_value);

        for(int i=0; i<len1; i++) {
            struct axis_data item;
            item_value = JS_GetPropertyUint32(ctx, argv[0], i);

            color_value = JS_GetPropertyStr(ctx, item_value, "color");
            data_value = JS_GetPropertyStr(ctx, item_value, "data");
            len2_value = JS_GetPropertyStr(ctx, data_value, "length");

            JS_ToInt32(ctx, &color, color_value);
            item.color = color;

            JS_ToInt32(ctx, &len2, len2_value);
            
            for (int j=0; j<len2; j++) {
                data_item_value = JS_GetPropertyUint32(ctx, data_value, j);
                JS_ToInt32(ctx, &data_item, data_item_value);
                item.data.push_back(data_item);
                JS_FreeValue(ctx, data_item_value);   
            }

            data.push_back(item);

            JS_FreeValue(ctx, color_value);
            JS_FreeValue(ctx, data_value);
            JS_FreeValue(ctx, len2_value);
            JS_FreeValue(ctx, item_value);
        }
        JS_FreeValue(ctx, len1_value);
        
        ((Chart*)(ref->comp))->setScatterData(data);
        LV_LOG_USER("Chart %s setScatterData", ref->uid);
    }
    return JS_UNDEFINED;
};

static JSValue NativeCompSetLeftAxisRange(JSContext *ctx, JSValueConst this_val, int argc, JSValueConst *argv) {
    if (argc >= 1 && JS_IsArray(ctx, argv[0])) {
        COMP_REF* ref = (COMP_REF*)JS_GetOpaque(this_val, ChartClassID);

        JSValue min_value = JS_GetPropertyUint32(ctx, argv[0], 0);
        JSValue max_value = JS_GetPropertyUint32(ctx, argv[0], 1);

        int32_t min, max;

        JS_ToInt32(ctx, &min, min_value);
        JS_ToInt32(ctx, &max, max_value);

        ((Chart*)(ref->comp))->setLeftAxisRange(min, max);

        JS_FreeValue(ctx, min_value);
        JS_FreeValue(ctx, max_value);

        LV_LOG_USER("Chart %s setLeftAxisRange", ref->uid);
    }
};

static JSValue NativeCompSetRightAxisRange(JSContext *ctx, JSValueConst this_val, int argc, JSValueConst *argv) {
    if (argc >= 1 && JS_IsArray(ctx, argv[0])) {
        COMP_REF* ref = (COMP_REF*)JS_GetOpaque(this_val, ChartClassID);

        JSValue min_value = JS_GetPropertyUint32(ctx, argv[0], 0);
        JSValue max_value = JS_GetPropertyUint32(ctx, argv[0], 1);

        int32_t min, max;

        JS_ToInt32(ctx, &min, min_value);
        JS_ToInt32(ctx, &max, max_value);

        ((Chart*)(ref->comp))->setRightAxisRange(min, max);

        JS_FreeValue(ctx, min_value);
        JS_FreeValue(ctx, max_value);

        LV_LOG_USER("Chart %s setRightAxisRange", ref->uid);
    }
};

static JSValue NativeCompSetTopAxisRange(JSContext *ctx, JSValueConst this_val, int argc, JSValueConst *argv) {
    if (argc >= 1 && JS_IsArray(ctx, argv[0])) {
        COMP_REF* ref = (COMP_REF*)JS_GetOpaque(this_val, ChartClassID);

        JSValue min_value = JS_GetPropertyUint32(ctx, argv[0], 0);
        JSValue max_value = JS_GetPropertyUint32(ctx, argv[0], 1);

        int32_t min, max;

        JS_ToInt32(ctx, &min, min_value);
        JS_ToInt32(ctx, &max, max_value);

        ((Chart*)(ref->comp))->setTopAxisRange(min, max);

        JS_FreeValue(ctx, min_value);
        JS_FreeValue(ctx, max_value);

        LV_LOG_USER("Chart %s setTopAxisRange", ref->uid);
    }
};

static JSValue NativeCompSetBottomAxisRange(JSContext *ctx, JSValueConst this_val, int argc, JSValueConst *argv) {
    if (argc >= 1 && JS_IsArray(ctx, argv[0])) {
        COMP_REF* ref = (COMP_REF*)JS_GetOpaque(this_val, ChartClassID);

        JSValue min_value = JS_GetPropertyUint32(ctx, argv[0], 0);
        JSValue max_value = JS_GetPropertyUint32(ctx, argv[0], 1);

        int32_t min, max;

        JS_ToInt32(ctx, &min, min_value);
        JS_ToInt32(ctx, &max, max_value);

        ((Chart*)(ref->comp))->setBottomAxisRange(min, max);

        JS_FreeValue(ctx, min_value);
        JS_FreeValue(ctx, max_value);

        LV_LOG_USER("Chart %s setBottomAxisRange", ref->uid);
    }
};

static const JSCFunctionListEntry ComponentProtoFuncs[] = {
    SJS_CFUNC_DEF("setLeftAxisRange", 0, NativeCompSetLeftAxisRange),
    SJS_CFUNC_DEF("setRightAxisRange", 0, NativeCompSetRightAxisRange),
    SJS_CFUNC_DEF("setBottomAxisRange", 0, NativeCompSetBottomAxisRange),
    SJS_CFUNC_DEF("setTopAxisRange", 0, NativeCompSetTopAxisRange),

    SJS_CFUNC_DEF("setLeftAxisLabels", 0, NativeCompSetLeftAxisLabels),
    SJS_CFUNC_DEF("setRightAxisLabels", 0, NativeCompSetRightAxisLabels),
    SJS_CFUNC_DEF("setBottomAxisLabels", 0, NativeCompSetBottomAxisLabels),
    SJS_CFUNC_DEF("setTopAxisLabels", 0, NativeCompSetTopAxisLabels),

    SJS_CFUNC_DEF("setDivLineCount", 0, NativeCompSetDivLine),
    SJS_CFUNC_DEF("setRightAxisOption", 0, NativeCompSetRightAxisOption),
    SJS_CFUNC_DEF("setTopAxisOption", 0, NativeCompSetTopAxisOption),
    SJS_CFUNC_DEF("setBottomAxisOption", 0, NativeCompSetBottomAxisOption),
    SJS_CFUNC_DEF("setLeftAxisOption", 0, NativeCompSetLeftAxisOption),
    SJS_CFUNC_DEF("setLeftAxisData", 0, NativeCompSetLeftAxisData),
    SJS_CFUNC_DEF("setRightAxisData", 0, NativeCompSetRightAxisData),
    SJS_CFUNC_DEF("setScatterData", 0, NativeCompSetScatterData),
    SJS_CFUNC_DEF("setTopAxisData", 0, NativeCompSetTopAxisData),
    SJS_CFUNC_DEF("setBottomAxisData", 0, NativeCompSetBottomAxisData),
    SJS_CFUNC_DEF("setType", 0, NativeCompSetType),
    SJS_CFUNC_DEF("setPointNum", 0, NativeCompSetPointNum),
    SJS_CFUNC_DEF("refresh", 0, NativeCompRefreshComponent),
    SJS_CFUNC_DEF("nativeSetStyle", 0, NativeCompSetStyle),
    SJS_CFUNC_DEF("addEventListener", 0, NativeCompAddEventListener),
    SJS_CFUNC_DEF("align", 0, NativeCompSetAlign),
    SJS_CFUNC_DEF("alignTo", 0, NativeCompSetAlignTo),
    SJS_CFUNC_DEF("getBoundingClientRect", 0, GetStyleBoundClinetRect),
    SJS_OBJECT_DEF("style", style_funcs, countof(style_funcs)),
    SJS_CFUNC_DEF("setBackgroundImage", 0, NativeCompSetBackgroundImage),
    SJS_CFUNC_DEF("moveToFront", 0, NativeCompMoveToFront),
    SJS_CFUNC_DEF("moveToBackground", 0, NativeCompMoveToBackground),
    SJS_CFUNC_DEF("scrollIntoView", 0, NativeCompScrollIntoView),
    SJS_CFUNC_DEF("close", 0, NativeCompCloseComponent),
};

static const JSCFunctionListEntry ComponentClassFuncs[] = {
};

static JSValue ChartConstructor(JSContext *ctx, JSValueConst new_target, int argc, JSValueConst *argv) {
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
        proto = JS_GetClassProto(ctx, ChartClassID);
    } else {
        proto = JS_GetPropertyStr(ctx, new_target, "prototype");
        if (JS_IsException(proto))
            goto fail;
    }

    obj = JS_NewObjectProtoClass(ctx, proto, ChartClassID);
    JS_FreeValue(ctx, proto);
    if (JS_IsException(obj))
        goto fail;
    s = (COMP_REF*)js_mallocz(ctx, sizeof(*s));
    s->uid = uid;
    s->comp = new Chart(uid, NULL);

    JS_FreeCString(ctx, uid);

    if (!s)
        goto fail;

    JS_SetOpaque(obj, s);
    LV_LOG_USER("Chart %s created", uid);
    return obj;
 fail:
    JS_FreeValue(ctx, obj);
    return JS_EXCEPTION;
};

static void ChartFinalizer(JSRuntime *rt, JSValue val) {
    COMP_REF *th = (COMP_REF *)JS_GetOpaque(val, ChartClassID);
    LV_LOG_USER("Chart %s release", th->uid);
    if (th) {
        delete static_cast<Chart*>(th->comp);
        free(th);
    }
};

static JSClassDef ChartClass = {
    "Chart",
    .finalizer = ChartFinalizer,
};

void NativeComponentChartInit (JSContext* ctx, JSValue ns) {
    JS_NewClassID(&ChartClassID);
    JS_NewClass(JS_GetRuntime(ctx), ChartClassID, &ChartClass);
    JSValue proto = JS_NewObject(ctx);
    JS_SetPropertyFunctionList(ctx, proto, ComponentProtoFuncs, countof(ComponentProtoFuncs));
    JS_SetClassProto(ctx, ChartClassID, proto);

    JSValue obj = JS_NewCFunction2(ctx, ChartConstructor, "Chart", 1, JS_CFUNC_constructor, 0);
    JS_SetConstructor(ctx, obj, proto);
    JS_SetPropertyFunctionList(ctx, obj, ComponentClassFuncs, countof(ComponentClassFuncs));
    JS_DefinePropertyValueStr(ctx, ns, "Chart", obj, JS_PROP_C_W_E);
};

