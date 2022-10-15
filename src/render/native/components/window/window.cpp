
#include "window.hpp"

lv_obj_t* GetWindowInstance () {
    return window_instance;
};

// Window::Window(std::string uid): BasicComponent(uid) {
//     this->uid = uid;
//     this->instance = lv_obj_create(lv_scr_act());
//     window_instance = this->instance;
//     lv_obj_add_flag(this->instance, LV_OBJ_FLAG_EVENT_BUBBLE | LV_OBJ_FLAG_CLICK_FOCUSABLE);
//     lv_obj_set_user_data(this->instance, this);
//     // this->initStyle(LV_PART_MAIN);
// };

void WindowInit () {
    lv_disp_t* disp_default = lv_disp_get_default();
    window_instance = lv_obj_create(lv_scr_act());
    lv_group_add_obj(lv_group_get_default(), window_instance);
    lv_obj_set_style_height(window_instance, disp_default->driver->ver_res, 0);
    lv_obj_set_style_width(window_instance, disp_default->driver->hor_res, 0);
    lv_obj_set_style_pad_all(window_instance, 0, 0);
    lv_obj_set_style_radius(window_instance, 0, 0);
    lv_obj_set_style_border_width(window_instance, 0, 0);
};
