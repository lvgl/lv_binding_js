#pragma once
#include <stdlib.h>

#include "native/components/component.hpp"
#include "native/core/basic/comp.hpp"

class Roller : public BasicComponent {
 public:
  Roller(std::string uid, lv_obj_t* parent = nullptr);

  void setOptions (std::vector<std::string>& options, uint32_t mode);

  void setSelectIndex (uint32_t index);

  void setVisibleRowCount (uint32_t count);
};