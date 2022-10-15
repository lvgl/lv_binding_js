#pragma once

#include "lvgl/lvgl.h"

bool isgif (uint16_t* buf);

void GetGIFInfo(uint8_t* buf, uint32_t* width, uint32_t* height);