#pragma once
#include <stdlib.h>

#include "native/components/component.hpp"
#include "native/core/basic/comp.hpp"

class Line : public BasicComponent {
 public:
  Line(std::string uid, lv_obj_t* parent = nullptr);

  std::vector<lv_point_t> points;

  setPoints (std::vector<lv_point_t> points, int32_t nums);
};