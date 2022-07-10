#pragma once

#include <string>
#include <map>
#include <vector>

extern "C" {
    #include "lvgl.h"
    #include "quickjs.h"
};

#include "native/core/style/style.hpp"

class BasicComponent {
  public:
    BasicComponent();
    ~BasicComponent();

    lv_obj_t* instance = nullptr;
    std::string uid;
    lv_style_t style;

    std::map<std::string, bool> registeEvents;

    void addEventListener(std::string eventType);
    void removeEventListener(std::string eventType);
    bool isEventRegist(std::string eventType);

    void setStyle(JSContext* ctx, JSValue obj, std::vector<std::string> keys);
    void appendChild(void* child);
    void removeChild(void* child);
    void insertChildBefore(void *child);
};
