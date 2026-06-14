#include "screenshot.hpp"

#if LV_USE_SNAPSHOT

#include <stdlib.h>

#include "framebuffer32_to_rgba.h"
#include "render/native/core/img/png/lodepng.h"

bool hal_capture_display_png(const char * path)
{
    if(!path || path[0] == '\0') return false;

    lv_obj_t * scr = lv_screen_active();
    if(!scr) return false;

    lv_draw_buf_t * snapshot = lv_snapshot_take(scr, LV_COLOR_FORMAT_ARGB8888);
    if(!snapshot) return false;

    const int w = snapshot->header.w;
    const int h = snapshot->header.h;
    if(w <= 0 || h <= 0) {
        lv_draw_buf_destroy(snapshot);
        return false;
    }

    const size_t rgba_size = (size_t)w * (size_t)h * 4;
    unsigned char * rgba = (unsigned char *)malloc(rgba_size);
    if(!rgba) {
        lv_draw_buf_destroy(snapshot);
        return false;
    }

    const uint32_t stride = snapshot->header.stride;
    bool converted = framebuffer32_to_rgba((const uint32_t *)snapshot->data, rgba, w, h, stride);
    lv_draw_buf_destroy(snapshot);

    if(!converted) {
        free(rgba);
        return false;
    }

    const unsigned err = lodepng_encode32_file(path, rgba, (unsigned)w, (unsigned)h);
    free(rgba);
    return err == 0;
}

#else

bool hal_capture_display_png(const char * path)
{
    (void)path;
    return false;
}

#endif /* LV_USE_SNAPSHOT */
