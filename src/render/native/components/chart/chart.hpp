#pragma once
#include <stdlib.h>
#include <vector>

#include "native/components/component.hpp"
#include "native/core/basic/comp.hpp"

typedef struct axis_data {
  int32_t color;
  std::vector<int32_t> data;
} axis_data;

class Chart : public BasicComponent {
 public:
  Chart(std::string uid, lv_obj_t* parent = nullptr);

  std::vector<lv_chart_series_t*> left_axis;
  std::vector<lv_chart_series_t*> bottom_axis;
  std::vector<lv_chart_series_t*> right_axis;
  std::vector<lv_chart_series_t*> top_axis;

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

  void setLeftAxisData (std::vector<axis_data>& data);
  void setRightAxisData (std::vector<axis_data>& data);
  void setBottomAxisData (std::vector<axis_data>& data);
  void setTopAxisData (std::vector<axis_data>& data);

  void setPointNum (int32_t num);

  void setDivLineCount (int32_t hdiv, int32_t vdiv);
};