
#include "line.hpp"

Line::Line(std::string uid, lv_obj_t* parent): BasicComponent() {
    this->type = COMP_TYPE_LINE;

    this->uid = uid;
    this->instance = lv_line_create(parent != nullptr ? parent : lv_scr_act());
    
    lv_obj_add_flag(this->instance, LV_OBJ_FLAG_EVENT_BUBBLE);
    lv_obj_set_user_data(this->instance, this);
};

void Line::setPoints (std::vector<lv_point_t> points, int32_t nums) {
    this->points.swap(points);

    lv_line_set_points(this->instance, this->points.data(), nums);
};