#pragma once
#include <stdlib.h>
#include <vector>

#include "native/components/component.hpp"
#include "native/core/basic/comp.hpp"

typedef struct axis_data {
  int32_t color;
  std::vector<int32_t> data;
} axis_data;

class Chart final : public BasicComponent {
 public:
  Chart(std::string uid, lv_obj_t* parent = nullptr);
  ~Chart();

  std::vector<lv_chart_series_t*> left_axis;
  std::vector<lv_chart_series_t*> bottom_axis;
  std::vector<lv_chart_series_t*> right_axis;
  std::vector<lv_chart_series_t*> top_axis;

  std::vector<std::string> left_axis_labels;
  std::vector<std::string> right_axis_labels;
  std::vector<std::string> top_axis_labels;
  std::vector<std::string> bottom_axis_labels;

  void setLeftAxisRange (int32_t min, int32_t max);
  void setRightAxisRange (int32_t min, int32_t max);
  void setTopAxisRange (int32_t min, int32_t max);
  void setBottomAxisRange (int32_t min, int32_t max);

  void setLeftAxisLabels (std::vector<std::string>& labels);
  void setRightAxisLabels (std::vector<std::string>& labels);
  void setBottomAxisLabels (std::vector<std::string>& labels);
  void setTopAxisLabels (std::vector<std::string>& labels);

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

  void setScatterData (std::vector<axis_data>& data);

  void setPointNum (int32_t num);

  void setDivLineCount (int32_t hdiv, int32_t vdiv);

  /* LVGL 8 lv_chart_set_zoom_x/y() replacement: wrap the chart in a
   * scrollable viewport and enlarge the chart itself (factor is 256-based). */
  void setZoomX (int32_t factor);
  void setZoomY (int32_t factor);

  lv_obj_t* alignInstance () override {
    return this->zoom_wrapper != nullptr ? this->zoom_wrapper : this->instance;
  }

 private:
  /* LVGL 9 removed lv_chart_set_axis_tick(); axis ticks/labels are now
   * rendered by standalone lv_scale widgets kept next to the chart. */
  lv_obj_t* scale_left = nullptr;
  lv_obj_t* scale_right = nullptr;
  lv_obj_t* scale_top = nullptr;
  lv_obj_t* scale_bottom = nullptr;

  /* lv_scale_set_text_src() keeps the pointer array; it must stay alive. */
  std::vector<const char*> left_label_ptrs;
  std::vector<const char*> right_label_ptrs;
  std::vector<const char*> top_label_ptrs;
  std::vector<const char*> bottom_label_ptrs;

  lv_obj_t* zoom_wrapper = nullptr;
  int32_t base_w = 0;
  int32_t base_h = 0;
  int32_t zoom_x = LV_SCALE_NONE;
  int32_t zoom_y = LV_SCALE_NONE;

  /* draw_size of each axis (reserved space for ticks + labels) */
  int32_t draw_left = 0;
  int32_t draw_right = 0;
  int32_t draw_top = 0;
  int32_t draw_bottom = 0;

  static void realign_scales_cb (lv_event_t* e);

  lv_obj_t* ensureScale (lv_obj_t** scale, lv_scale_mode_t mode);
  void configureScale (
    lv_obj_t* scale,
    lv_scale_mode_t mode,
    int32_t major_len,
    int32_t minor_len,
    int32_t major_num,
    int32_t minor_num,
    int32_t draw_size
  );
  bool scaleScrollsWithChart (lv_scale_mode_t mode);
  void layoutScale (lv_obj_t* scale, lv_scale_mode_t mode, int32_t pad_l, int32_t pad_t);
  void layoutScales ();
  void applyScaleLabels (lv_obj_t* scale, std::vector<std::string>& labels, std::vector<const char*>& ptrs);
  lv_color_t seriesColor (int32_t color);
  void fillSeriesY (lv_chart_series_t* series, std::vector<int32_t>& values);
  void ensureZoomWrapper ();
  void applyZoom ();
};
