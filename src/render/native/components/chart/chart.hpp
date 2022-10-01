#pragma once
#include <stdlib.h>
#include <vector>

#include "native/components/component.hpp"
#include "native/core/basic/comp.hpp"

class Chart : public BasicComponent {
 public:
  Chart(std::string uid, lv_obj_t* parent = nullptr);

  lv_chart_series_t* left_axis = nullptr;
  lv_chart_series_t* bottom_axis = nullptr;
  lv_chart_series_t* right_axis = nullptr;
  lv_chart_series_t* top_axis = nullptr;

  void setType (int32_t type);

  void setLeftAxisOption (
    int32_t major_len, 
    int32_t minor_len, 
    int32_t major_num, 
    int32_t minor_num, 
    int32_t draw_size
  );
  
  void setRightAxisOption (
    int32_t major_len, 
    int32_t minor_len, 
    int32_t major_num, 
    int32_t minor_num, 
    int32_t draw_size
  );

  void setTopAxisOption (
    int32_t major_len, 
    int32_t minor_len, 
    int32_t major_num, 
    int32_t minor_num, 
    int32_t draw_size
  );

  void setBottomAxisOption (
    int32_t major_len, 
    int32_t minor_len, 
    int32_t major_num, 
    int32_t minor_num, 
    int32_t draw_size
  );

  void setLeftAxisData (std::vector<int32_t> data);
  void setRightAxisData (std::vector<int32_t> data);
  void setBottomAxisData (std::vector<int32_t> data);
  void setTopAxisData (std::vector<int32_t> data);

  void setPointNum (int32_t num);

  void setDivLineCount (int32_t hdiv, int32_t vdiv);
};