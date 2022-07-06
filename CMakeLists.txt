cmake_minimum_required(VERSION 2.8)

set(QUICKJS_PATH ./src/jsruntime/deps/quickjs)
set(LIBUV_PATH /home/sxs/libuv)

set(CMAKE_CXX_FLAGS "-O0 -Wall -g -ggdb -std=c++11")

add_subdirectory(./src/jsruntime)
# add_subdirectory(render)

add_executable(Main
    ./src/utils/utils.c
    ./src/engine/engine.cpp
)

include_directories(
    ./src
    ${LIBUV_PATH}/include
    ${QUICKJS_PATH}/include
    ./src/utils
    ./src/engine
    ./src/jsruntime
)

target_link_libraries(Main runtime dl pthread)