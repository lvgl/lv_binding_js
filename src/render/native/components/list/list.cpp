
#include "list.hpp"

List::List(std::string uid, lv_obj_t* parent): BasicComponent(uid) {
    this->type = COMP_TYPE_LIST;

    this->uid = uid;
    this->instance = lv_list_create(parent != nullptr ? parent : GetWindowInstance());
    lv_group_add_obj(lv_group_get_default(), this->instance);

    lv_obj_clear_flag(this->instance, LV_OBJ_FLAG_SCROLL_ON_FOCUS);
    lv_obj_set_user_data(this->instance, this);
};
