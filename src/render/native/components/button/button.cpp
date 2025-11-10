
#include "button.hpp"

Button::Button(std::string uid, lv_obj_t* parent): BasicComponent(uid) {
    this->type = COMP_TYPE_BUTTON;

    this->uid = uid;
    this->instance = lv_button_create(parent != nullptr ? parent : GetWindowInstance());

    lv_group_add_obj(lv_group_get_default(), this->instance);

    lv_obj_add_flag(this->instance, static_cast<lv_obj_flag_t>(LV_OBJ_FLAG_EVENT_BUBBLE | LV_OBJ_FLAG_CLICK_FOCUSABLE));
    lv_obj_remove_flag(this->instance, LV_OBJ_FLAG_SCROLL_ON_FOCUS);
    lv_obj_set_user_data(this->instance, this);
    this->initStyle(LV_PART_MAIN);
};
