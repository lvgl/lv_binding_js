#pragma once
#include <stdlib.h>

#include "native/components/component.hpp"
#include "native/core/basic/comp.hpp"

#include "render/native/core/img/img.hpp"

#define LV_COLOR_DEPTH 32

class GIF final : public BasicComponent {
 public:
  GIF(std::string uid, lv_obj_t* parent = nullptr);
  ~GIF();

  lv_img_dsc_t_1* gif_desc = nullptr;
  uint8_t* gif_buf = nullptr;

  void setGIFBinary(uint8_t* buf, size_t len);

  void virtual initCompStyle (int32_t type);
};
