# MacOS Build Guide

This guide describes how to build lvgljs in x86 macos and running with SDL simulator

## Preparation

### 1. Install Homebrew Dependencies
```bash
brew install cmake curl openssl sdl2
```

### 2. Git SubModules
run following code in lvgljs project
```bash
git submodule update --init --recursive
```

### 3. Install npm modules
```
npm i
```

## Build lvgljs
```
make dev-macos
```

## Running lvgljs
should now be available at ./dev_macos/lvgljs and ./dev_macos/lib, run the following in your terminal to run demo in sdl2 simulator

```bash
./dev_macos/lvgljs ./demo/widgets/index.js
```

