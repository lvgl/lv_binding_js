#pragma once
#include <stdlib.h>

#include "native/components/component.hpp"
#include "native/core/basic/comp.hpp"

class Keyboard : public BasicComponent {
 public:
  Keyboard(std::string uid, lv_obj_t* parent = nullptr);
};