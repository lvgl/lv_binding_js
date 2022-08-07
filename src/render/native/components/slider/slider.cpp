
#include "slider.hpp"

Slider::Slider(std::string uid, lv_obj_t* parent): BasicComponent() {
    this->type = COMP_TYPE_SLIDER;

    this->uid = uid;
    this->instance = lv_slider_create(parent != nullptr ? parent : lv_scr_act());
    
    lv_obj_add_flag(this->instance, LV_OBJ_FLAG_EVENT_BUBBLE);
    lv_obj_set_user_data(this->instance, this);
    this->initStyle();
};

void Slider::setRange (int32_t min, int32_t max) {
    lv_slider_set_range(this->instance, min, max);
};

void Slider::setValue (int32_t value) {
    lv_slider_set_value(this->instance, value, LV_ANIM_OFF);
};