#pragma once
#include <stdlib.h>

#include "native/components/component.hpp"
#include "native/core/basic/comp.hpp"

class ProgressBar final : public BasicComponent {
 public:
  ProgressBar(std::string uid, lv_obj_t* parent = nullptr);

  void setValue (int32_t value, bool use_animation);

  void setRange (int32_t start, int32_t end);
};
