#include "./chart.hpp"

Chart::Chart(std::string uid, lv_obj_t* parent): BasicComponent(uid) {
    this->type = COMP_TYPE_CHART;

    this->uid = uid;
    this->instance = lv_chart_create(parent != nullptr ? parent : GetWindowInstance());

    lv_group_add_obj(lv_group_get_default(), this->instance);
    
    lv_obj_add_flag(this->instance, LV_OBJ_FLAG_EVENT_BUBBLE | LV_OBJ_FLAG_CLICK_FOCUSABLE);
    lv_obj_clear_flag(this->instance, LV_OBJ_FLAG_SCROLL_ON_FOCUS);
    lv_obj_set_user_data(this->instance, this);
    this->initStyle(LV_PART_MAIN);
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
    lv_chart_set_axis_tick(this->instance, LV_CHART_AXIS_PRIMARY_Y, major_len, minor_len, major_num, minor_num, true, draw_size);
};

void Chart::setRightAxisOption (
    int32_t major_len, 
    int32_t minor_len, 
    int32_t major_num, 
    int32_t minor_num, 
    int32_t draw_size
  ) {
    lv_chart_set_axis_tick(this->instance, LV_CHART_AXIS_SECONDARY_Y, major_len, minor_len, major_num, minor_num, true, draw_size);
};

void Chart::setTopAxisOption (
    int32_t major_len, 
    int32_t minor_len, 
    int32_t major_num, 
    int32_t minor_num, 
    int32_t draw_size
  ) {
    lv_chart_set_axis_tick(this->instance, LV_CHART_AXIS_SECONDARY_X, major_len, minor_len, major_num, minor_num, true, draw_size);
};

void Chart::setBottomAxisOption (
    int32_t major_len, 
    int32_t minor_len, 
    int32_t major_num, 
    int32_t minor_num, 
    int32_t draw_size
  ) {
    lv_chart_set_axis_tick(this->instance, LV_CHART_AXIS_PRIMARY_X, major_len, minor_len, major_num, minor_num, true, draw_size);
};

void Chart::setLeftAxisData (std::vector<axis_data>& data) {
    int32_t i, j, color;
    axis_data item;

    for (i=0; i<this->left_axis.size(); i++) {
        lv_chart_remove_series(this->instance, this->left_axis[i]);
    }
    this->left_axis.clear();

    for (i=0; i<data.size(); i++) {
        color = data[i].color;
        if (color == -1) {
            this->left_axis.push_back(lv_chart_add_series(this->instance, lv_theme_get_color_primary(this->instance), LV_CHART_AXIS_PRIMARY_Y));
        } else {
            this->left_axis.push_back(lv_chart_add_series(this->instance, lv_color_hex(color), LV_CHART_AXIS_PRIMARY_Y));
        }
    }

    for (i=0; i<data.size(); i++) {
        item = data[i];
        for (j=0; j<item.data.size(); j++) {
            this->left_axis[j]->y_points[i] = (lv_coord_t)item.data[j];
        }
    } 
};

void Chart::setRightAxisData (std::vector<axis_data>& data) {
    int32_t i, j, color;
    axis_data item;

    for (i=0; i<this->right_axis.size(); i++) {
        lv_chart_remove_series(this->instance, this->right_axis[i]);
    }
    this->right_axis.clear();

    for (i=0; i<data.size(); i++) {
        color = data[i].color;
        if (color == -1) {
            this->right_axis.push_back(lv_chart_add_series(this->instance, lv_theme_get_color_primary(this->instance), LV_CHART_AXIS_PRIMARY_Y));
        } else {
            this->right_axis.push_back(lv_chart_add_series(this->instance, lv_color_hex(color), LV_CHART_AXIS_PRIMARY_Y));
        }
    }

    for (i=0; i<data.size(); i++) {
        item = data[i];
        for (j=0; j<item.data.size(); j++) {
            this->right_axis[j]->y_points[i] = (lv_coord_t)item.data[j];
        }
    }
};

// void Chart::setTopAxisData (std::vector<axis_data>& data) {
//     if (this->top_axis == nullptr) {
//         this->top_axis = lv_chart_add_series(this->instance, lv_theme_get_color_primary(this->instance), LV_CHART_AXIS_SECONDARY_X);
//     }
//     int32_t i;
//     for (i=0; i<data.size(); i++) {
//         this->top_axis->y_points[i] = (lv_coord_t)data[i];
//     }
// };

// void Chart::setBottomAxisData (std::vector<axis_data>& data) {
//     int32_t i;
//     if (this->bottom_axis == nullptr) {
//         this->bottom_axis = lv_chart_add_series(this->instance, lv_theme_get_color_primary(this->instance), LV_CHART_AXIS_PRIMARY_X);
//     }
//     for (i=0; i<data.size(); i++) {
//         this->bottom_axis->y_points[i] = (lv_coord_t)data[i];
//     }
// };

void Chart::setPointNum (int32_t num) {
    lv_chart_set_point_count(this->instance, (uint16_t)num);
};