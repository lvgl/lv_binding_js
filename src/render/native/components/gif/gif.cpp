
#include "gif.hpp"

GIF::GIF(std::string uid, lv_obj_t* parent): BasicComponent(uid) {
    this->type = COMP_TYPE_GIF;

    this->uid = uid;
    this->instance = lv_gif_create(parent != nullptr ? parent : GetWindowInstance());
    lv_group_add_obj(lv_group_get_default(), this->instance);

    lv_obj_clear_flag(this->instance, LV_OBJ_FLAG_SCROLL_ON_FOCUS);
    lv_obj_add_flag(this->instance, LV_OBJ_FLAG_EVENT_BUBBLE | LV_OBJ_FLAG_CLICKABLE);
    lv_img_set_size_mode(this->instance, LV_IMG_SIZE_MODE_REAL);
    lv_obj_set_user_data(this->instance, this);
    this->initStyle(LV_PART_MAIN);
};

void GIF::setGIFBinary(uint8_t* buf, size_t len) {
    uint8_t* prev_buf = this->gif_buf;
    lv_img_dsc_t_1* prev_desc = this->gif_desc;
    this->gif_desc = static_cast<lv_img_dsc_t_1*>(malloc(sizeof(lv_img_dsc_t_1)));
    uint8_t* img_data = GetImgDesc(buf, len, this->gif_desc);
    this->gif_buf = img_data;

    if (img_data != nullptr) {
        lv_gif_set_src(this->instance, this->gif_desc);
    }

    if (prev_buf != nullptr) {
        free(prev_buf);
    }
    if (prev_desc != nullptr) {
        free(prev_desc);
    }
};

GIF::~GIF () {
    if (this->gif_buf != nullptr) {
        free(this->gif_buf);
        this->gif_buf = nullptr;
    }
    if (this->gif_desc != nullptr) {
        free(this->gif_desc);
        this->gif_desc = nullptr;
    }
};

void GIF::initCompStyle (int32_t type) {
};
