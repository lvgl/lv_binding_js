
#include "textarea.hpp"

Textarea::Textarea(std::string uid, lv_obj_t* parent): BasicComponent(uid) {
    this->type = COMP_TYPE_TEXTAREA;
    this->uid = uid;
    this->instance = lv_textarea_create(parent != nullptr ? parent : GetWindowInstance());
    lv_group_add_obj(lv_group_get_default(), this->instance);

    lv_obj_set_user_data(this->instance, this);
    lv_obj_add_flag(this->instance, LV_OBJ_FLAG_CLICK_FOCUSABLE);
    lv_obj_remove_flag(this->instance, LV_OBJ_FLAG_SCROLL_ON_FOCUS);
    this->initStyle(LV_PART_MAIN);
    this->initStyle(LV_STATE_FOCUSED);

    lv_obj_add_event_cb(this->instance, &Textarea::raiseKeyboard, LV_EVENT_FOCUSED, this);
    lv_obj_add_event_cb(this->instance, &Textarea::hideKeyboard, LV_EVENT_DEFOCUSED, this);
};

void Textarea::raiseKeyboard (lv_event_t* event) {
    Textarea* comp = static_cast<Textarea*>(lv_event_get_user_data(event));
    if (!comp->auto_raise_keyboard) return;
    lv_obj_t* keyboard = lv_keyboard_create(lv_layer_top());
    comp->keyboard = keyboard;

    uint32_t height;
    lv_display_t* disp_default = lv_display_get_default();
    height = lv_display_get_vertical_resolution(disp_default);

    lv_keyboard_set_textarea(keyboard, comp->instance);
    lv_obj_set_style_height(keyboard, height * 2 / 3, 0);
    lv_obj_update_layout(lv_layer_top());   /*Be sure the sizes are recalculated*/

    lv_obj_set_style_height(GetWindowInstance(), height - lv_obj_get_height(keyboard), 0);
    lv_obj_scroll_to_view_recursive(comp->instance, LV_ANIM_ON);

    lv_obj_add_event_cb(comp->keyboard, &Textarea::hideKeyboard, LV_EVENT_CANCEL, comp);
    lv_obj_add_event_cb(comp->keyboard, &Textarea::hideKeyboard, LV_EVENT_READY, comp);
};

void Textarea::hideKeyboard (lv_event_t * event) {
    Textarea* comp = static_cast<Textarea*>(lv_event_get_user_data(event));
    if (comp->keyboard == nullptr || !comp->auto_raise_keyboard) return;

    lv_keyboard_set_textarea(comp->keyboard, nullptr);
    lv_obj_delete_async(comp->keyboard);

    lv_display_t* disp_default = lv_display_get_default();
    lv_obj_set_style_height(GetWindowInstance(), lv_display_get_vertical_resolution(disp_default), 0);
    lv_obj_update_layout(lv_screen_active());
    lv_obj_remove_state(comp->instance, LV_STATE_FOCUSED);
    lv_indev_reset(NULL, comp->instance);
    comp->keyboard = nullptr;
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

void Textarea::setAutoRaiseKeyboard (int32_t payload) {
    this->auto_raise_keyboard = payload;
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
