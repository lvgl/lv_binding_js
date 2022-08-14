#pragma once
#include <stdlib.h>

#include "native/components/component.hpp"
#include "native/core/basic/comp.hpp"

class Textarea : public BasicComponent {
 public:
  Textarea(std::string uid, lv_obj_t* parent = nullptr);

  void setOneLine (bool payload);

  void setText (std::string str);
};