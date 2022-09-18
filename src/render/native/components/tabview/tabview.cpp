
#include "tabview.hpp"

TabView::TabView(std::string uid, uint32_t pos, uint32_t size, lv_obj_t* parent): BasicComponent() {
    this->type = COMP_TYPE_TABVIEW;

    this->uid = uid;
    this->instance = lv_tabview_create(parent != nullptr ? parent : lv_scr_act(), pos, size);
    
    lv_obj_add_flag(this->instance, LV_OBJ_FLAG_EVENT_BUBBLE);
    lv_obj_set_user_data(this->instance, this);
    this->initStyle(LV_PART_MAIN);
};

void TabView::setTab(std::string& tab, BasicComponent* content) {
    lv_obj_t* page = lv_tabview_add_tab(this->instance, tab.c_str());
    lv_obj_set_parent(content->instance, page);
};