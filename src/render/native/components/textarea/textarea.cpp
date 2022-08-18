
#include "textarea.hpp"

Textarea::Textarea(std::string uid, lv_obj_t* parent): BasicComponent() {
    this->type = COMP_TYPE_TEXTAREA;
    this->uid = uid;
    this->instance = lv_textarea_create(parent != nullptr ? parent : lv_scr_act());
    
    lv_obj_set_user_data(this->instance, this);
    lv_obj_add_flag(this->instance, LV_OBJ_FLAG_CLICK_FOCUSABLE);
    lv_obj_clear_flag(this->instance, LV_OBJ_FLAG_SCROLL_ON_FOCUS);
    lv_obj_clear_state(this->instance, LV_STATE_FOCUSED);
    this->initStyle(LV_PART_MAIN);
    this->initStyle(LV_STATE_FOCUSED);
};

void Textarea::setOneLine (bool payload) {
    lv_textarea_set_one_line(this->instance, payload);
};

void Textarea::setText (std::string str) {
    lv_textarea_set_text(this->instance, str.c_str());
};

void Textarea::setPasswordMode (bool payload) {
    lv_textarea_set_password_mode(this->instance, payload);
};

void Textarea::setPlaceHolder (std::string str) {
    lv_textarea_set_placeholder_text(this->instance, str.c_str());
};

void Textarea::setMaxLength (int32_t len) {
    lv_textarea_set_max_length(this->instance, len);
};

void Textarea::setMode (int32_t mode) {
    lv_keyboard_set_mode(this->instance, static_cast<lv_keyboard_mode_t>(mode));
};

void Textarea::initCompStyle (int32_t type) {
    this->ensureStyle(type);
    lv_style_t* style = this->style_map.at(type);

    if (type == LV_PART_MAIN || type == LV_STATE_FOCUSED) {
        lv_style_set_radius(style, 4);
        lv_style_set_pad_left(style, 4);
        lv_style_set_pad_right(style, 4);
        lv_style_set_pad_bottom(style, 4);
        lv_style_set_pad_top(style, 4);
        lv_style_set_border_width(style, 2);
        lv_style_set_border_opa(style, LV_OPA_40);

        if (type == LV_PART_MAIN) {
            lv_style_set_border_color(style, lv_color_hex(0x37474F));
        } else if (type == LV_STATE_FOCUSED) {
            lv_style_set_border_color(style, lv_color_hex(0x2196f3));
        }
    }
};