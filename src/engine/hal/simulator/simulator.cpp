#include "./simulator.hpp"
#include "private.h"

static lv_indev_t *init_input_devices(lv_group_t *g) {
    /* Add input devices: mouse, keyboard, and encoder */
    struct {
        lv_indev_type_t type;
        void (*read_cb)(lv_indev_drv_t *, lv_indev_data_t *);
        bool set_group;
    } indev_configs[] = {
        {LV_INDEV_TYPE_POINTER, &sdl_mouse_read, false},
        {LV_INDEV_TYPE_KEYPAD, &sdl_keyboard_read, true},
        {LV_INDEV_TYPE_ENCODER, &sdl_mousewheel_read, true}
    };

    static lv_indev_drv_t indev_drvs[3];
    lv_indev_t *mouse_indev = nullptr;

    for (size_t i = 0; i < ARRAY_SIZE(indev_configs); i++) {
        lv_indev_drv_init(&indev_drvs[i]); /*Basic initialization*/
        indev_drvs[i].type = indev_configs[i].type;
        indev_drvs[i].read_cb = indev_configs[i].read_cb;
        lv_indev_t *cur_indev = lv_indev_drv_register(&indev_drvs[i]);
        
        if (indev_configs[i].set_group)
            lv_indev_set_group(cur_indev, g);
        
        if (indev_configs[i].type == LV_INDEV_TYPE_POINTER)
            mouse_indev = cur_indev;
    }

    return mouse_indev;
}

void hal_init(void) {

    static lv_color_t buf[SDL_HOR_RES * 100];

    /* Use the 'monitor' driver which creates window on PC's monitor to simulate a display*/
    sdl_init();

    /*Create a display buffer*/
    static lv_disp_draw_buf_t disp_buf1;
    lv_disp_draw_buf_init(&disp_buf1, buf, NULL, SDL_HOR_RES * 100);

    /*Create a display*/
    static lv_disp_drv_t disp_drv;
    lv_disp_drv_init(&disp_drv); /*Basic initialization*/
    disp_drv.draw_buf = &disp_buf1;
    disp_drv.flush_cb = &sdl_display_flush;
    disp_drv.hor_res = SDL_HOR_RES;
    disp_drv.ver_res = SDL_VER_RES;

    lv_disp_t * disp = lv_disp_drv_register(&disp_drv);

    lv_theme_t * th = lv_theme_default_init(disp, lv_palette_main(LV_PALETTE_BLUE), lv_palette_main(LV_PALETTE_RED), LV_THEME_DEFAULT_DARK, LV_FONT_DEFAULT);
    lv_disp_set_theme(disp, th);

    lv_group_t * g = lv_group_create();
    lv_group_set_default(g);

    lv_indev_t *mouse_indev = init_input_devices(g);

    /*Set a cursor for the mouse*/
    LV_IMG_DECLARE(mouse_cursor_icon); /*Declare the image file.*/
    lv_obj_t * cursor_obj = lv_img_create(lv_scr_act()); /*Create an image object for the cursor */
    lv_img_set_src(cursor_obj, &mouse_cursor_icon);           /*Set the image source*/
    lv_indev_set_cursor(mouse_indev, cursor_obj);             /*Connect the image  object to the driver*/
}