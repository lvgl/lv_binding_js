#pragma once
#include <stdlib.h>

#include "native/components/component.hpp"
#include "native/core/basic/comp.hpp"

class Slider : public BasicComponent {
 public:
  Slider(std::string uid, lv_obj_t* parent = nullptr);
};