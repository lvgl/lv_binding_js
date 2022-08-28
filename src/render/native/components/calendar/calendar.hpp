#pragma once
#include <stdlib.h>

#include "native/components/component.hpp"
#include "native/core/basic/comp.hpp"



class Calendar : public BasicComponent {
 public:
  Calendar(std::string uid, lv_obj_t* parent = nullptr);

  std::vector<lv_calendar_date_t> highlighted_days;

  void setToday (uint32_t year, uint32_t month, uint32_t day);
  void setShownMonth (uint32_t year, uint32_t month);
  void setHighlightDates (std::vector<lv_calendar_date_t>& dates, int32_t num);
};