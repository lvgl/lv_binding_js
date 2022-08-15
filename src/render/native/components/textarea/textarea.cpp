
#include "textarea.hpp"

Textarea::Textarea(std::string uid, lv_obj_t* parent): BasicComponent() {
    this->type = COMP_TYPE_TEXTAREA;
    this->uid = uid;
    this->instance = lv_textarea_create(parent != nullptr ? parent : lv_scr_act());
    
    lv_obj_set_user_data(this->instance, this);
    lv_obj_add_flag(this->instance, LV_OBJ_FLAG_CLICK_FOCUSABLE);
};

void Textarea::setOneLine (bool payload) {
    lv_textarea_set_one_line(this->instance, payload);
};

void Textarea::setText (std::string str) {
    lv_textarea_set_text(this->instance, str.c_str());
};

void Textarea::setPlaceHolder (std::string str) {
    lv_textarea_set_placeholder_text(this->instance, str.c_str());
};