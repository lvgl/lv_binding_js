
#include "progressbar.hpp"

ProgressBar::ProgressBar(std::string uid, lv_obj_t* parent): BasicComponent(uid) {
    this->type = COMP_TYPE_PROGRESSBAR;

    this->uid = uid;
    this->instance = lv_bar_create(parent != nullptr ? parent : GetWindowInstance());
    lv_group_add_obj(lv_group_get_default(), this->instance);
    
    lv_obj_clear_flag(this->instance, LV_OBJ_FLAG_SCROLL_ON_FOCUS);
    lv_obj_add_flag(this->instance, LV_OBJ_FLAG_EVENT_BUBBLE | LV_OBJ_FLAG_CLICK_FOCUSABLE);
    lv_obj_set_user_data(this->instance, this);
};

void ProgressBar::setValue (int32_t value, bool use_animation) {
    lv_bar_set_value(this->instance, value, static_cast<lv_anim_enable_t>(use_animation));
};

void ProgressBar::setRange (int32_t start, int32_t end) {
    lv_bar_set_range(this->instance, start, end);
};