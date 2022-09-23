#pragma once
#include <stdlib.h>

#include "native/components/component.hpp"
#include "native/core/basic/comp.hpp"

class Text : public BasicComponent {
 public:
  Text(std::string uid, lv_obj_t* parent = nullptr);

  std::string text;
  
  void setText(std::string& str);

  virtual void initCompStyle (int32_t type);
};