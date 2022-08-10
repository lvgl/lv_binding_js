#pragma once
#include <stdlib.h>

#include "native/components/component.hpp"
#include "native/core/basic/comp.hpp"

class Switch : public BasicComponent {
 public:
  Switch(std::string uid, lv_obj_t* parent = nullptr);
};