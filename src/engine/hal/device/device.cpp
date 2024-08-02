#include "./device.hpp"

void hal_init () {
    /*LittlevGL init*/
    lv_init();

    /*Linux frame buffer device init*/
    lv_display_t *disp = lv_linux_fbdev_create();
    lv_linux_fbdev_set_file(disp, "/dev/fb0");

    /* Linux input device init */
    lv_indev_t *mouse = lv_evdev_create(LV_INDEV_TYPE_POINTER, "/dev/input/event0");
    lv_indev_set_group(mouse, lv_group_get_default());
    lv_indev_set_display(mouse, disp);

#ifdef SHOW_CURSOR
    /* Set a cursor for the mouse */
    LV_IMG_DECLARE(mouse_cursor_icon);                  /* Declare the image file */
    lv_obj_t *cursor_obj = lv_img_create(lv_scr_act()); /* Create an image object for the cursor */
    lv_img_set_src(cursor_obj, &mouse_cursor_icon);     /* Set the image source */
    lv_indev_set_cursor(mouse, cursor_obj);          /* Connect the image  object to the driver */
#endif
};
