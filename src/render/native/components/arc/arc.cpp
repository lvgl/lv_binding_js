#include "arc.hpp"

Arc::Arc(std::string uid, lv_obj_t* parent): BasicComponent(uid) {
    this->type = COMP_TYPE_ARC;

    this->uid = uid;
    this->instance = lv_arc_create(parent != nullptr ? parent : GetWindowInstance());
    lv_group_add_obj(lv_group_get_default(), this->instance);

    lv_obj_remove_flag(this->instance, LV_OBJ_FLAG_SCROLL_ON_FOCUS);
    lv_obj_add_flag(this->instance, LV_OBJ_FLAG_EVENT_BUBBLE | LV_OBJ_FLAG_CLICK_FOCUSABLE);
    lv_obj_set_user_data(this->instance, this);
    this->initStyle(LV_PART_MAIN);
};

void Arc::setRange (int32_t min, int32_t max) {
    lv_arc_set_range(this->instance, min, max);
};

void Arc::setValue (int32_t value) {
    lv_arc_set_value(this->instance, value);
};

void Arc::setStartAngle (int32_t value) {
    lv_arc_set_start_angle(this->instance, value);
};

void Arc::setEndAngle (int32_t value) {
    lv_arc_set_end_angle(this->instance, value);
};

void Arc::setBackgroundStartAngle (int32_t value) {
    lv_arc_set_bg_start_angle(this->instance, value);
};

void Arc::setBackgroundEndAngle (int32_t value) {
    lv_arc_set_bg_end_angle(this->instance, value);
};

void Arc::setRotation (int32_t value) {
    lv_arc_set_rotation(this->instance, value);
};

void Arc::setMode (int32_t mode) {
    lv_arc_set_mode(this->instance, mode);
};

void Arc::setChangeRate (int32_t value) {
    lv_arc_set_change_rate(this->instance, value);
};

void Arc::setArcImage (uint8_t* buf, size_t buf_len, int32_t style_type, std::string& symbol) {
    lv_img_dsc_t_1* img_desc;
    lv_img_dsc_t_1* old_img_desc = nullptr;
    std::string old_image_symbol;
    std::string image_symbol;
    const uint8_t* prev_buf = nullptr;

    this->ensureStyle(style_type);
    lv_style_t* style = this->style_map.at(style_type);

    if (buf != nullptr) {
        if (this->image_desc_map.find(style_type) != this->image_desc_map.end()) {
            old_img_desc = this->image_desc_map.at(style_type);
        }
        if (old_img_desc != nullptr) {
            prev_buf = old_img_desc->data;
        }
        img_desc = static_cast<lv_img_dsc_t_1*>(malloc(sizeof(lv_img_dsc_t_1)));
        image_desc_map[style_type] = img_desc;

        if (buf != nullptr) {
            uint8_t* img_data = GetImgDesc(buf, buf_len, img_desc);
            if (img_data != nullptr) {
                img_desc->data = img_data;
                lv_style_set_arc_image_src(style, img_desc);
            }
        } else {
            lv_style_set_arc_image_src(style, NULL);
        }

        this->image_desc_map[style_type] = img_desc;

        if (prev_buf != nullptr) {
            free((void*)(prev_buf));
        }
        if (old_img_desc != nullptr) {
            free(old_img_desc);
        }
    } else {
        if (this->symbol_map.find(style_type) != this->symbol_map.end()) {
            image_symbol = this->symbol_map.at(style_type);
        }
        this->symbol_map[style_type] = symbol;

        lv_style_set_arc_image_src(style, this->symbol_map[style_type].c_str());
    }

    lv_obj_invalidate(this->instance);
};

void Arc::initCompStyle (int32_t type) {
};
