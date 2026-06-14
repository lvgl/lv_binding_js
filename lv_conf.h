/**
 * @file lv_conf.h
 * LVGL configuration router for simulator and device builds.
 */

/* clang-format off */
#if IS_SIM
#include "deps/lv_conf_sim.h"
#elif IS_DEVICE
#include "deps/lv_conf_device.h"
#else
#error "Define IS_SIM or IS_DEVICE"
#endif
