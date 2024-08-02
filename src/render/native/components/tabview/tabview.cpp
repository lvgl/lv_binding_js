
#include "tabview.hpp"

TabView::TabView(std::string uid, uint32_t pos, uint32_t size, lv_obj_t* parent): BasicComponent(uid) {
    this->type = COMP_TYPE_TABVIEW;

    this->uid = uid;
    this->instance = lv_tabview_create(parent != nullptr ? parent : GetWindowInstance());
    lv_tabview_set_tab_bar_size(this->instance, size);
    lv_group_add_obj(lv_group_get_default(), this->instance);

    lv_obj_remove_flag(this->instance, LV_OBJ_FLAG_SCROLL_ON_FOCUS);
    lv_obj_add_flag(this->instance, LV_OBJ_FLAG_EVENT_BUBBLE | LV_OBJ_FLAG_CLICK_FOCUSABLE);
    lv_obj_set_user_data(this->instance, this);
    this->initStyle(LV_PART_MAIN);
};

void TabView::setTab(std::string& tab, BasicComponent* content) {
    lv_obj_t* page = lv_tabview_add_tab(this->instance, tab.c_str());
    lv_obj_set_parent(content->instance, page);
};
