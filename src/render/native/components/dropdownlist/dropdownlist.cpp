
#include "dropdownlist.hpp"

Dropdownlist::Dropdownlist(std::string uid, lv_obj_t* parent): BasicComponent(uid) {
    this->type = COMP_TYPE_DROPDOWNLIST;

    this->uid = uid;
    this->instance = lv_dropdown_create(parent != nullptr ? parent : GetWindowInstance());
    lv_group_add_obj(lv_group_get_default(), this->instance);

    lv_obj_remove_flag(this->instance, LV_OBJ_FLAG_SCROLL_ON_FOCUS);
    lv_obj_add_flag(this->instance, static_cast<lv_obj_flag_t>(LV_OBJ_FLAG_EVENT_BUBBLE | LV_OBJ_FLAG_CLICK_FOCUSABLE));
    lv_obj_set_user_data(this->instance, this);
};

void Dropdownlist::setItems (std::vector<std::string>& items) {
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

void Dropdownlist::setSelectIndex (int32_t index) {
    lv_dropdown_set_selected(this->instance, index);
};

void Dropdownlist::setText (std::string text) {
    this->text = text;
    lv_dropdown_set_text(this->instance, this->text.c_str());
};

void Dropdownlist::setDir (lv_dir_t dir) {
    lv_dropdown_set_dir(this->instance, dir);
};

void Dropdownlist::setArrowDir (int32_t dir) {
    const void* arrow;
    switch (dir)
    {
        case DROPDOWNLIST_UP:
            arrow = LV_SYMBOL_UP;
            break;

        case DROPDOWNLIST_DOWN:
            arrow = LV_SYMBOL_DOWN;
            break;

        case DROPDOWNLIST_LEFT:
            arrow = LV_SYMBOL_LEFT;
            break;

        case DROPDOWNLIST_RIGHT:
            arrow = LV_SYMBOL_RIGHT;
            break;

        default:
            break;
    }
    if (arrow) {
        lv_dropdown_set_symbol(this->instance, arrow);
    }
};

void Dropdownlist::setHighLightSelect (bool payload) {
    lv_dropdown_set_selected_highlight(this->instance, payload);
};
