#include "framebuffer32_to_rgba.h"

bool framebuffer32_to_rgba(const uint32_t * fb, unsigned char * rgba, int w, int h, uint32_t stride)
{
    if(!fb || !rgba || w <= 0 || h <= 0) {
        return false;
    }

    if(stride == 0) {
        stride = (uint32_t)w * sizeof(uint32_t);
    }

    if(stride < (uint32_t)w * sizeof(uint32_t)) {
        return false;
    }

    if(stride % sizeof(uint32_t) != 0) {
        return false;
    }

    const uint8_t * src = (const uint8_t *)fb;
    for(int y = 0; y < h; y++) {
        const uint32_t * row = (const uint32_t *)(src + (uint32_t)y * stride);
        for(int x = 0; x < w; x++) {
            uint32_t px = row[x];
            uint32_t dst = ((uint32_t)y * (uint32_t)w + (uint32_t)x) * 4;
            rgba[dst + 0] = (unsigned char)((px >> 16) & 0xFF);
            rgba[dst + 1] = (unsigned char)((px >> 8) & 0xFF);
            rgba[dst + 2] = (unsigned char)(px & 0xFF);
            rgba[dst + 3] = (unsigned char)((px >> 24) & 0xFF);
        }
    }
    return true;
}
