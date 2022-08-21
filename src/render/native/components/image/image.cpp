
#include "image.hpp"

Image::Image(std::string uid, lv_obj_t* parent): BasicComponent() {
    this->type = COMP_TYPE_IMAGE;

    this->uid = uid;
    this->instance = lv_img_create(parent != nullptr ? parent : lv_scr_act());
    
    lv_obj_add_flag(this->instance, LV_OBJ_FLAG_EVENT_BUBBLE | LV_OBJ_FLAG_CLICKABLE);
    lv_obj_set_user_data(this->instance, this);
    this->initStyle(LV_PART_MAIN);
};

void Image::setImageBinary(uint8_t* buf, size_t len) {
    // uint8_t* img_data = NULL;
    // uint32_t width;
    // uint32_t height;
    // IMAGE_TYPE image_type = IMAGE_TYPE_UNKNOWN;

    // if (ispng((uint16_t*)(buf))) {
    //     uint32_t error = lodepng_decode32(&img_data, &width, &height, (unsigned char*)buf, len);
    //     if(error) {
    //         if(img_data != NULL) {
    //             lodepng_free(img_data);
    //         }
    //         printf("error %u: %s\n", error, lodepng_error_text(error));
    //         return;
    //     }
    //     convert_color_depth(img_data,  width * height);
    //     image_type = IMAGE_TYPE_PNG;
    // }

    // if (image_type == IMAGE_TYPE_UNKNOWN) {
    //     LV_LOG_USER("Image type unknown");
    //     return;
    // }
    uint8_t* prev_buf = this->image_buf;
    lv_img_dsc_t_1* prev_desc = this->image_desc;
    this->image_desc = static_cast<lv_img_dsc_t_1*>(malloc(sizeof(lv_img_dsc_t_1)));
    uint8_t* img_data = GetImgDesc(buf, len, image_desc);
    this->image_buf = img_data;
    // this->image_desc->type = image_type;

    // this->image_desc->header.always_zero = 0;
    // this->image_desc->header.w = width;
    // this->image_desc->header.h = height;
    // this->image_desc->header.cf = LV_IMG_CF_TRUE_COLOR_ALPHA;
    // this->image_desc->data_size = width * height * LV_IMG_PX_SIZE_ALPHA_BYTE;
    // this->image_desc->data = this->image_buf;

    lv_img_set_src(this->instance, this->image_desc);

    if (prev_buf != nullptr) {
        free(prev_buf);
    }
    if (prev_desc != nullptr) {
        free(prev_desc);
    }
};

Image::~Image () {
    if (this->image_buf != nullptr) {
        free(this->image_buf);
        this->image_buf = nullptr;
    }
    if (this->image_desc != nullptr) {
        free(this->image_desc);
        this->image_desc = nullptr;
    }
};

void Image::initCompStyle (int32_t type) {
};