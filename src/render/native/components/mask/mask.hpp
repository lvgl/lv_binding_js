#pragma once
#include <stdlib.h>

#include "native/components/component.hpp"
#include "native/core/basic/comp.hpp"

class Mask : public BasicComponent {
 public:
  Mask(std::string uid, lv_obj_t* parent = nullptr);

  void Mask::initCompStyle (int32_t type);
};