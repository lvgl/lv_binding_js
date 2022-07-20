
#include "image.hpp"

static bool ispng (uint16_t* buf) {
    uint16_t GIF[4] = {0x5089, 0x474E, 0x0A0D, 0x0A1A};
    if (buf[0] == GIF[0] && buf[1] == GIF[1] && buf[2] == GIF[2] && buf[3] == GIF[3]) {
        return true;
    }
    return false;
};

Image::Image(std::string uid, lv_obj_t* parent): BasicComponent() {
    this->uid = uid;
    this->instance = lv_img_create(parent != nullptr ? parent : lv_scr_act());
    
    lv_obj_add_flag(this->instance, LV_OBJ_FLAG_EVENT_BUBBLE);
    
    this->initStyle();
};

void Image::setImageBinary(uint8_t* buf, size_t len) {
    if (!ispng((uint16_t*)(buf))) return;

    if (this->image_buf != nullptr) {
        free(this->image_buf);
        this->image_buf = nullptr;
    }

    this->image_buf = (uint8_t*)malloc(len);
    memcpy((void*)(this->image_buf), (void*)(buf), len);

    uint8_t* header = this->image_buf;
    header += 16;

    uint32_t width = header[0] << 12 | header[1] << 8 | header[2] << 4 | header[3];
    header += 4;
    uint32_t height = header[0] << 12 | header[1] << 8 | header[2] << 4 | header[3];
    printf("width is %d, height is %d", width, height);
    this->image_desc.header.always_zero = 0;
    this->image_desc.header.w = width;
    this->image_desc.header.h = height;
    this->image_desc.header.cf = LV_IMG_CF_RAW_ALPHA;
    this->image_desc.data_size = len;
    this->image_desc.data = this->image_buf;

    lv_img_set_src(this->instance, &this->image_desc);
};

Image::~Image () {
    if (this->image_buf != nullptr) {
        free(this->image_buf);
        this->image_buf = nullptr;
    }
}