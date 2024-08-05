#pragma once
#include <stdlib.h>

#include "native/components/component.hpp"
#include "native/core/basic/comp.hpp"

class Checkbox final : public BasicComponent {
public:
  Checkbox(std::string uid, lv_obj_t* parent = nullptr);

  void setText (std::string text);

  void setChecked (bool payload);

  void setDisabled (bool payload);

  void virtual initCompStyle (int32_t type);
};
