cmake_minimum_required(VERSION 2.8)

find_package(CURL REQUIRED)

add_subdirectory(./deps/quickjs EXCLUDE_FROM_ALL)

file(GLOB SRC_LIST ./*.c ./*.cpp)
add_library(jsruntime STATIC ${SRC_LIST})

string(TOLOWER ${CMAKE_SYSTEM_NAME} SJSPLATFORM)
target_compile_definitions(jsruntime PUBLIC SJSPLATFORM="${SJSPLATFORM}")

add_custom_command(OUTPUT bundle.js
    COMMAND npm run bundle -- --outfile=${PROJECT_BINARY_DIR}/bundle.js
)
add_custom_target(jsbundle ALL DEPENDS bundle.js)

target_link_libraries(jsruntime PUBLIC
    qjs
    -lrt
)

execute_process(COMMAND cp -r ${CMAKE_CURRENT_SOURCE_DIR}/lib ${CMAKE_BINARY_DIR})

if (${CMAKE_BUILD_PLATFORM} MATCHES x86)
    find_package(CURL REQUIRED)
    string(STRIP ${CURL_INCLUDE_DIRS} CURL_INCLUDE_DIRS)
    include_directories(
        ../deps/libuv/include
        ./deps/quickjs/include
        ./
        ../utils
        ${CURL_INCLUDE_DIRS}
    )
elseif (${CMAKE_BUILD_PLATFORM} MATCHES arm)
    include_directories(
        ../deps/libuv/include
        ./deps/quickjs/include
        ./
        ../utils
        ${CMAKE_CURL_INCLUDE_DIRS}
    )
endif()