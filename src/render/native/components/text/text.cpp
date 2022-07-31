
#include "text.hpp"

Text::Text(std::string uid, lv_obj_t* parent): BasicComponent() {
    this->type = COMP_TYPE_TEXT;

    this->uid = uid;
    this->instance = lv_label_create(parent != nullptr ? parent : lv_scr_act());
    lv_label_set_text(this->instance, "");
    
    lv_obj_add_flag(this->instance, LV_OBJ_FLAG_EVENT_BUBBLE);
    lv_obj_set_user_data(this->instance, this);
    this->initStyle();
};

void Text::setText(std::string str) {
    lv_label_set_text(this->instance, str.c_str());
};