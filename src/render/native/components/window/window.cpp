
#include "window.hpp"

lv_obj_t* GetWindowInstance () {
    return lv_scr_act();
};

static void scrollbar_mode_event_cb(lv_event_t * e) {
    lv_event_code_t code = lv_event_get_code(e);
    if (code == LV_EVENT_CHILD_CREATED) {
        lv_obj_t * child = (lv_obj_t *)lv_event_get_param(e);
        if (child) lv_obj_set_scrollbar_mode(child, LV_SCROLLBAR_MODE_OFF);
    }
}

void WindowInit () {
    lv_obj_add_event_cb(lv_scr_act(), scrollbar_mode_event_cb, LV_EVENT_CHILD_CREATED, NULL);
};
