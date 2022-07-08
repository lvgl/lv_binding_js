#include "comp.hpp"

void BasicComponent::addEventListener (std::string eventType) {
    this->registerEvents.insert({ eventType, true });
};

void BasicComponent::removeEventListener (std::string eventType) {
    this->registerEvents.erase(eventType);
    delete &eventType;
};

bool BasicComponent::isEventRegist(std::string eventType) {
    return this->registerEvents.count(eventType) > 0;
};

void BasicComponent::insertChildBefore(void *child) {
    
};

void BasicComponent::removeChild(void* child) {
    lv_obj_del((dynamic_cast<BasicComponent*>(child))->instance);
};

void BasicComponent::appendChild (void* child) {
    ((dynamic_cast<BasicComponent*>(child))->instance)->lv_obj_set_parent(this->instance);
};

BasicComponent::~BasicComponent () {
    lv_obj_del(this->instance);
};