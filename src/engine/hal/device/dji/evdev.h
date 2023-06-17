/**
 * @file evdev.h
 *
 */

#ifndef EVDEV_H
#define EVDEV_H

#ifdef __cplusplus
extern "C" {
#endif

/*********************
 *      INCLUDES
 *********************/
#ifndef LV_DRV_NO_CONF
#include "lv_drv_conf.h"
#endif

#if USE_EVDEV || USE_BSD_EVDEV

#ifdef LV_LVGL_H_INCLUDE_SIMPLE
#include "lvgl.h"
#else
#include "lvgl/lvgl.h"
#endif

/*********************
 *      DEFINES
 *********************/

/**********************
 *      TYPEDEFS
 **********************/

/**********************
 * GLOBAL PROTOTYPES
 **********************/

/**
 * Initialize the evdev
 */
void evdev_init();
void evdev_set_event_cb(void(*_event_cb)(lv_indev_data_t* data));
/**
 * reconfigure the device file for evdev
 * @param dev_name set the evdev device filename
 * @return true: the device file set complete
 *         false: the device file doesn't exist current system
 */
bool evdev_set_file(char* dev_name);
/**
 * Get the current position and state of the evdev
 * @param data store the evdev data here
 */
void evdev_read(lv_indev_drv_t * drv, lv_indev_data_t * data);


/**********************
 *      MACROS
 **********************/

#endif /* USE_EVDEV */

#ifdef __cplusplus
} /* extern "C" */
#endif

#endif /* EVDEV_H */
