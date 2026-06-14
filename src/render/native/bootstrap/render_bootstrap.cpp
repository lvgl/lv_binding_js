#include "render_bootstrap.hpp"

#include "native/components/component.hpp"
#include "native/core/animate/animate.hpp"
#include "native/core/lv_conf/lv_conf.hpp"
#include "native/core/lv_conf/lv_style_prop_extend.h"
#include "native/core/style/style.hpp"
#include "native/core/dimensions/dimensions.hpp"
#include "native/core/refresh/refresh.hpp"
#include "native/core/theme/theme.hpp"

#define NATIVE_RENDER_OBJ "NativeRender"

void NativeRenderInit (JSContext* ctx, JSValue ns) {
    JSValue obj = JS_NewObject(ctx);
    JS_SetPropertyStr(ctx, ns, NATIVE_RENDER_OBJ, obj);

    NativeComponentInit(ctx, obj);

    NativeEventWrapInit(ctx);

    NativeAnimateInit(ctx, obj);

    NativeDimensionsInit(ctx, obj);

    NativeRenderUtilInit(ctx, obj);

    NativeThemeInit(ctx, obj);

    lv_init();
    lv_png_init();

    /**
     * lvgljs_style_css_prop_init should be called after lv_init and before Native_lv_conf_Init
     * because lvgljs_style_css_prop_init will register the css properties to lv_style_prop_t
     * and Native_lv_conf_Init will use the lv_style_prop_t to register the properties to lv_conf.h
     * if lvgljs_style_css_prop_init is called before lv_init, the css properties will not be registered to lv_style_prop_t
     * and Native_lv_conf_Init will not use the css properties to register the properties to lv_conf.h
     * this will cause the css properties to not be used in lvgljs
     */
    lvgljs_style_css_prop_init();

    Native_lv_conf_Init(ctx, obj);

    /* css handler unordered_map; after lvgljs_style_css_prop_init/Native_lv_conf_Init for LV_STYLE_CSS_* ids */
    NativeStyleInit(ctx);
};

lv_style_prop_t lvjs_style_register_prop(void)
{
    return lv_style_register_prop(LV_STYLE_PROP_FLAG_NONE);
}
