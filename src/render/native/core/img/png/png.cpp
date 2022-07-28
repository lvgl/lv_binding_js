#include "./png.hpp"

static int ispng (uint16_t* buf) {
    return 1;
    uint16_t GIF[4] = {0x5089, 0x474E, 0x0A0D, 0x0A1A};
    if (buf[0] == GIF[0] && buf[1] == GIF[1] && buf[2] == GIF[2] && buf[3] == GIF[3]) {
        return 1;
    }
    return 0;
};

static lv_res_t decoder_info(struct _lv_img_decoder_t* decoder, const void* src, lv_img_header_t* header) {
    const lv_img_dsc_t_1* img_dsc = (const lv_img_dsc_t_1*)src;
    if(img_dsc->type == IMAGE_TYPE_PNG) {
        header->always_zero = 0;
        header->cf = img_dsc->header.cf;       /*Save the color format*/
        header->w = img_dsc->header.w;         /*Save the color width*/
        header->h = img_dsc->header.h;         /*Save the color height*/
        return LV_RES_OK;
    }

    return LV_RES_INV;
};

void lv_png_init(void)
{
    lv_img_decoder_t * dec = lv_img_decoder_create();
    lv_img_decoder_set_info_cb(dec, decoder_info);
};