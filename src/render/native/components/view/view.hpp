#pragma once
#include <stdlib.h>

#include "native/components/component.hpp"
#include "native/core/basic/comp.hpp"

class View : public BasicComponent {
 public:
  View(lv_obj_t* parent = nullptr);
  ~View();
};