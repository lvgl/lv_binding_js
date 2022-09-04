#include "./release.hpp"

#define DISP_BUF_SIZE (1024 * 600)

void hal_init () {
    /*LittlevGL init*/
    lv_init();

    /*Linux frame buffer device init*/
    fbdev_init();

    /*A small buffer for LittlevGL to draw the screen's content*/
    static lv_color_t buf[DISP_BUF_SIZE];

    /*Initialize a descriptor for the buffer*/
    static lv_disp_draw_buf_t disp_buf;
    lv_disp_draw_buf_init(&disp_buf, buf, NULL, DISP_BUF_SIZE);

    /*Initialize and register a display driver*/
    static lv_disp_drv_t disp_drv;
    lv_disp_drv_init(&disp_drv);
    disp_drv.draw_buf   = &disp_buf;
    disp_drv.flush_cb   = fbdev_flush;
    disp_drv.hor_res    = 1024;
    disp_drv.ver_res    = 600;
    lv_disp_drv_register(&disp_drv);

	/* Linux input device init */
    evdev_init();
	
    /* Initialize and register a display input driver */
    lv_indev_drv_t indev_drv;
    lv_indev_drv_init(&indev_drv);      /*Basic initialization*/

    indev_drv.type = LV_INDEV_TYPE_POINTER;
    indev_drv.read_cb = evdev_read;   //lv_gesture_dir_t lv_indev_get_gesture_dir(const lv_indev_t * indev)
    lv_indev_t * my_indev = lv_indev_drv_register(&indev_drv);
};