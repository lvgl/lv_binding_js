#pragma once
#include <stdlib.h>

#include "native/components/component.hpp"
#include "native/core/basic/comp.hpp"

class Chart : public BasicComponent {
 public:
  Chart(std::string uid, lv_obj_t* parent = nullptr);
};