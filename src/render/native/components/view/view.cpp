
#include "view.hpp"

View::View(std::string uid, lv_obj_t* parent): BasicComponent() {
    this->uid = uid;
    this->instance = lv_obj_create(parent != nullptr ? parent : lv_scr_act());
    
    lv_obj_add_flag(this->instance, LV_OBJ_FLAG_EVENT_BUBBLE);
    
    this->initStyle();
};