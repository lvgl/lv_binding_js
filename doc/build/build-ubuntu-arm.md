# Ubuntu Build Guide

This guide describes how to build lvgljs in Ubuntu System and running with arm MCU

## Preparation

### 1. Arm Cross Compiler
The first step is to make sure you have arm cross compiler tools like arm-linux-gnueabihf-

### 2. OpenSSL
After run following script, you will see libcrypto.so, libssl.so, libssl.so.3, libcrypto.so.3 in ./build_arm, make sure copy them in your device file system

```bash
git clone https://github.com/openssl/openssl

make clean

./Configure linux-armv4 --cross-compile-prefix=arm-linux-gnueabihf- --prefix=$(pwd)/build_arm

make install
```

### 3. Curl
After run following script, you will see libcurl.so libcurl.so.4 libcurl.so.4.8.0 in ./build_arm, make sure copy them in your device file system

```bash
autoreconf

./configure --prefix=$PWD/build_arm/ --host=arm --enable-shared --enable-static --with-openssl=openssl_path/build_arm/ CC=arm-linux-gnueabihf-gcc CXX=arm-linux-gnueabihf-g++

make

make install
```

### 4. CMAKE
```bash
sudo apt install cmake
```

### 5. Git SubModules
run following code in lvgljs project
```bash
git submodule update --init --recursive
```

## Build lvgljs
1. change the CMAKE_CXX_COMPILER && CMAKE_C_COMPILER path in Makefile
2. change the CMAKE_CURL_LIB, CMAKE_CURL_INCLUDE_DIRS, CMAKE_SSL_LIB, CMAKE_CRYPTO_LIB in Makefile
3. lvgl configuration file lv_conf.h and lv_drv_conf are located in src/deps, edit them to suit your device
4. modify displays, device, custom_tick in ./src/engine/hal/device
```bash
make dev-arm
```

## Running lvgljs
should now be available at ./dev_arm/lvgljs and ./dev_arm/lib, run the following script in your device

```bash
./dev_x86/lvgljs ./demo/widgets/index.js
```

