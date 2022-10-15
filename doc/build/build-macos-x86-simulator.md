# Ubuntu Build Guide

This guide describes how to build lvgljs in x86 macos and running with SDL simulator

## Preparation

### 1. OpenSSL
```bash
brew install openssl
```

### 2. Curl
```bash
brew install curl
```

### 3. SDL2
```bash
brew install sdl2
```

### 4. CMAKE
```bash
brew install cmake
```

### 5. Git SubModules
run following code in lvgljs project
```bash
git submodule update --init --recursive
```

## Build lvgljs
cmake can not find openssl install by homebrew, so we have to specify openssl path to cmake

1. First run following script get openssl dir path
``` bash
echo $(brew --prefix openssl)
```

2. pass OPENSSL_ROOT_DIR and OPENSSL_LIBRARIES variable to Makefile with openssl path get in step 1, for example

```cmake
dev-x86:
	@mkdir -p $(DEV_X86)
	cmake -B "$(DEV_X86)" \
		-DCMAKE_BUILD_TYPE=Debug \
		-DCMAKE_BUILD_PLATFORM=x86 \
		-DOPENSSL_ROOT_DIR=/usr/local/opt/openssl@3 \
		-DOPENSSL_LIBRARIES=/usr/local/opt/openssl@3/lib
	cmake --build $(DEV_X86)
```

3. now you can compile, run following script
```bash
make dev-x86
```

## Running lvgljs
should now be available at ./dev_x86/lvgljs and ./dev_x86/lib, run the following in your terminal to run demo in sdl2 simulator

```bash
./dev_x86/lvgljs ./demo/widgets/index.js
```

