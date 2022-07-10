
#include "View.hpp"

View::View(std::string uid, lv_obj_t* parent): BasicComponent() {
    this->uid = uid;
    this->instance = lv_obj_create(parent != nullptr ? parent : lv_scr_act());
};