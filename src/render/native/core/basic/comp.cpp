#include "./comp.hpp"

void BasicComponent::addEventListener (int eventType) {
    this->registeEvents.insert({ eventType, true });

    lv_obj_add_event_cb(this->instance, &BasicComponent::EventCallback, LV_EVENT_ALL, this);
};

void BasicComponent::EventCallback (lv_event_t * event) {
    BasicComponent* instance = static_cast<BasicComponent*>(event->user_data);
    std::string uid = instance->uid;
    lv_event_code_t code = event->code;

    if (instance->isEventRegist(static_cast<int>(code))) {
        FireEventToJS(event, uid, code);
    }
};

void BasicComponent::removeEventListener (int eventType) {
    this->registeEvents.erase(eventType);

    lv_obj_remove_event_cb(this->instance, &BasicComponent::EventCallback);
};

bool BasicComponent::isEventRegist(int eventType) {
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

void BasicComponent::initStyle () {
    lv_style_init(&this->style);
    lv_style_reset(&this->style);

    lv_style_set_pad_left(&this->style, 0);
    lv_style_set_pad_right(&this->style, 0);
    lv_style_set_pad_bottom(&this->style, 0);
    lv_style_set_pad_top(&this->style, 0);
    lv_style_set_radius(&this->style, 0);
    lv_style_set_outline_width(&this->style, 0);
    lv_style_set_border_width(&this->style, 0);
    lv_style_set_border_side(&this->style, LV_BORDER_SIDE_FULL);
    lv_obj_invalidate(this->instance);
};

BasicComponent::BasicComponent () {
    
};

void BasicComponent::setStyle(JSContext* ctx, JSValue obj, std::vector<std::string> keys) {
    this->initStyle();

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