
#include "./mask.hpp"

Mask::Mask(std::string uid, lv_obj_t* parent): BasicComponent(uid) {
    this->type = COMP_TYPE_MASK;

    this->uid = uid;
    this->instance = lv_obj_create(lv_layer_top());

    lv_group_add_obj(lv_group_get_default(), this->instance);

    lv_obj_add_flag(this->instance, LV_OBJ_FLAG_EVENT_BUBBLE | LV_OBJ_FLAG_CLICK_FOCUSABLE);
    lv_obj_clear_flag(this->instance, LV_OBJ_FLAG_SCROLL_ON_FOCUS);
    lv_obj_set_user_data(this->instance, this);
    this->initStyle(LV_PART_MAIN);
};

void Mask::initCompStyle (int32_t type) {
    this->ensureStyle(type);
    lv_style_t* style = this->style_map.at(type);

    uint32_t width, height;
    lv_disp_t* disp_default = lv_disp_get_default();
    width = disp_default->driver->hor_res;
    height = disp_default->driver->ver_res;

    lv_obj_set_style_height(this->instance, height, 0);
    lv_obj_set_style_width(this->instance, width, 0);
    lv_obj_set_style_bg_opa(this->instance, LV_OPA_70, 0);
    lv_obj_set_style_bg_color(this->instance, lv_color_hex(0), 0);
};
