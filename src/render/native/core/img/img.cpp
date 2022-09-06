#include "./img.hpp"

uint8_t* GetImgDesc (uint8_t* buf, size_t len, lv_img_dsc_t_1* image_desc) {
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
            return nullptr;
        }
        convert_color_depth(img_data,  width * height);
        image_type = IMAGE_TYPE_PNG;
    } else if (isgif((uint16_t*)(buf))) {
        image_type = IMAGE_TYPE_GIF;
        GetGIFInfo(buf, &width, &height);
        img_data = (uint8_t*)malloc(len);
        memcpy(img_data, buf, len);
    }

    if (image_type == IMAGE_TYPE_UNKNOWN) {
        LV_LOG_USER("Image type unknown");
        return nullptr;
    }
    
    lv_img_dsc_t_1* prev_desc = image_desc;
    image_desc->type = image_type;

    image_desc->header.always_zero = 0;
    image_desc->header.w = width;
    image_desc->header.h = height;
    image_desc->header.cf = LV_IMG_CF_TRUE_COLOR_ALPHA;
    image_desc->data_size = width * height * LV_IMG_PX_SIZE_ALPHA_BYTE;
    image_desc->data = img_data;

    return img_data;
};