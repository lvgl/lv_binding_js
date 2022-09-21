
#include "text.hpp"

Text::Text(std::string uid, lv_obj_t* parent): BasicComponent() {
    this->type = COMP_TYPE_TEXT;

    this->uid = uid;
    this->instance = lv_label_create(parent != nullptr ? parent : GetWindowInstance());
    lv_label_set_text(this->instance, "");
    lv_group_add_obj(lv_group_get_default(), this->instance);
    
    lv_obj_clear_flag(this->instance, LV_OBJ_FLAG_SCROLL_ON_FOCUS);
    lv_obj_add_flag(this->instance, LV_OBJ_FLAG_EVENT_BUBBLE | LV_OBJ_FLAG_CLICK_FOCUSABLE);
    lv_obj_set_user_data(this->instance, this);
    this->initStyle(LV_PART_MAIN);
};

void Text::setText(std::string str) {
    lv_label_set_text(this->instance, str.c_str());
};

void Text::initCompStyle (int32_t type) {
    this->ensureStyle(type);
    lv_style_t* style = this->style_map.at(type);

    lv_obj_set_style_text_color(this->instance, lv_color_hex(0), 0);
};