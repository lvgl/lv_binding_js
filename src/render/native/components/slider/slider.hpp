#pragma once
#include <stdlib.h>

#include "native/components/component.hpp"
#include "native/core/basic/comp.hpp"

class Slider : public BasicComponent {
 public:
  Slider(std::string uid, lv_obj_t* parent = nullptr);

  void setRange (int32_t min, int32_t max);

  void setValue (int32_t value);

  void virtual initCompStyle (int32_t type);
};