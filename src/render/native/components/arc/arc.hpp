#pragma once
#include <stdlib.h>

#include "native/components/component.hpp"
#include "native/core/basic/comp.hpp"

class Arc final : public BasicComponent {
 public:
  Arc(std::string uid, lv_obj_t* parent = nullptr);

  void setRange (int32_t min, int32_t max);

  void setValue (int32_t value);

  void setStartAngle (int32_t value);

  void setEndAngle (int32_t value);

  void setBackgroundStartAngle (int32_t value);

  void setBackgroundEndAngle (int32_t value);

  void setRotation (int32_t value);

  void setMode (int32_t mode);

  void setChangeRate (int32_t value);

  void setArcImage (uint8_t* buf, size_t buf_len, int32_t style_type, std::string& symbol);

  void virtual initCompStyle (int32_t type);
};
