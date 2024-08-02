
#include "roller.hpp"

Roller::Roller(std::string uid, lv_obj_t* parent): BasicComponent(uid) {
    this->type = COMP_TYPE_ROLLER;
    this->uid = uid;
    this->instance = lv_roller_create(parent != nullptr ? parent : GetWindowInstance());
    lv_group_add_obj(lv_group_get_default(), this->instance);

    lv_obj_remove_flag(this->instance, LV_OBJ_FLAG_SCROLL_ON_FOCUS);
    lv_obj_add_flag(this->instance, LV_OBJ_FLAG_EVENT_BUBBLE | LV_OBJ_FLAG_CLICK_FOCUSABLE);
    lv_obj_set_user_data(this->instance, this);
};

void Roller::setOptions (std::vector<std::string>& options, uint32_t mode) {
    if (options.size() == 0) {
        lv_roller_set_options(this->instance, "\0", mode);
    } else {
        std::string str;
        for(int i=0; i < options.size(); i++) {
            std::string item = options[i];
            str.append(item.c_str());
            if (i != options.size() - 1) {
                str.append("\n");
            }
        }
        lv_roller_set_options(this->instance, str.c_str(), mode);
    }
};

void Roller::setSelectIndex (uint32_t index) {
    lv_roller_set_selected(this->instance, index, LV_ANIM_OFF);
};

void Roller::setVisibleRowCount (uint32_t count) {
    lv_roller_set_visible_row_count(this->instance, count);
};
