#pragma once
#include <stdlib.h>

#include "native/components/component.hpp"
#include "native/core/basic/comp.hpp"

#include "./lodepng.h"
#include "render/native/core/img/img.hpp"
// #include "deps/lv_png/lv_png.h"
// #include "deps/lv_png/lodepng.h"
// #include "deps/lvgl/src/extra/libs/png/lv_png.h"
// #include "deps/lvgl/src/extra/libs/png/lodepng.h"

#define LV_COLOR_DEPTH 32

class Image : public BasicComponent {
 public:
  Image(std::string uid, lv_obj_t* parent = nullptr);
  ~Image();

  lv_img_dsc_t_1* image_desc = nullptr;
  uint8_t* image_buf = nullptr;
  std::string symbol;
  
  void setImageBinary(uint8_t* buf, size_t len);
  
  void setSymbol (std::string& str);

  void virtual initCompStyle (int32_t type);
};