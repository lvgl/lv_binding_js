#pragma once

#include <string>
#include <map>
#include <vector>

extern "C" {
    #include "lvgl.h"
    #include "quickjs.h"
};

#include "native/core/event/event.hpp"
#include "native/core/style/style.hpp"

class BasicComponent {
  public:
    BasicComponent();
    ~BasicComponent();

    lv_obj_t* instance = nullptr;
    std::string uid;
    lv_style_t style;
    lv_style_t press_style;
    lv_style_t checked_style;
    lv_style_t focus_style;
    lv_style_t focus_key_style;
    lv_style_t edited_style;
    lv_style_t hoverd_style;
    lv_style_t scrolled_style;
    lv_style_t disabled_style;

    lv_style_transition_dsc_t* trans = nullptr;
    lv_style_prop_t* transProps = nullptr;

    bool listening = false;

    std::map<int, bool> registeEvents;

    void addEventListener(int eventType);
    void removeEventListener(int eventType);
    bool isEventRegist(int eventType);
    void eventCallback (lv_obj_t * obj, lv_event_t event);
    static void EventCallback (lv_event_t * event);
    void setTransition (JSContext* ctx, JSValue obj, lv_style_t* style);

    void initStyle ();
    void setStyle(JSContext* ctx, JSValue obj, std::vector<std::string> keys, int32_t type);
    void appendChild(void* child);
    void removeChild(void* child);
    void insertChildBefore(void *child);
};
