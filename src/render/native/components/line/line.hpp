#pragma once
#include <stdlib.h>

#include "native/components/component.hpp"
#include "native/core/basic/comp.hpp"

class Line final : public BasicComponent {
 public:
  Line(std::string uid, lv_obj_t* parent = nullptr);

  std::vector<lv_point_precise_t> points;

  void setPoints (std::vector<lv_point_precise_t>& points, int32_t nums);
};
