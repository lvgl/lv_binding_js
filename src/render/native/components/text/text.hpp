#pragma once
#include <stdlib.h>

#include "native/components/component.hpp"
#include "native/core/basic/comp.hpp"

class Text : public BasicComponent {
 public:
  Text(std::string uid, lv_obj_t* parent = nullptr);
  
  void setText(std::string str);
};