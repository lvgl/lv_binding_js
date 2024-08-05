#pragma once
#include <stdlib.h>

#include "native/components/component.hpp"
#include "native/core/basic/comp.hpp"

class Mask final : public BasicComponent {
 public:
  Mask(std::string uid, lv_obj_t* parent = nullptr);

  virtual void initCompStyle (int32_t type);
};
