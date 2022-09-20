# lvgljs

Write [lvgl](https://github.com/lvgl/lvgl) with JavaScript. It uses React's virtual DOM concept to manipulate lvgl UI components, providing a familiar experience to users.

在这里放一张代码图和效果图

## Table of Contents
- [Features](#Features)
- [Demo](#Demo)
- [Build](#Build)
- [Components](#Components)
- [Style](#Style)
- [Animation](#Animation)
- [Font](#Font)
- [JSAPI](#JSAPI)

## Features
- Support all lvgl built-in components
- Fully suport lvgl flex and grid style
- support most lvgl style，just write like html5 css
- support dynamic load image
- Fully support lvgl animation

## Demo

### Widgets
#### sdl_simulator
222
<br/>
### Calculator
#### sdl_simulator
![sdl_simulator](./demo/calculator/screenshoot/sdl_simulator.gif)

#### real-device


## Build
### Unix

#### use sdl simulate

Once you have installed openssl、sdl2、curl，you can run follwing script compile lvgljs with sdl simulator

```shell
make dev-x86
./dev_x86/Main ./demo/calculator/index.js
```

#### real device
- First you have to download openssl、curl source code and compile with divece arch
- Fill in CMAKE_BUILD_PLATFORM、CMAKE_C_COMPILER、CMAKE_CXX_COMPILER、CMAKE_CURL_LIB、CMAKE_CURL_INCLUDE_DIRS、CMAKE_SSL_LIB、CMAKE_CRYPTO_LIB in Makefile
- you can run follwing script compile lvgljs with device arch (default arm)
- copy executable file ./some_dir/Main and ./some_dir/lib in divece file-system, make sure file Main and dir lib in same dir

```shell
make dev-x86 or make build-x86
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

## JSAPI
[network](./doc/jsapi/network.md)
[filesystem](./doc/jsapi/fs.md)