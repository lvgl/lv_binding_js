
#include "dropdownlist.hpp"

Dropdownlist::Dropdownlist(std::string uid, lv_obj_t* parent): BasicComponent() {
    this->type = COMP_TYPE_DROPDOWNLIST;

    this->uid = uid;
    this->instance = lv_dropdown_create(parent != nullptr ? parent : lv_scr_act());
    
    lv_obj_add_flag(this->instance, LV_OBJ_FLAG_EVENT_BUBBLE);
    lv_obj_set_user_data(this->instance, this);
};

void Dropdownlist::setItems (std::vector<std::string> items) {
    if (items.size() == 0) {
        lv_dropdown_clear_options(this->instance);
    } else {
        std::string str;
        for(int i=0; i < items.size(); i++) {
            std::string item = items[i];
            item.append("\n");
            str.append(item.c_str());
        }
        str.append("\0");
        lv_dropdown_set_options(this->instance, str.c_str());
    }
};

void Dropdownlist::setValue (int32_t index) {
    lv_dropdown_set_selected(this->instance, index);
};

void Dropdownlist::setText (std::string text) {
    lv_dropdown_set_text(this->instance, text.c_str());
};

void Dropdownlist::setDir (lv_dir_t dir) {
    lv_dropdown_set_dir(this->instance, dir);
};