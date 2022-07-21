#pragma once
#include <stdlib.h>

#include "native/components/component.hpp"
#include "native/core/basic/comp.hpp"

#include "./lodepng.h"

void lodepng_free(void* ptr);

class Image : public BasicComponent {
 public:
  Image(std::string uid, lv_obj_t* parent = nullptr);
  ~Image();

  lv_img_dsc_t image_desc = {
    {
      LV_IMG_CF_TRUE_COLOR_ALPHA,
      0,
      2,
      0,
      0
    },
    .data_size = 0,
    .data = nullptr,
  };
  uint8_t* image_buf = nullptr;
  
  void setImageBinary(uint8_t* buf, size_t len);
};