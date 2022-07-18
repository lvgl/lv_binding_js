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

    bool listening = false;

    std::map<int, bool> registeEvents;

    void addEventListener(int eventType);
    void removeEventListener(int eventType);
    bool isEventRegist(int eventType);
    void eventCallback (lv_obj_t * obj, lv_event_t event);
    static void EventCallback (lv_event_t * event);

    void initStyle ();
    void setStyle(JSContext* ctx, JSValue obj, std::vector<std::string> keys);
    void appendChild(void* child);
    void removeChild(void* child);
    void insertChildBefore(void *child);

};
