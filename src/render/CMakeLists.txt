cmake_minimum_required(VERSION 2.8)

ADD_DEFINITIONS(-DDEBUG)
set(CMAKE_CXX_FLAGS "-O0 -Wall -g -ggdb")

set(ENGINE_PATH ../engine)
set(RUNTIME_PATH ../jsruntime)
set(LVJL_PATH ../deps/lvgl)
set(QUICKJS_PATH /home/sxs/quickjs-master/quickjs-master)

add_library(render SHARED
    ./native/core/basic/comp.cpp
    ./native/components/view/view.cpp
    ./native/components/view/view_wrap.cpp
)

include_directories(
    ${QUICKJS_PATH}
    ${RUNTIME_PATH}
    ${ENGINE_PATH}
    ./native
    ./core
    ./native/components
    ./native/core
    ./native/deps
)