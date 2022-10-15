# Ubuntu Build Guide

This guide describes how to build lvgljs in Ubuntu System and running with SDL simulator, target architectures is x86

## Preparation

### 1. OpenSSL
```bash
sudo apt-get install openssl

sudo apt-get install libssl-dev
```

### 2. Curl
```bash
sudo apt install curl
```

### 3. SDL2
```bash
sudo apt-get install libsdl2-2.0

sudo apt-get install libsdl2-dev
```

### 4. CMAKE
```bash
sudo apt install cmake
```

## Build lvgljs
After preparation, you are ready to compile. Run the following in your terminal to compile Bitcoin Core
```bash
make dev-x86
```

## Running lvgljs
should now be available at ./dev_x86/lvgljs and ./dev_x86/lib, run the following in your terminal to run demo in sdl2 simulator

```bash
./dev_x86/lvgljs ./demo/widgets/index.js
```

