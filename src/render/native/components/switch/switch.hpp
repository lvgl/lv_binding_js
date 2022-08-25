#pragma once
#include <stdlib.h>

#include "native/components/component.hpp"
#include "native/core/basic/comp.hpp"

class Switch : public BasicComponent {
 public:
  Switch(std::string uid, lv_obj_t* parent = nullptr);

  void setValue (bool value);

  void setDisabled (bool payload);

  void virtual initCompStyle (int32_t type);
};