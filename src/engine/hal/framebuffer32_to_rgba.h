#pragma once

#include <stdbool.h>
#include <stdint.h>

#ifdef __cplusplus
extern "C" {
#endif

/** Convert a 32-bit-per-pixel framebuffer to RGBA. @p stride is row pitch in bytes; pass 0 for w * 4. */
bool framebuffer32_to_rgba(const uint32_t * fb, unsigned char * rgba, int w, int h, uint32_t stride);

#ifdef __cplusplus
}
#endif
