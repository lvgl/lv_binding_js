#include "./comp.hpp"

void __InitStyle (lv_style_t* style, lv_obj_t* instance) {
    lv_style_init(style);
    lv_style_reset(style);

    lv_style_set_pad_left(style, 0);
    lv_style_set_pad_right(style, 0);
    lv_style_set_pad_bottom(style, 0);
    lv_style_set_pad_top(style, 0);
    lv_style_set_radius(style, 0);
    lv_style_set_outline_width(style, 0);
    lv_style_set_outline_pad(style, 0);
    lv_style_set_border_width(style, 0);
    lv_style_set_border_side(style, LV_BORDER_SIDE_FULL);
};

void BasicComponent::addEventListener (int eventType) {
    if (!this->registeEvents.count(eventType)) {
        this->registeEvents.insert({ eventType, true });
    }
    if (!this->listening) {
        this->listening = true;
        lv_obj_add_event_cb(this->instance, &BasicComponent::EventCallback, LV_EVENT_ALL, this);
    }
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
    __InitStyle(&this->style, this->instance);
    __InitStyle(&this->press_style, this->instance);
    __InitStyle(&this->checked_style, this->instance);
    __InitStyle(&this->focus_style, this->instance);
    __InitStyle(&this->edited_style, this->instance);
    __InitStyle(&this->hoverd_style, this->instance);
    __InitStyle(&this->scrolled_style, this->instance);
    __InitStyle(&this->disabled_style, this->instance);
    __InitStyle(&this->scrollbar_style, this->instance);
    __InitStyle(&this->indicator_style, this->instance);
    __InitStyle(&this->knob_style, this->instance);
    __InitStyle(&this->selected_style, this->instance);
    __InitStyle(&this->cursor_style, this->instance);
    lv_obj_invalidate(instance);
};

BasicComponent::BasicComponent () {
    
};

void BasicComponent::setTransition (JSContext* ctx, JSValue obj, lv_style_t* style) {
    int32_t len;
    JSValue value_len = JS_GetPropertyUint32(ctx, obj, 0);
    JS_ToInt32(ctx, &len, value_len);

    lv_style_prop_t* old_transProps = this->transProps;
    
    this->transProps = (lv_style_prop_t*)malloc((len + 1) * sizeof(lv_style_prop_t));
    
    JSValue props = JS_GetPropertyUint32(ctx, obj, 1);
    int32_t prop_key;
    for(int i=0; i < len; i++) {
        JSValue prop = JS_GetPropertyUint32(ctx, props, i);
        JS_ToInt32(ctx, &prop_key, prop);
        JS_FreeValue(ctx, prop);
        this->transProps[i] = (lv_style_prop_t)prop_key;
    }
    this->transProps[len] = LV_STYLE_PROP_INV;

    int32_t dura;
    JSValue dura_value = JS_GetPropertyUint32(ctx, obj, 2);
    JS_ToInt32(ctx, &dura, dura_value);

    JSValue func_value = JS_GetPropertyUint32(ctx, obj, 3);
    size_t func_str_len;
    const char* func_str = JS_ToCStringLen(ctx, &func_str_len, func_value);
    std::string func_str_1 = func_str;
    func_str_1.resize(func_str_len);

    int32_t delay;
    JSValue delay_value = JS_GetPropertyUint32(ctx, obj, 4);
    JS_ToInt32(ctx, &delay, delay_value);

    CompSetTransition(style, &this->trans, this->transProps, func_str_1, dura, delay);

    JS_FreeValue(ctx, value_len);
    JS_FreeValue(ctx, props);
    JS_FreeValue(ctx, func_value);
    JS_FreeValue(ctx, dura_value);
    JS_FreeValue(ctx, delay_value);
    JS_FreeCString(ctx, func_str);

    if (old_transProps != nullptr) {
        free(old_transProps);
    }
};

void BasicComponent::setStyle(JSContext* ctx, JSValue obj, std::vector<std::string> keys, int32_t type) {
    lv_style_t* style;
    switch (type)
    {
        case LV_STATE_DEFAULT:
            style = &this->style;
            break;
        
        case LV_STATE_CHECKED:
            style = &this->checked_style;
            break;

        case LV_STATE_FOCUSED:
            style = &this->focus_style;
            break;

        case LV_STATE_FOCUS_KEY:
            style = &this->focus_key_style;
            break;

        case LV_STATE_EDITED:
            style = &this->edited_style;
            break;
        
        case LV_STATE_HOVERED:
            style = &this->hoverd_style;
            break;

        case LV_STATE_PRESSED:
            style = &this->press_style;
            break;

        case LV_STATE_SCROLLED:
            style = &this->scrolled_style;
            break;
        
        case LV_STATE_DISABLED:
            style = &this->disabled_style;
            break;
        
        case LV_PART_SCROLLBAR:
            style = &this->scrollbar_style;
            break;

        case LV_PART_INDICATOR:
            style = &this->indicator_style;
            break;

        case LV_PART_KNOB:
            style = &this->knob_style;
            break;

        case LV_PART_SELECTED:
            style = &this->selected_style;
            break;

        case LV_PART_CURSOR:
            style = &this->cursor_style;
            break;
        
        default:
            return;
    }
    __InitStyle(style, this->instance);

    for(int i=0; i < keys.size(); i++) {
        std::string key = keys[i];

        if (StyleManager::styles.count(key) > 0) {
            CompSetStyle* func = StyleManager::styles.at(key);
            JSValue value = JS_GetPropertyStr(ctx, obj, key.c_str());
            func(this->instance, style, ctx, value);
            JS_FreeValue(ctx, value);
        }
    }

    for(int i=0; i < keys.size(); i++) {
        std::string key = keys[i];
        if (key == "transition") {
            JSValue value = JS_GetPropertyStr(ctx, obj, key.c_str());
            this->setTransition(ctx, value, style);
            JS_FreeValue(ctx, value);
            continue;
        }
    }

    lv_obj_add_style(this->instance, style, type);
    lv_obj_invalidate(this->instance);
};

BasicComponent::~BasicComponent () {
    if (this->transProps != nullptr) {
        free(this->transProps);
    }
    // do not del here, remove child will do the action
    // lv_obj_del(this->instance);
};