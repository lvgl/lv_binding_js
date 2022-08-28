#pragma once
#include <stdlib.h>

#include "native/components/component.hpp"
#include "native/core/basic/comp.hpp"

class List : public BasicComponent {
 public:
  List(std::string uid, lv_obj_t* parent = nullptr);

  addItem (std::string& icon, std::string& text);
};