cmake_minimum_required(VERSION 2.8)

ADD_DEFINITIONS(-DDEBUG)
set(CMAKE_CXX_FLAGS "-O0 -Wall -g3 -ggdb -std=c++14")

set(ENGINE_PATH ../engine)
set(RUNTIME_PATH ../jsruntime)
set(LVJL_PATH ${CMAKE_CURRENT_SOURCE_DIR}/../deps/lvgl)
set(QUICKJS_PATH /home/sxs/quickjs-master/quickjs-master)

add_library(render STATIC
    ./native/core/style/style.cpp
    ./native/core/style/font/font.cpp
    ./native/core/event/value_change/value_change.cpp
    ./native/core/event/click/click.cpp
    ./native/core/event/focus/focus.cpp
    ./native/core/basic/comp.cpp
    ./native/core/event/event.cpp
    ./native/core/img/png/lodepng.cpp
    ./native/core/img/png/png.cpp
    ./native/core/img/img.cpp
    ./native/core/utils/utils.hpp
    ./native/core/animate/animate.cpp
    ./native/components/line/line.cpp
    ./native/components/line/line_wrap.cpp
    ./native/components/roller/roller.cpp
    ./native/components/roller/roller_wrap.cpp
    ./native/components/progressbar/progressbar.cpp
    ./native/components/progressbar/progressbar_wrap.cpp
    ./native/components/dropdownlist/dropdownlist.cpp
    ./native/components/dropdownlist/dropdownlist_wrap.cpp
    ./native/components/checkbox/checkbox.cpp
    ./native/components/checkbox/checkbox_wrap.cpp
    ./native/components/keyboard/keyboard.cpp
    ./native/components/keyboard/keyboard_wrap.cpp
    ./native/components/textarea/textarea.cpp
    ./native/components/textarea/textarea_wrap.cpp
    ./native/components/switch/switch.cpp
    ./native/components/switch/switch_wrap.cpp
    ./native/components/slider/slider.cpp
    ./native/components/slider/slider_wrap.cpp
    # ./native/components/image/lodepng.cpp
    ./native/components/button/button.cpp
    ./native/components/button/button_wrap.cpp
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
    ../../src
    ../../src/deps
    ../render
    ./native
    ./core
    ./native/components
    ./native/core
    ./native/deps
)

# target_link_libraries(render
# lv_png
# )
