
#include "checkbox.hpp"

Checkbox::Checkbox(std::string uid, lv_obj_t* parent): BasicComponent(uid) {
    this->type = COMP_TYPE_CHECKBOX;
    this->uid = uid;
    this->instance = lv_checkbox_create(parent != nullptr ? parent : GetWindowInstance());
    lv_group_add_obj(lv_group_get_default(), this->instance);

    lv_obj_add_flag(this->instance, LV_OBJ_FLAG_EVENT_BUBBLE | LV_OBJ_FLAG_CLICK_FOCUSABLE);
    lv_obj_remove_flag(this->instance, LV_OBJ_FLAG_SCROLL_ON_FOCUS);
    lv_obj_set_user_data(this->instance, this);
    this->initStyle(LV_PART_MAIN);
};

void Checkbox::setText (std::string text) {
    lv_checkbox_set_text(this->instance, text.c_str());
};

void Checkbox::setChecked (bool payload) {
    if (payload) {
        lv_obj_add_state(this->instance, LV_STATE_CHECKED);
    } else {
        lv_obj_remove_state(this->instance, LV_STATE_CHECKED);
    }
};

void Checkbox::setDisabled (bool payload) {
    if (payload) {
        lv_obj_add_state(this->instance, LV_STATE_DISABLED);
    } else {
        lv_obj_remove_state(this->instance, LV_STATE_DISABLED);
    }
};

void Checkbox::initCompStyle (int32_t type) {
};
