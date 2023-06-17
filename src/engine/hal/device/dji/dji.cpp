#include "./dji.hpp"

#include "./dji_display.h"
#include "./dji_services.h"
#include "./evdev.h"

#define SCREEN_WIDTH 1440
#define SCREEN_HEIGHT 810
#define BYTES_PER_PIXEL 4
#define PLANE_ID 6
#define BUFSIZE WIDTH * 100

static dji_display_state_t *dji_display;
static void *fb0_addr;
static void *fb1_addr;
static bool whichfb = 0;

static lv_indev_t * keypad_indev;

/*static lv_color_t buf1_1[BUFSIZE];
static lv_color_t buf1_2[BUFSIZE];*/

void dji_set_px_cb(lv_disp_drv_t * disp_drv, uint8_t * buf, lv_coord_t buf_w, lv_coord_t x, lv_coord_t y, lv_color_t color, lv_opa_t opa)
{
   buf += (y * SCREEN_WIDTH + x)*BYTES_PER_PIXEL;
   lv_color_t *pixel = (lv_color_t *)buf;
   *pixel = color;
   buf[3] = ~opa;
}

void dji_display_flush(lv_disp_drv_t * drv, const lv_area_t * area, lv_color_t * color_p) {
  //printf("%p - %p - %p\n", fb0_addr, fb1_addr, (void*)color_p);
  //printf("x1 - %d \t x2 \t - %d \t y1 - %d \t y2 %d\n", area->x1, area->x2, area->y1, area->y2);
  //printf("w - %d \t h - %d\n", area->x2 - area->x1, area->y2 - area->y1);
  //pthread_mutex_lock(&fb_switch_lock);
  void* fb = (whichfb ? fb0_addr : fb1_addr);
  //pthread_mutex_unlock(&fb_switch_lock);

  if(lv_disp_flush_is_last(drv)) {
    dji_display_push_frame(dji_display, whichfb);
    whichfb = !whichfb;
  }

  lv_disp_flush_ready(drv);
}

/**
 * Initialize the Hardware Abstraction Layer (HAL) for the LVGL graphics
 * library
 */
void hal_init() {
  dji_display = dji_display_state_alloc(dji_goggles_are_v2());
  dji_display_open_framebuffer(dji_display, PLANE_ID);

  /*Create a display buffer*/

  static lv_disp_draw_buf_t disp_buf1;
  fb0_addr = dji_display_get_fb_address(dji_display, 0);
  fb1_addr = dji_display_get_fb_address(dji_display, 1);
  memset(fb0_addr, 0x000000FF, SCREEN_WIDTH * SCREEN_HEIGHT * BYTES_PER_PIXEL);
  memset(fb1_addr, 0x000000FF, SCREEN_WIDTH * SCREEN_HEIGHT * BYTES_PER_PIXEL);
  lv_disp_draw_buf_init(&disp_buf1, fb0_addr, fb1_addr, SCREEN_WIDTH * SCREEN_HEIGHT * BYTES_PER_PIXEL);

  /*Create a display*/
  static lv_disp_drv_t disp_drv;
  lv_disp_drv_init(&disp_drv); /*Basic initialization*/
  disp_drv.draw_buf = &disp_buf1;
  disp_drv.flush_cb = dji_display_flush;
  disp_drv.hor_res = SCREEN_WIDTH;
  disp_drv.ver_res = SCREEN_HEIGHT;
  disp_drv.set_px_cb = dji_set_px_cb;
  disp_drv.full_refresh = 1;
  //flush callback fails otherwise with sigsev
  disp_drv.screen_transp = 0;

  lv_disp_t *disp = lv_disp_drv_register(&disp_drv);

  lv_theme_t *th = lv_theme_default_init(
      disp, lv_palette_main(LV_PALETTE_BLUE), lv_palette_main(LV_PALETTE_RED),
      LV_THEME_DEFAULT_DARK, LV_FONT_DEFAULT);
  lv_disp_set_theme(disp, th);



  evdev_init();
  static lv_indev_drv_t indev_drv;
  lv_indev_drv_init(&indev_drv);
  indev_drv.type = LV_INDEV_TYPE_KEYPAD;
  indev_drv.read_cb = evdev_read;
  keypad_indev = lv_indev_drv_register(&indev_drv);
  
  
  lv_group_t *g = lv_group_create();
  lv_group_set_default(g);
  lv_indev_set_group(keypad_indev, g);
}
