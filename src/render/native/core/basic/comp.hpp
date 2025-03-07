#pragma once

#include <string>
#include <map>
#include <vector>

extern "C" {
    #include "lvgl.h"
    #include "private.h"
};

enum ECOMP_TYPE {
  COMP_TYPE_VIEW,
  COMP_TYPE_BUTTON,
  COMP_TYPE_IMAGE,
  COMP_TYPE_GIF,
  COMP_TYPE_SLIDER,
  COMP_TYPE_ARC,
  COMP_TYPE_TEXT,
  COMP_TYPE_WINDOW,
  COMP_TYPE_SWITCH,
  COMP_TYPE_TEXTAREA,
  COMP_TYPE_CHECKBOX,
  COMP_TYPE_DROPDOWNLIST,
  COMP_TYPE_PROGRESSBAR,
  COMP_TYPE_ROLLER,
  COMP_TYPE_LINE,
  COMP_TYPE_CALENDAR,
  COMP_TYPE_LIST,
  COMP_TYPE_TABVIEW,
  COMP_TYPE_CHART,
  COMP_TYPE_MASK
};

#include "native/core/event/event.hpp"
#include "native/core/style/style.hpp"
#include "native/core/img/img.hpp"

class BasicComponent {
  public:
    BasicComponent(std::string& uid);
    ~BasicComponent();

    lv_obj_t* instance = nullptr;
    lv_obj_t* parent_instance = nullptr;  // used to style position: fixed to normal position
    std::string uid;

    std::unordered_map<int32_t, lv_style_t*> style_map;
    std::unordered_map<int32_t, lv_img_dsc_t_1*> image_desc_map;
    std::unordered_map<int32_t, std::string> symbol_map;

    lv_style_transition_dsc_t trans;
    std::unordered_map<int32_t, lv_style_prop_t*> trans_props_map;

    bool is_fixed = false;
    bool has_setstyle;
    bool listening = false;
    ECOMP_TYPE type;

    int32_t* grid_row_desc = nullptr;
    int32_t* grid_column_desc = nullptr;

    std::map<int, bool> registeEvents;

    void addEventListener(int eventType);
    void removeEventListener(int eventType);
    bool isEventRegist(int eventType);
    void eventCallback (lv_obj_t * obj, lv_event_t event);
    static void EventCallback (lv_event_t * event);

    void setTransition (JSContext* ctx, JSValue obj, lv_style_t* style, int32_t type);

    void setBackgroundImage (uint8_t* buf, size_t buf_len, int32_t style_type, std::string& symbol);
  
    void initStyle (int32_t type);
    virtual void initCompStyle (int32_t type);
    void setStyle(JSContext* ctx, JSValue& obj, std::vector<std::string>& keys, int32_t type, bool isinit = true);
    bool ensureStyle (int32_t type);

    void appendChild(void* child);
    void removeChild(void* child);
    void insertChildBefore(void *child);

    void moveToFront ();
    void moveToBackground ();
    void scrollIntoView ();

    void setAlign (int32_t align_type, int32_t x, int32_t y);
    void setAlignTo (int32_t align_type, int32_t x, int32_t y, BasicComponent* parent);
};

extern std::unordered_map<std::string, BasicComponent*> comp_map;
