#include "./comp.hpp"

void BasicComponent::addEventListener (std::string eventType) {
    this->registeEvents.insert({ eventType, true });
};

void BasicComponent::removeEventListener (std::string eventType) {
    this->registeEvents.erase(eventType);
};

bool BasicComponent::isEventRegist(std::string eventType) {
    return this->registeEvents.count(eventType) > 0;
};

void BasicComponent::insertChildBefore(void *child) {
    
};

void BasicComponent::removeChild(void* child) {
    lv_obj_del((static_cast<BasicComponent*>(child))->instance);
};

void BasicComponent::appendChild (void* child) {
    lv_obj_set_parent((static_cast<BasicComponent*>(child))->instance, this->instance);
};

BasicComponent::BasicComponent () {
    
};

void BasicComponent::setStyle(JSContext* ctx, JSValue obj, std::vector<std::string> keys) {
    lv_style_init(&this->style);
    lv_style_reset(&this->style);

    for(int i=0; i < keys.size(); i++) {
        std::string key = keys[i];

        if (StyleManager::styles.count(key) > 0) {
            CompSetStyle* func = StyleManager::styles.at(key);
            JSValue value = JS_GetPropertyStr(ctx, obj, key.c_str());
            func(this->instance, &this->style, ctx, value);
            JS_FreeValue(ctx, value);
        }
    }

    lv_obj_add_style(this->instance, &this->style, 0);
    lv_obj_invalidate(this->instance);
};

BasicComponent::~BasicComponent () {
    lv_obj_del(this->instance);
};