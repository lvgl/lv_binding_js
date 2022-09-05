#include "./gif.hpp"

bool isgif (uint16_t* buf) {
    uint16_t GIF[2] = {0x4947, 0x3846 };
    if (buf[0] == GIF[0] && buf[1] == GIF[1]) {
        return true;
    }
    return false;
};

void GetGIFInfo (uint8_t* buf, uint32_t* width, uint32_t* height) {
    char* data = buf;
    data += 6;

    *width = data[0] << 8 | data[1]; 
    data += 2;
    *height = data[0] << 8 | data[1];
};