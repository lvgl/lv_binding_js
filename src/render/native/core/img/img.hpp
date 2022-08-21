#pragma once

#include "lvgl/lvgl.h"
#include "./png/png.hpp"

typedef enum {
  IMAGE_TYPE_PNG,
  IMAGE_TYPE_UNKNOWN,
} IMAGE_TYPE;

typedef struct {
  lv_img_header_t header;
  uint32_t data_size;
  const uint8_t* data;
  IMAGE_TYPE type; 
} lv_img_dsc_t_1;

uint8_t* GetImgDesc (uint8_t* buf, size_t len, lv_img_dsc_t_1* image_desc);