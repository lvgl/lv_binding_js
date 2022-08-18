
#include "keyboard.hpp"

Keyboard::Keyboard(std::string uid, lv_obj_t* parent): BasicComponent() {
    this->type = COMP_TYPE_TEXTAREA;
    this->uid = uid;
    this->instance = lv_keyboard_create(parent != nullptr ? parent : lv_scr_act());
    
    lv_obj_set_user_data(this->instance, this);
};

void Keyboard::setTextarea (BasicComponent* child) {
    lv_keyboard_set_textarea(this->instance, child->instance);
};
