
#include "switch.hpp"

Switch::Switch(std::string uid, lv_obj_t* parent): BasicComponent() {
    this->type = COMP_TYPE_SWITCH;
    this->uid = uid;
    this->instance = lv_switch_create(parent != nullptr ? parent : lv_scr_act());
    
    lv_obj_set_user_data(this->instance, this);
    // this->initStyle();
};

void Switch::setValue (bool value) {
    if (value) {
        lv_obj_add_state(this->instance, LV_STATE_CHECKED);
    } else {
        lv_obj_clear_state(this->instance, LV_STATE_CHECKED);
    }
};