cmake_minimum_required(VERSION 2.8)

set(QUICKJS_PATH ./src/jsruntime/deps/quickjs)
set(LIBUV_PATH /home/sxs/libuv)
set(LV_CONF_PATH ${CMAKE_CURRENT_SOURCE_DIR}/src/deps/lv_conf.h CACHE INTERNAL "LV_CONF_PATH")

set(CMAKE_CXX_FLAGS "-O0 -Wall -g -ggdb -std=c++11")

project(lv_png)
add_subdirectory(./src/deps/lv_png)
add_subdirectory(./src/jsruntime)
add_subdirectory(./src/render)
add_subdirectory(./src/deps/lvgl)
add_subdirectory(./src/deps/lv_drivers)

target_include_directories(lv_png PUBLIC
    ./src/deps
)

add_executable(Main
    ./src/utils/utils.c
    ./src/engine/dev/mouse_cursor_icon.c
    ./src/engine/dev/monitor.cpp
    ./src/engine/engine.cpp
)

include_directories(
    ./src
    ./src/deps
    ./src/deps/lvgl
    ${LIBUV_PATH}/include
    ${QUICKJS_PATH}/include
    ./src/utils
    ./src/engine
    ./src/jsruntime
    ./src/render
)

find_package(SDL2 REQUIRED SDL2)
string(STRIP ${SDL2_LIBRARIES} SDL2_LIBRARIES)

target_link_libraries(Main jsruntime render dl pthread lvgl lvgl::drivers lv_png ${SDL2_LIBRARIES} ${CMAKE_CURRENT_SOURCE_DIR}/src/deps/lv_drivers/build/lib/liblv_drivers.a)