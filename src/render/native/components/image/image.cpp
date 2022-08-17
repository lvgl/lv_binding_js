
#include "image.hpp"

static bool ispng (uint16_t* buf) {
    uint16_t GIF[4] = {0x5089, 0x474E, 0x0A0D, 0x0A1A};
    if (buf[0] == GIF[0] && buf[1] == GIF[1] && buf[2] == GIF[2] && buf[3] == GIF[3]) {
        return true;
    }
    return false;
};

static void convert_color_depth(uint8_t * img, uint32_t px_cnt)
{
#if LV_COLOR_DEPTH == 32
    lv_color32_t * img_argb = (lv_color32_t*)img;
    lv_color_t c;
    lv_color_t * img_c = (lv_color_t *) img;
    uint32_t i;
    for(i = 0; i < px_cnt; i++) {
        c = lv_color_make(img_argb[i].ch.red, img_argb[i].ch.green, img_argb[i].ch.blue);
        img_c[i].ch.red = c.ch.blue;
        img_c[i].ch.blue = c.ch.red;
    }
#elif LV_COLOR_DEPTH == 16
    lv_color32_t * img_argb = (lv_color32_t*)img;
    lv_color_t c;
    uint32_t i;
    for(i = 0; i < px_cnt; i++) {
        c = lv_color_make(img_argb[i].ch.blue, img_argb[i].ch.green, img_argb[i].ch.red);
        img[i*3 + 2] = img_argb[i].ch.alpha;
        img[i*3 + 1] = c.full >> 8;
        img[i*3 + 0] = c.full & 0xFF;
    }
#elif LV_COLOR_DEPTH == 8
    lv_color32_t * img_argb = (lv_color32_t*)img;
       lv_color_t c;
       uint32_t i;
       for(i = 0; i < px_cnt; i++) {
           c = lv_color_make(img_argb[i].red, img_argb[i].green, img_argb[i].blue);
           img[i*2 + 1] = img_argb[i].alpha;
           img[i*2 + 0] = c.full
       }
#endif
}

Image::Image(std::string uid, lv_obj_t* parent): BasicComponent() {
    this->type = COMP_TYPE_IMAGE;

    this->uid = uid;
    this->instance = lv_img_create(parent != nullptr ? parent : lv_scr_act());
    
    lv_obj_add_flag(this->instance, LV_OBJ_FLAG_EVENT_BUBBLE | LV_OBJ_FLAG_CLICKABLE);
    lv_obj_set_user_data(this->instance, this);
    this->initStyle(LV_PART_MAIN);
};

void Image::setImageBinary(uint8_t* buf, size_t len) {
    uint8_t* img_data = NULL;
    uint32_t width;
    uint32_t height;
    IMAGE_TYPE image_type = IMAGE_TYPE_UNKNOWN;

    if (ispng((uint16_t*)(buf))) {
        uint32_t error = lodepng_decode32(&img_data, &width, &height, (unsigned char*)buf, len);
        if(error) {
            if(img_data != NULL) {
                lodepng_free(img_data);
            }
            printf("error %u: %s\n", error, lodepng_error_text(error));
            return;
        }
        convert_color_depth(img_data,  width * height);
        image_type = IMAGE_TYPE_PNG;
    }

    if (image_type == IMAGE_TYPE_UNKNOWN) {
        LV_LOG_USER("Image type unknown");
        return;
    }
    
    uint8_t* prev_buf = this->image_buf;
    lv_img_dsc_t_1* prev_desc = this->image_desc;
    this->image_buf = img_data;
    this->image_desc = static_cast<lv_img_dsc_t_1*>(malloc(sizeof(lv_img_dsc_t_1)));
    this->image_desc->type = image_type;

    this->image_desc->header.always_zero = 0;
    this->image_desc->header.w = width;
    this->image_desc->header.h = height;
    this->image_desc->header.cf = LV_IMG_CF_TRUE_COLOR_ALPHA;
    this->image_desc->data_size = width * height * LV_IMG_PX_SIZE_ALPHA_BYTE;
    this->image_desc->data = this->image_buf;

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
}