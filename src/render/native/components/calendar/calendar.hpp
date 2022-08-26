#pragma once
#include <stdlib.h>

#include "native/components/component.hpp"
#include "native/core/basic/comp.hpp"



class Calendar : public BasicComponent {
 public:
  Calendar(std::string uid, lv_obj_t* parent = nullptr);

  std::vector<lv_calendar_date_t> highlighted_days;

  setToday (uint32_t year, uint32_t month, uint32_t day);
  setShownMonth (uint32_t year, uint32_t month);
  setHighlightDates (std::vector<lv_calendar_date_t>, int32_t num);
};