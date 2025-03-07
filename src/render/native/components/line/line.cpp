
#include "line.hpp"

Line::Line(std::string uid, lv_obj_t* parent): BasicComponent(uid) {
    this->type = COMP_TYPE_LINE;

    this->uid = uid;
    this->instance = lv_line_create(parent != nullptr ? parent : GetWindowInstance());
    lv_group_add_obj(lv_group_get_default(), this->instance);

    lv_obj_remove_flag(this->instance, LV_OBJ_FLAG_SCROLL_ON_FOCUS);
    lv_obj_add_flag(this->instance, static_cast<lv_obj_flag_t>(LV_OBJ_FLAG_EVENT_BUBBLE | LV_OBJ_FLAG_CLICK_FOCUSABLE));
    lv_obj_set_user_data(this->instance, this);
};

void Line::setPoints (std::vector<lv_point_precise_t>& points, int32_t nums) {
    this->points.swap(points);

    lv_line_set_points(this->instance, this->points.data(), nums);
};
