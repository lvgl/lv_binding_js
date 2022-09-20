
#include "keyboard.hpp"

Keyboard::Keyboard(std::string uid, lv_obj_t* parent): BasicComponent() {
    this->type = COMP_TYPE_TEXTAREA;
    this->uid = uid;
    this->instance = lv_keyboard_create(parent != nullptr ? parent : GetWindowInstance());
    
    lv_obj_add_flag(this->instance, LV_OBJ_FLAG_EVENT_BUBBLE);
    lv_obj_set_user_data(this->instance, this);
};

void Keyboard::setTextarea (BasicComponent* child) {
    lv_keyboard_set_textarea(this->instance, child->instance);
};

void Keyboard::setMode (int32_t mode) {
    lv_keyboard_set_mode(this->instance, static_cast<lv_keyboard_mode_t>(mode));
};

void Keyboard::initCompStyle (int32_t type) {
};