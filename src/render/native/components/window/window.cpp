
#include "window.hpp"

lv_obj_t* GetWindowInstance () {
    return window_instance;
};

void WindowInit () {
    lv_display_t* disp_default = lv_display_get_default();
    window_instance = lv_obj_create(lv_screen_active());
    lv_group_add_obj(lv_group_get_default(), window_instance);
    lv_obj_set_style_height(window_instance, lv_display_get_vertical_resolution(disp_default), 0);
    lv_obj_set_style_width(window_instance, lv_display_get_horizontal_resolution(disp_default), 0);
    lv_obj_set_style_pad_all(window_instance, 0, 0);
    lv_obj_set_style_radius(window_instance, 0, 0);
    lv_obj_set_style_border_width(window_instance, 0, 0);
};
