#pragma once
#include <stdlib.h>

#include "native/components/component.hpp"
#include "native/core/basic/comp.hpp"

class Dropdownlist : public BasicComponent {
 public:
  Dropdownlist(std::string uid, lv_obj_t* parent = nullptr);

  void setItems (std::vector<std::string> items);

  void setValue (int32_t index);

  void setText (std::string text);

  void setDir (lv_dir_t dir);

  void setArrowDir ();
};