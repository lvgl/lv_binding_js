
#include "slider.hpp"

Slider::Slider(std::string uid, lv_obj_t* parent): BasicComponent(uid) {
    this->type = COMP_TYPE_SLIDER;

    this->uid = uid;
    this->instance = lv_slider_create(parent != nullptr ? parent : GetWindowInstance());
    lv_group_add_obj(lv_group_get_default(), this->instance);

    lv_obj_remove_flag(this->instance, LV_OBJ_FLAG_SCROLL_ON_FOCUS);
    lv_obj_add_flag(this->instance, LV_OBJ_FLAG_EVENT_BUBBLE | LV_OBJ_FLAG_CLICK_FOCUSABLE);
    lv_obj_set_user_data(this->instance, this);
    this->initStyle(LV_PART_MAIN);
};

void Slider::setRange (int32_t min, int32_t max) {
    lv_slider_set_range(this->instance, min, max);
};

void Slider::setValue (int32_t value) {
    lv_slider_set_value(this->instance, value, LV_ANIM_OFF);
};

void Slider::initCompStyle (int32_t type) {
};
