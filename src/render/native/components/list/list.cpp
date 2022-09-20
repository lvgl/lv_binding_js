
#include "list.hpp"

List::List(std::string uid, lv_obj_t* parent): BasicComponent() {
    this->type = COMP_TYPE_LIST;

    this->uid = uid;
    this->instance = lv_list_create(parent != nullptr ? parent : GetWindowInstance());
    
    lv_obj_set_user_data(this->instance, this);
};