#include "./chart.hpp"

Chart::Chart(std::string uid, lv_obj_t* parent): BasicComponent(uid) {
    this->type = COMP_TYPE_CHART;

    this->uid = uid;
    this->instance = lv_chart_create(parent != nullptr ? parent : GetWindowInstance());

    lv_group_add_obj(lv_group_get_default(), this->instance);

    lv_obj_add_flag(this->instance, LV_OBJ_FLAG_EVENT_BUBBLE);
    lv_obj_add_flag(this->instance, LV_OBJ_FLAG_CLICK_FOCUSABLE);
    lv_obj_clear_flag(this->instance, LV_OBJ_FLAG_SCROLL_ON_FOCUS);
    lv_obj_set_user_data(this->instance, this);
    this->initStyle(LV_PART_MAIN);

    /* keep the axis scale widgets glued to the chart when layout changes */
    lv_obj_add_event_cb(this->instance, &Chart::realign_scales_cb, LV_EVENT_SIZE_CHANGED, this);
    lv_obj_add_event_cb(this->instance, &Chart::realign_scales_cb, LV_EVENT_STYLE_CHANGED, this);
};

Chart::~Chart() {
    if (this->scale_left) lv_obj_delete(this->scale_left);
    if (this->scale_right) lv_obj_delete(this->scale_right);
    if (this->scale_top) lv_obj_delete(this->scale_top);
    if (this->scale_bottom) lv_obj_delete(this->scale_bottom);
    if (this->zoom_wrapper) lv_obj_delete(this->zoom_wrapper);
};

void Chart::ensureZoomWrapper () {
    if (this->zoom_wrapper != nullptr) return;

    /* the styled width/height define the visible viewport; the chart itself
     * is enlarged by the zoom factor and scrolls inside this wrapper
     * (see "Zoom" in the LVGL 9 chart docs) */
    lv_obj_update_layout(this->instance);
    this->base_w = lv_obj_get_width(this->instance);
    this->base_h = lv_obj_get_height(this->instance);

    lv_obj_t* chart_parent = lv_obj_get_parent(this->instance);
    this->zoom_wrapper = lv_obj_create(chart_parent != nullptr ? chart_parent : this->instance);
    lv_obj_set_size(this->zoom_wrapper, this->base_w, this->base_h);

    /* move the chart's alignment/position onto the viewport */
    lv_obj_set_align(this->zoom_wrapper, lv_obj_get_style_align(this->instance, LV_PART_MAIN));
    lv_obj_set_x(this->zoom_wrapper, lv_obj_get_style_x(this->instance, LV_PART_MAIN));
    lv_obj_set_y(this->zoom_wrapper, lv_obj_get_style_y(this->instance, LV_PART_MAIN));

    lv_obj_set_style_pad_all(this->zoom_wrapper, 0, LV_PART_MAIN);
    lv_obj_set_style_border_width(this->zoom_wrapper, 0, LV_PART_MAIN);
    lv_obj_set_style_radius(this->zoom_wrapper, 0, LV_PART_MAIN);
    lv_obj_set_style_bg_opa(this->zoom_wrapper, LV_OPA_TRANSP, LV_PART_MAIN);

    lv_obj_set_parent(this->instance, this->zoom_wrapper);
    lv_obj_set_align(this->instance, LV_ALIGN_TOP_LEFT);
    lv_obj_set_pos(this->instance, 0, 0);

    /* any scale created earlier was anchored to the chart; re-anchor it */
    this->layoutScales();
};

void Chart::applyZoom () {
    lv_obj_set_width(this->instance, (int32_t)(((int64_t)this->base_w * this->zoom_x) >> 8));
    lv_obj_set_height(this->instance, (int32_t)(((int64_t)this->base_h * this->zoom_y) >> 8));
    this->layoutScales();
    lv_chart_refresh(this->instance);
};

void Chart::setZoomX (int32_t factor) {
    this->ensureZoomWrapper();
    this->zoom_x = factor > 0 ? factor : LV_SCALE_NONE;
    this->applyZoom();
};

void Chart::setZoomY (int32_t factor) {
    this->ensureZoomWrapper();
    this->zoom_y = factor > 0 ? factor : LV_SCALE_NONE;
    this->applyZoom();
};

void Chart::realign_scales_cb (lv_event_t* e) {
    Chart* comp = (Chart*)lv_event_get_user_data(e);
    if (comp != nullptr) {
        comp->layoutScales();
    }
};

bool Chart::scaleScrollsWithChart (lv_scale_mode_t mode) {
    if (this->zoom_wrapper == nullptr) return false;

    /* a scale follows the zoomed (scrollable) content when its own axis
     * direction is zoomed, mirroring how LVGL 8 drew zoomed axis ticks */
    bool horizontal = (mode == LV_SCALE_MODE_HORIZONTAL_TOP || mode == LV_SCALE_MODE_HORIZONTAL_BOTTOM);
    return horizontal ? this->zoom_x != LV_SCALE_NONE : this->zoom_y != LV_SCALE_NONE;
};

void Chart::layoutScales () {
    int32_t pad_l = 0, pad_r = 0, pad_t = 0, pad_b = 0;

    if (this->zoom_wrapper != nullptr) {
        /* reserve room inside the wrapper for scales that scroll with the chart */
        if (this->scale_top && this->scaleScrollsWithChart(LV_SCALE_MODE_HORIZONTAL_TOP)) pad_t = this->draw_top;
        if (this->scale_bottom && this->scaleScrollsWithChart(LV_SCALE_MODE_HORIZONTAL_BOTTOM)) pad_b = this->draw_bottom;
        if (this->scale_left && this->scaleScrollsWithChart(LV_SCALE_MODE_VERTICAL_LEFT)) pad_l = this->draw_left;
        if (this->scale_right && this->scaleScrollsWithChart(LV_SCALE_MODE_VERTICAL_RIGHT)) pad_r = this->draw_right;

        lv_obj_set_size(this->zoom_wrapper, this->base_w + pad_l + pad_r, this->base_h + pad_t + pad_b);
        lv_obj_set_pos(this->instance, pad_l, pad_t);
    }

    this->layoutScale(this->scale_left, LV_SCALE_MODE_VERTICAL_LEFT, pad_l, pad_t);
    this->layoutScale(this->scale_right, LV_SCALE_MODE_VERTICAL_RIGHT, pad_l, pad_t);
    this->layoutScale(this->scale_top, LV_SCALE_MODE_HORIZONTAL_TOP, pad_l, pad_t);
    this->layoutScale(this->scale_bottom, LV_SCALE_MODE_HORIZONTAL_BOTTOM, pad_l, pad_t);
};

void Chart::layoutScale (lv_obj_t* scale, lv_scale_mode_t mode, int32_t pad_l, int32_t pad_t) {
    if (scale == nullptr) return;

    bool inside = this->scaleScrollsWithChart(mode);
    lv_obj_t* anchor;

    if (inside) {
        if (lv_obj_get_parent(scale) != this->zoom_wrapper) {
            lv_obj_set_parent(scale, this->zoom_wrapper);
        }
        anchor = this->instance;
        pad_l = 0;
        pad_t = 0;
    } else {
        lv_obj_t* outer = lv_obj_get_parent(this->alignInstance());
        if (outer != nullptr && lv_obj_get_parent(scale) != outer) {
            lv_obj_set_parent(scale, outer);
        }
        anchor = this->alignInstance();
    }

    /* the chart's visible extent along the scale direction */
    int32_t span_w = (inside || this->zoom_wrapper == nullptr) ? lv_obj_get_width(this->instance) : this->base_w;
    int32_t span_h = (inside || this->zoom_wrapper == nullptr) ? lv_obj_get_height(this->instance) : this->base_h;

    switch (mode) {
        case LV_SCALE_MODE_VERTICAL_LEFT:
            lv_obj_set_height(scale, span_h);
            lv_obj_align_to(scale, anchor, LV_ALIGN_OUT_LEFT_TOP, 0, pad_t);
            break;
        case LV_SCALE_MODE_VERTICAL_RIGHT:
            lv_obj_set_height(scale, span_h);
            lv_obj_align_to(scale, anchor, LV_ALIGN_OUT_RIGHT_TOP, 0, pad_t);
            break;
        case LV_SCALE_MODE_HORIZONTAL_TOP:
            lv_obj_set_width(scale, span_w);
            lv_obj_align_to(scale, anchor, LV_ALIGN_OUT_TOP_LEFT, pad_l, 0);
            break;
        case LV_SCALE_MODE_HORIZONTAL_BOTTOM:
            lv_obj_set_width(scale, span_w);
            lv_obj_align_to(scale, anchor, LV_ALIGN_OUT_BOTTOM_LEFT, pad_l, 0);
            break;
        default:
            break;
    }
};

lv_obj_t* Chart::ensureScale (lv_obj_t** scale, lv_scale_mode_t mode) {
    if (*scale != nullptr) return *scale;

    lv_obj_t* scale_parent = lv_obj_get_parent(this->alignInstance());
    *scale = lv_scale_create(scale_parent != nullptr ? scale_parent : this->alignInstance());
    lv_obj_clear_flag(*scale, LV_OBJ_FLAG_CLICKABLE);
    lv_obj_add_flag(*scale, LV_OBJ_FLAG_IGNORE_LAYOUT);
    lv_scale_set_mode(*scale, mode);
    this->layoutScales();
    return *scale;
};

void Chart::configureScale (
    lv_obj_t* scale,
    lv_scale_mode_t mode,
    int32_t major_len,
    int32_t minor_len,
    int32_t major_num,
    int32_t minor_num,
    int32_t draw_size
) {
    if (scale == nullptr) return;

    /* In LVGL 8 lv_chart_set_axis_tick(major_num, minor_num) meant:
     * major_num major ticks, with minor_num minor ticks between two majors.
     * Map that onto lv_scale's total tick count / major tick frequency. */
    uint32_t every = (uint32_t)(minor_num > 0 ? minor_num + 1 : 1);
    uint32_t total = major_num > 1 ? (uint32_t)((major_num - 1) * every + 1) : 1U;

    lv_scale_set_mode(scale, mode);
    lv_scale_set_total_tick_count(scale, total);
    lv_scale_set_major_tick_every(scale, every);
    lv_scale_set_label_show(scale, true);
    lv_obj_set_style_length(scale, major_len, LV_PART_INDICATOR);
    lv_obj_set_style_length(scale, minor_len, LV_PART_ITEMS);

    if (draw_size > 0) {
        switch (mode) {
            case LV_SCALE_MODE_VERTICAL_LEFT:
                this->draw_left = draw_size;
                lv_obj_set_width(scale, draw_size);
                break;
            case LV_SCALE_MODE_VERTICAL_RIGHT:
                this->draw_right = draw_size;
                lv_obj_set_width(scale, draw_size);
                break;
            case LV_SCALE_MODE_HORIZONTAL_TOP:
                this->draw_top = draw_size;
                lv_obj_set_height(scale, draw_size);
                break;
            case LV_SCALE_MODE_HORIZONTAL_BOTTOM:
                this->draw_bottom = draw_size;
                lv_obj_set_height(scale, draw_size);
                break;
            default:
                break;
        }
    }

    this->layoutScales();
};

void Chart::applyScaleLabels (
    lv_obj_t* scale,
    std::vector<std::string>& labels,
    std::vector<const char*>& ptrs
) {
    if (scale == nullptr || labels.empty()) return;

    ptrs.clear();
    ptrs.reserve(labels.size() + 1);
    for (const auto& label : labels) {
        ptrs.push_back(label.c_str());
    }
    ptrs.push_back(nullptr);
    lv_scale_set_text_src(scale, ptrs.data());
};

lv_color_t Chart::seriesColor (int32_t color) {
    if (color == -1) {
        return lv_theme_get_color_primary(this->instance);
    }
    return lv_color_hex((uint32_t)color);
};

void Chart::fillSeriesY (lv_chart_series_t* series, std::vector<int32_t>& values) {
    /* lv_chart_series_t became opaque in LVGL 9; write through the array getter */
    int32_t* y_points = lv_chart_get_series_y_array(this->instance, series);
    if (y_points == nullptr) return;

    uint32_t point_count = lv_chart_get_point_count(this->instance);
    for (size_t j = 0; j < values.size() && j < point_count; j++) {
        y_points[j] = values[j];
    }
};

void Chart::setType (int32_t type) {
    lv_chart_set_type(this->instance, static_cast<lv_chart_type_t>(type));
};

void Chart::setDivLineCount (int32_t hdiv, int32_t vdiv) {
    lv_chart_set_div_line_count(this->instance, hdiv, vdiv);
};

void Chart::setLeftAxisOption (
    int32_t major_len,
    int32_t minor_len,
    int32_t major_num,
    int32_t minor_num,
    int32_t draw_size
  ) {
    lv_obj_t* scale = this->ensureScale(&this->scale_left, LV_SCALE_MODE_VERTICAL_LEFT);
    this->configureScale(scale, LV_SCALE_MODE_VERTICAL_LEFT, major_len, minor_len, major_num, minor_num, draw_size);
    this->applyScaleLabels(scale, this->left_axis_labels, this->left_label_ptrs);
};

void Chart::setRightAxisOption (
    int32_t major_len,
    int32_t minor_len,
    int32_t major_num,
    int32_t minor_num,
    int32_t draw_size
  ) {
    lv_obj_t* scale = this->ensureScale(&this->scale_right, LV_SCALE_MODE_VERTICAL_RIGHT);
    this->configureScale(scale, LV_SCALE_MODE_VERTICAL_RIGHT, major_len, minor_len, major_num, minor_num, draw_size);
    this->applyScaleLabels(scale, this->right_axis_labels, this->right_label_ptrs);
};

void Chart::setTopAxisOption (
    int32_t major_len,
    int32_t minor_len,
    int32_t major_num,
    int32_t minor_num,
    int32_t draw_size
  ) {
    lv_obj_t* scale = this->ensureScale(&this->scale_top, LV_SCALE_MODE_HORIZONTAL_TOP);
    this->configureScale(scale, LV_SCALE_MODE_HORIZONTAL_TOP, major_len, minor_len, major_num, minor_num, draw_size);
    this->applyScaleLabels(scale, this->top_axis_labels, this->top_label_ptrs);
};

void Chart::setBottomAxisOption (
    int32_t major_len,
    int32_t minor_len,
    int32_t major_num,
    int32_t minor_num,
    int32_t draw_size
  ) {
    lv_obj_t* scale = this->ensureScale(&this->scale_bottom, LV_SCALE_MODE_HORIZONTAL_BOTTOM);
    this->configureScale(scale, LV_SCALE_MODE_HORIZONTAL_BOTTOM, major_len, minor_len, major_num, minor_num, draw_size);
    this->applyScaleLabels(scale, this->bottom_axis_labels, this->bottom_label_ptrs);
};

void Chart::setLeftAxisData (std::vector<axis_data>& data) {
    size_t i;

    for (i = 0; i < this->left_axis.size(); i++) {
        lv_chart_remove_series(this->instance, this->left_axis[i]);
    }
    this->left_axis.clear();

    for (i = 0; i < data.size(); i++) {
        this->left_axis.push_back(
            lv_chart_add_series(this->instance, this->seriesColor(data[i].color), LV_CHART_AXIS_PRIMARY_Y));
    }

    for (i = 0; i < data.size(); i++) {
        this->fillSeriesY(this->left_axis[i], data[i].data);
    }
    lv_chart_refresh(this->instance);
};

void Chart::setRightAxisData (std::vector<axis_data>& data) {
    size_t i;

    for (i = 0; i < this->right_axis.size(); i++) {
        lv_chart_remove_series(this->instance, this->right_axis[i]);
    }
    this->right_axis.clear();

    for (i = 0; i < data.size(); i++) {
        this->right_axis.push_back(
            lv_chart_add_series(this->instance, this->seriesColor(data[i].color), LV_CHART_AXIS_SECONDARY_Y));
    }

    for (i = 0; i < data.size(); i++) {
        this->fillSeriesY(this->right_axis[i], data[i].data);
    }
    lv_chart_refresh(this->instance);
};

void Chart::setTopAxisData (std::vector<axis_data>& data) {
    size_t i;

    for (i = 0; i < this->top_axis.size(); i++) {
        lv_chart_remove_series(this->instance, this->top_axis[i]);
    }
    this->top_axis.clear();

    for (i = 0; i < data.size(); i++) {
        this->top_axis.push_back(
            lv_chart_add_series(this->instance, this->seriesColor(data[i].color), LV_CHART_AXIS_SECONDARY_X));
    }

    for (i = 0; i < data.size(); i++) {
        this->fillSeriesY(this->top_axis[i], data[i].data);
    }
    lv_chart_refresh(this->instance);
};

void Chart::setBottomAxisData (std::vector<axis_data>& data) {
    size_t i;

    for (i = 0; i < this->bottom_axis.size(); i++) {
        lv_chart_remove_series(this->instance, this->bottom_axis[i]);
    }
    this->bottom_axis.clear();

    for (i = 0; i < data.size(); i++) {
        this->bottom_axis.push_back(
            lv_chart_add_series(this->instance, this->seriesColor(data[i].color), LV_CHART_AXIS_PRIMARY_X));
    }

    for (i = 0; i < data.size(); i++) {
        this->fillSeriesY(this->bottom_axis[i], data[i].data);
    }
    lv_chart_refresh(this->instance);
};

void Chart::setPointNum (int32_t num) {
    lv_chart_set_point_count(this->instance, (uint32_t)num);
};

void Chart::setLeftAxisLabels (std::vector<std::string>& labels) {
    this->left_axis_labels = labels;
    this->applyScaleLabels(this->scale_left, this->left_axis_labels, this->left_label_ptrs);
};

void Chart::setRightAxisLabels (std::vector<std::string>& labels) {
    this->right_axis_labels = labels;
    this->applyScaleLabels(this->scale_right, this->right_axis_labels, this->right_label_ptrs);
};

void Chart::setTopAxisLabels (std::vector<std::string>& labels) {
    this->top_axis_labels = labels;
    this->applyScaleLabels(this->scale_top, this->top_axis_labels, this->top_label_ptrs);
};

void Chart::setBottomAxisLabels (std::vector<std::string>& labels) {
    this->bottom_axis_labels = labels;
    this->applyScaleLabels(this->scale_bottom, this->bottom_axis_labels, this->bottom_label_ptrs);
};

void Chart::setLeftAxisRange (int32_t min, int32_t max) {
    lv_chart_set_axis_range(this->instance, LV_CHART_AXIS_PRIMARY_Y, min, max);
    if (this->scale_left) lv_scale_set_range(this->scale_left, min, max);
};

void Chart::setRightAxisRange (int32_t min, int32_t max) {
    lv_chart_set_axis_range(this->instance, LV_CHART_AXIS_SECONDARY_Y, min, max);
    if (this->scale_right) lv_scale_set_range(this->scale_right, min, max);
};

void Chart::setTopAxisRange (int32_t min, int32_t max) {
    lv_chart_set_axis_range(this->instance, LV_CHART_AXIS_SECONDARY_X, min, max);
    if (this->scale_top) lv_scale_set_range(this->scale_top, min, max);
};

void Chart::setBottomAxisRange (int32_t min, int32_t max) {
    lv_chart_set_axis_range(this->instance, LV_CHART_AXIS_PRIMARY_X, min, max);
    if (this->scale_bottom) lv_scale_set_range(this->scale_bottom, min, max);
};

void Chart::setScatterData (std::vector<axis_data>& data) {
    size_t i, j;

    for (i = 0; i < this->left_axis.size(); i++) {
        lv_chart_remove_series(this->instance, this->left_axis[i]);
    }
    this->left_axis.clear();

    for (i = 0; i < data.size(); i++) {
        this->left_axis.push_back(
            lv_chart_add_series(this->instance, this->seriesColor(data[i].color), LV_CHART_AXIS_PRIMARY_Y));
    }

    uint32_t point_count = lv_chart_get_point_count(this->instance);
    for (i = 0; i < data.size(); i++) {
        axis_data& item = data[i];
        int32_t* x_points = lv_chart_get_series_x_array(this->instance, this->left_axis[i]);
        int32_t* y_points = lv_chart_get_series_y_array(this->instance, this->left_axis[i]);
        if (x_points == nullptr || y_points == nullptr) continue;

        for (j = 0; j < item.data.size(); j++) {
            size_t idx = j / 2;
            if (idx >= point_count) break;
            if (j % 2 == 0) {
                x_points[idx] = item.data[j];
            } else {
                y_points[idx] = item.data[j];
            }
        }
    }
    lv_chart_refresh(this->instance);
};
