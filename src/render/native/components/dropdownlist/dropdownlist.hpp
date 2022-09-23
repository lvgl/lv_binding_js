#pragma once
#include <stdlib.h>

#include "native/components/component.hpp"
#include "native/core/basic/comp.hpp"

enum EArrowType {
  DROPDOWNLIST_UP,
  DROPDOWNLIST_RIGHT,
  DROPDOWNLIST_DOWN,
  DROPDOWNLIST_LEFT,
};

class Dropdownlist : public BasicComponent {
 public:
  Dropdownlist(std::string uid, lv_obj_t* parent = nullptr);

  std::string options;

  void setItems (std::vector<std::string>& items);

  void setSelectIndex (int32_t index);

  void setText (std::string text);

  void setDir (lv_dir_t dir);

  void setArrowDir (int32_t dir);

  void setHighLightSelect (bool payload);

  std::string text;
};