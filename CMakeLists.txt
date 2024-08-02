cmake_minimum_required(VERSION 3.16)

project(lvgljs LANGUAGES C CXX)

set(CMAKE_EXPORT_COMPILE_COMMANDS ON)
set(LV_CONF_PATH ${CMAKE_CURRENT_SOURCE_DIR}/deps/lv_conf.h CACHE INTERNAL "LV_CONF_PATH")

set(BUILD_NATIVE OFF CACHE BOOL "Build wasm3 with native support")

find_path(LVGL_PATH lvgl.h PATHS ${CMAKE_CURRENT_SOURCE_DIR}/deps PATH_SUFFIXES lvgl)

add_executable(lvgljs
    src/engine/engine.cpp
    src/render/native/core/style/style.cpp
    src/render/native/core/style/font/font.cpp
    src/render/native/core/event/value_change/value_change.cpp
    src/render/native/core/event/normal/normal.cpp
    src/render/native/core/event/select/select.cpp
    src/render/native/core/event/click/click.cpp
    src/render/native/core/refresh/refresh.cpp
    src/render/native/core/utils/utils.cpp
    src/render/native/core/theme/theme.cpp
    src/render/native/core/dimensions/dimensions.cpp
    src/render/native/core/basic/comp.cpp
    src/render/native/core/event/event.cpp
    src/render/native/core/img/png/lodepng.cpp
    src/render/native/core/img/png/png.cpp
    src/render/native/core/img/gif/gif.cpp
    src/render/native/core/img/img.cpp
    src/render/native/core/utils/utils.hpp
    src/render/native/core/animate/animate.cpp
    src/render/native/components/arc/arc.cpp
    src/render/native/components/arc/arc_wrap.cpp
    src/render/native/components/mask/mask.cpp
    src/render/native/components/mask/mask_wrap.cpp
    src/render/native/components/gif/gif.cpp
    src/render/native/components/gif/gif_wrap.cpp
    src/render/native/components/chart/chart.cpp
    src/render/native/components/chart/chart_wrap.cpp
    src/render/native/components/tabview/tabview.cpp
    src/render/native/components/tabview/tabview_wrap.cpp
    src/render/native/components/calendar/calendar.cpp
    src/render/native/components/calendar/calendar_wrap.cpp
    src/render/native/components/line/line.cpp
    src/render/native/components/line/line_wrap.cpp
    src/render/native/components/roller/roller.cpp
    src/render/native/components/roller/roller_wrap.cpp
    src/render/native/components/progressbar/progressbar.cpp
    src/render/native/components/progressbar/progressbar_wrap.cpp
    src/render/native/components/dropdownlist/dropdownlist.cpp
    src/render/native/components/dropdownlist/dropdownlist_wrap.cpp
    src/render/native/components/checkbox/checkbox.cpp
    src/render/native/components/checkbox/checkbox_wrap.cpp
    src/render/native/components/keyboard/keyboard.cpp
    src/render/native/components/keyboard/keyboard_wrap.cpp
    src/render/native/components/textarea/textarea.cpp
    src/render/native/components/textarea/textarea_wrap.cpp
    src/render/native/components/switch/switch.cpp
    src/render/native/components/switch/switch_wrap.cpp
    src/render/native/components/slider/slider.cpp
    src/render/native/components/slider/slider_wrap.cpp
    # src/render/native/components/image/lodepng.cpp
    src/render/native/components/button/button.cpp
    src/render/native/components/button/button_wrap.cpp
    src/render/native/components/image/image.cpp
    src/render/native/components/image/image_wrap.cpp
    src/render/native/components/text/text.cpp
    src/render/native/components/text/text_wrap.cpp
    src/render/native/components/view/view.cpp
    src/render/native/components/view/view_wrap.cpp
    src/render/native/components/window/window.cpp
    # src/render/native/components/window/window_wrap.cpp
    src/render/native/components/component.cpp
    src/render/native/bootstrap/render_bootstrap.cpp
)

if(${CMAKE_BUILD_TYPE} MATCHES Simulator)
    set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -O0 -Wall -g -ggdb -std=c++14")
    set(BUILD_WITH_MIMALLOC OFF) # TODO: SDL and mimalloc don't play well together
    add_definitions(-DIS_SIM)
    target_sources(lvgljs PRIVATE
        src/engine/hal/simulator/simulator.cpp
        src/engine/hal/simulator/mouse_cursor_icon.c
    )
else()
    set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -O3 -Wall -std=c++14")
    add_definitions(-DIS_DEVICE)
    target_sources(lvgljs PRIVATE
        src/engine/hal/device/device.cpp
    )
endif()

add_subdirectory(deps/txiki EXCLUDE_FROM_ALL)
add_subdirectory(deps/lvgl EXCLUDE_FROM_ALL)

target_include_directories(lvgljs PUBLIC
    ${LVGL_PATH}
    deps
    src/
    src/engine
    src/engine/hal
    src/engine/hal/device
    src/render
    src/render/native
    src/render/native/bootstrap
    src/render/native/components
    src/render/native/core
)

target_link_libraries(lvgljs PUBLIC
    tjs
    lvgl
)

if(${CMAKE_BUILD_TYPE} MATCHES Simulator)
    find_package(SDL2 REQUIRED)
    target_link_libraries(lvgljs PUBLIC ${SDL2_LIBRARIES})
endif()
