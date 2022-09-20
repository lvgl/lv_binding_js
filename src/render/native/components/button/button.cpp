
#include "button.hpp"

Button::Button(std::string uid, lv_obj_t* parent): BasicComponent() {
    this->type = COMP_TYPE_BUTTON;

    this->uid = uid;
    this->instance = lv_btn_create(parent != nullptr ? parent : GetWindowInstance());
    
    lv_obj_add_flag(this->instance, LV_OBJ_FLAG_EVENT_BUBBLE);
    lv_obj_set_user_data(this->instance, this);
    this->initStyle(LV_PART_MAIN);
};