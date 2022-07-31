
#include "window.hpp"

Window::Window(std::string uid): BasicComponent() {
    this->uid = uid;
    this->instance = lv_obj_create(lv_scr_act());

    lv_obj_add_flag(this->instance, LV_OBJ_FLAG_EVENT_BUBBLE);
    lv_obj_set_user_data(this->instance, this);
    this->initStyle();
};