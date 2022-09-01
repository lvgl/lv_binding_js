cmake_minimum_required(VERSION 2.8)

set(LIBUV_PATH /home/sxs/libuv)

find_package(CURL REQUIRED)

add_subdirectory(./deps/quickjs EXCLUDE_FROM_ALL)

file(GLOB SRC_LIST ./*.c ./*.cpp)
add_library(libsjs STATIC ${SRC_LIST})

string(TOLOWER ${CMAKE_SYSTEM_NAME} SJSPLATFORM)
target_compile_definitions(libsjs PUBLIC SJSPLATFORM="${SJSPLATFORM}")

add_custom_command(OUTPUT libruntime.a
    COMMAND ar crsT libruntime.a $<TARGET_FILE:libsjs>
    DEPENDS libsjs qjs)

add_custom_target(_runtime ALL DEPENDS libruntime.a)

add_library(jsruntime STATIC IMPORTED GLOBAL)
set_target_properties(jsruntime
    PROPERTIES IMPORTED_LOCATION ${CMAKE_CURRENT_BINARY_DIR}/libruntime.a
)

add_custom_command(OUTPUT bundle.js
    COMMAND npm run bundle -- --outfile=${PROJECT_BINARY_DIR}/bundle.js
)
add_custom_target(jsbundle ALL DEPENDS bundle.js)

add_dependencies(jsruntime _runtime)

target_link_libraries(jsruntime INTERFACE
    qjs
    -lrt 
    -lcrypto 
    -lssl 
    ${CMAKE_CURRENT_BINARY_DIR}/libruntime.a
)

execute_process(COMMAND cp -r ${CMAKE_CURRENT_SOURCE_DIR}/lib ${CMAKE_BINARY_DIR})

include_directories(
    ../deps/libuv/include
    ./deps/quickjs/include
    ./
    ../utils
    ../deps/curl/include
)