
#include "Window.hpp"

Window::Window(std::string uid): BasicComponent() {
    this->uid = uid;
    this->instance = lv_obj_create(lv_scr_act());
};