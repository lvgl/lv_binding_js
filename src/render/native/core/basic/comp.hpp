#pragma once

#include <string>
#include <map>
#include <vector>

extern "C" {
    #include "lvgl.h"
    #include "quickjs.h"
};

enum ECOMP_TYPE {
  COMP_TYPE_VIEW,
  COMP_TYPE_BUTTON,
  COMP_TYPE_IMAGE,
  COMP_TYPE_SLIDER,
  COMP_TYPE_TEXT,
  COMP_TYPE_WINDOW,
};

#include "native/core/event/event.hpp"
#include "native/core/style/style.hpp"
#include "native/core/utils/utils.hpp"

class BasicComponent {
  public:
    BasicComponent();
    ~BasicComponent();

    lv_obj_t* instance = nullptr;
    std::string uid;
    // lv_style_t style;
    // lv_style_t press_style;
    // lv_style_t checked_style;
    // lv_style_t focus_style;
    // lv_style_t focus_key_style;
    // lv_style_t edited_style;
    // lv_style_t hoverd_style;
    // lv_style_t scrolled_style;
    // lv_style_t disabled_style;
    // lv_style_t scrollbar_style;
    // lv_style_t indicator_style;
    // lv_style_t knob_style;
    // lv_style_t selected_style;
    // lv_style_t cursor_style;

    std::unordered_map<int32_t, lv_style_t*> style_map;

    lv_style_transition_dsc_t trans;
    lv_style_prop_t* transProps = nullptr;

    bool listening = false;
    ECOMP_TYPE type;

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
