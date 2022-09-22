
#include "dropdownlist.hpp"

Dropdownlist::Dropdownlist(std::string uid, lv_obj_t* parent): BasicComponent(uid) {
    this->type = COMP_TYPE_DROPDOWNLIST;

    this->uid = uid;
    this->instance = lv_dropdown_create(parent != nullptr ? parent : GetWindowInstance());
    lv_group_add_obj(lv_group_get_default(), this->instance);
    
    lv_obj_clear_flag(this->instance, LV_OBJ_FLAG_SCROLL_ON_FOCUS);
    lv_obj_add_flag(this->instance, LV_OBJ_FLAG_EVENT_BUBBLE | LV_OBJ_FLAG_CLICK_FOCUSABLE);
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
    lv_obj_invalidate(this->instance);
};

void Dropdownlist::setSelectIndex (int32_t index) {
    lv_dropdown_set_selected(this->instance, index);
    lv_obj_invalidate(this->instance);
};

void Dropdownlist::setText (std::string text) {
    this->text = text;
    lv_dropdown_set_text(this->instance, this->text.c_str());
    lv_obj_invalidate(this->instance);
};

void Dropdownlist::setDir (lv_dir_t dir) {
    lv_dropdown_set_dir(this->instance, dir);
    lv_obj_invalidate(this->instance);
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
    lv_obj_invalidate(this->instance);
};

void Dropdownlist::setHighLightSelect (bool payload) {
    lv_dropdown_set_selected_highlight(this->instance, payload);
    lv_obj_invalidate(this->instance);
};
