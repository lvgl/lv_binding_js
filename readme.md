# lvgljs

Write [lvgl](https://github.com/lvgl/lvgl) with JavaScript. It uses React's virtual DOM concept to manipulate lvgl UI components, providing a familiar experience to users.

**Code**

<img src="./demo/screenshoot/code.png">

<br />

**Code Runing on Real Device**

<br />

## Table of Contents
  - [lvgljs](#lvgljs)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Demo](#demo)
    - [Widgets](#widgets)
    - [Calculator](#calculator)
  - [Usage](#usage)
    - [use sdl simulate](#use-sdl-simulate)
    - [Real Device](#real-device)
  - [Components](#components)
  - [Font](#font)
  - [Animation](#animation)
  - [Style](#style)
  - [JSAPI](#jsapi)
  - [Thanks](#thanks)

<br />

## Features
- Support all lvgl built-in components
- Fully suport lvgl flex and grid style
- support most lvgl style，just write like html5 css
- support dynamic load image
- Fully support lvgl animation

## Demo

### Widgets

<br />

### Calculator
![sdl_simulator](./demo/calculator/screenshoot/sdl_simulator.gif)

<br />

## Usage
- lvgl configuration file lv_conf.h and lv_drv_conf are located in src/deps
- project support x86 and arm platform currently, if you want to build on other platform, please configure Makefile
### SDL Simulate

- Once you have installed openssl、sdl2、curl，you can run follwing script compile and run

```shell
make dev-x86

./dev_x86/Main ./demo/widgets/index.js
```

### Real Device like MCU
- Edit src/engine/hal/release/release.cpp based on your device, please check [lvgl document](https://docs.lvgl.io/latest/en/html/porting/index.html) for more detal
- You have to download openssl、curl source code and compile with divece arch
- Fill in CMAKE_BUILD_PLATFORM、CMAKE_C_COMPILER、CMAKE_CXX_COMPILER、CMAKE_CURL_LIB、CMAKE_CURL_INCLUDE_DIRS、CMAKE_SSL_LIB、CMAKE_CRYPTO_LIB in Makefile
- You can run follwing script compile lvgljs with device arch (default arm)
- Copy executable file ./build_output_dir/Main and ./build_output_dir/lib and user JS file in divece file-system, make sure file Main and dir lib in same dir
- turn on the mcu, and run the script just like in simualtor

```shell
make dev-arm or make build-arm
```

## Components
- [View](./doc/component/View.md)
- [Image](./doc/component/Image.md)
- [Button](./doc/component/Button.md)
- [Text](./doc/component/Text.md)
- [Input](./doc/component/Input.md)
- [Textarea](./doc/component/Textarea.md)
- [Switch](./doc/component/Switch.md)
- [Checkbox](./doc/component/Checkbox.md)
- [Dropdownlist](./doc/component/Dropdownlist.md)
- [ProgressBar](./doc/component/ProgressBar.md)
- [Line](./doc/component/Line.md)
- [Roller](./doc/component/Roller.md)
- [Keyboard](./doc/component/Keyboard.md)
- [Calendar](./doc/component/Calendar.md)
- [Chart](./doc/component/Chart.md)

## Font
[Buitin-Symbol](./doc/Symbol/symbol.md)

## Animation
[Animation](./doc/animate/animate.md)

## Style
- [position-size-layout](./doc/style/position-size-layout.md)
- [boxing-model](./doc/style/boxing-model.md)
- [color](./doc/style/color.md)
- [flex](./doc/style/flex.md)
- [grid](./doc/style/grid.md)
- [font](./doc/style/font.md)
- [opacity](./doc/style/opacity.md)
- [display](./doc/style/display.md)
- [background](./doc/style/background.md)
- [scroll](./doc/style/scroll.md)
- [shadow](./doc/style/shadow.md)
- [recolor](./doc/style/recolor.md)
- [line](./doc/style/line.md)
- [transition](./doc/style/transition.md)
- [transform](./doc/style/transform.md)

## JSAPI
- [network](./doc/jsapi/network.md)
- [filesystem](./doc/jsapi/fs.md)
- [dimension](./doc/jsapi/dimension.md)

## Thanks
lvgljs depends on following excellent work

[lvgl](https://github.com/lvgl/lvgl): Create beautiful UIs for any MCU, MPU and display type
[QuickJS](https://bellard.org/quickjs/): JavaScript engine
[libuv](https://github.com/libuv/libuv): platform abstraction layer
[curl](https://github.com/curl/curl): HTTP client
[txiki.js](https://github.com/saghul/txiki.js): Tiny JavaScript runtime

