cmake_minimum_required(VERSION 2.8)

set(QUICKJS_PATH ./src/jsruntime/deps/quickjs)
set(LIBUV_PATH /home/sxs/libuv)
set(LV_CONF_PATH ${CMAKE_CURRENT_SOURCE_DIR}/src/deps/lv_conf.h CACHE INTERNAL "LV_CONF_PATH")

set(CMAKE_CXX_FLAGS "-O0 -Wall -g -ggdb -std=c++11")

if (${CMAKE_BUILD_PLATFORM} EQUAL "x86")
    set (CMAKE_C_COMPILER "gcc")
    set (CMAKE_CXX_COMPILER "g++")
elseif (${CMAKE_BUILD_PLATFORM} EQUAL "arm")
    set (CMAKE_C_COMPILER "arm-linux-gnueabihf-gcc")
    set (CMAKE_CXX_COMPILER "arm-linux-gnueabihf-g++")
endif()

# project(lv_png)
# add_subdirectory(./src/deps/lv_png)
add_subdirectory(./src/deps/curl EXCLUDE_FROM_ALL)
add_subdirectory(./src/deps/libuv EXCLUDE_FROM_ALL)
add_subdirectory(./src/jsruntime)
add_subdirectory(./src/deps/lvgl EXCLUDE_FROM_ALL)
add_subdirectory(./src/deps/lv_drivers EXCLUDE_FROM_ALL)
add_subdirectory(./src/render)

# target_include_directories(lv_png PUBLIC
#     ./src/deps
# )

add_executable(Main
    ./src/utils/utils.c
    ./src/engine/hal/mouse_cursor_icon.c
    ./src/engine/hal/hal.hpp
    ./src/engine/hal/hal.cpp
    ./src/engine/engine.cpp
)

if (${CMAKE_BUILD_TYPE} MATCHES "Debug")
target_compile_definitions(Main PUBLIC IS_DEV=1)
endif()

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

target_link_libraries(Main
    libcurl
    jsruntime
    uv_a
    dl
    pthread
    render
    lvgl
    lv_drivers
    ${SDL2_LIBRARIES}
)