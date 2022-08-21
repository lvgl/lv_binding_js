#pragma once

#include "lvgl/lvgl.h"
#include "render/native/core/img/img.hpp"

#include "./lodepng.h"

void lv_png_init(void);

bool ispng (uint16_t* buf);

void convert_color_depth(uint8_t * img, uint32_t px_cnt);