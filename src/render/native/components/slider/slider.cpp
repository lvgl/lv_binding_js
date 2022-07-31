
#include "slider.hpp"

Slider::Slider(std::string uid, lv_obj_t* parent): BasicComponent() {
    this->type = COMP_TYPE_SLIDER;

    this->uid = uid;
    this->instance = lv_slider_create(parent != nullptr ? parent : lv_scr_act());
    
    lv_obj_add_flag(this->instance, LV_OBJ_FLAG_EVENT_BUBBLE);
    lv_obj_set_user_data(this->instance, this);
    this->initStyle();
};