cmake_minimum_required(VERSION 2.8)

ADD_DEFINITIONS(-DDEBUG)
set(CMAKE_CXX_FLAGS "-O0 -Wall -g3 -ggdb -std=c++11")

set(ENGINE_PATH ../engine)
set(RUNTIME_PATH ../jsruntime)
set(LVJL_PATH ${CMAKE_CURRENT_SOURCE_DIR}/../deps/lvgl)
set(QUICKJS_PATH /home/sxs/quickjs-master/quickjs-master)

add_subdirectory(./deps/lv_png)

add_library(render SHARED
    ./native/core/style/style.cpp
    ./native/core/style/font/font.cpp
    ./native/core/event/click/click.cpp
    ./native/core/basic/comp.cpp
    ./native/core/event/event.cpp
    ./native/components/image/image.cpp
    ./native/components/image/image_wrap.cpp
    ./native/components/text/text.cpp
    ./native/components/text/text_wrap.cpp
    ./native/components/view/view.cpp
    ./native/components/view/view_wrap.cpp
    ./native/components/window/window.cpp
    ./native/components/window/window_wrap.cpp
    ./native/components/component.cpp
    ./native/bootstrap/render_bootstrap.cpp
)

include_directories(
    ${QUICKJS_PATH}
    ${RUNTIME_PATH}
    ${ENGINE_PATH}
    ${LVJL_PATH}
    ./deps/lv_png
    ../../src
    ../../src/deps
    ../render
    ./native
    ./core
    ./native/components
    ./native/core
    ./native/deps
)

target_link_libraries(render
    lv_png
)
