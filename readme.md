# lvgljs

Write [lvgl](https://github.com/lvgl/lvgl) with JavaScript. It uses React's virtual DOM concept to manipulate lvgl UI components, providing a familiar experience to users.

**Code**

<img src="./demo/screenshoot/code.png">

<br />

**Code Runing on Real Device**

<br />

## Table of Contents
---------------------
  - [lvgljs](#lvgljs)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Demo](#demo)
  - [Building](#building)
  - [Components](#components)
  - [Font](#font)
  - [Animation](#animation)
  - [Style](#style)
  - [JSAPI](#jsapi)
  - [Thanks](#thanks)

<br />

## Features
---------------------
- Support all lvgl built-in components
- Fully suport lvgl flex and grid style
- support most lvgl style，just write like html5 css
- support dynamic load image
- Fully support lvgl animation

## Demo
---------------------
### Widgets

<br />

### Calculator
![sdl_simulator](./demo/calculator/screenshoot/sdl_simulator.gif)

<br />

## building
---------------------
The following are developer notes on how to build lvgljs on your native platform. They are not complete guides, but include notes on the necessary libraries, compile flags, etc.

### lvgljs

- [ubuntu build Notes for sdl simulator](./doc/build/build-ubuntu-arm.md)
- [macos x86 build Notes for sdl simulator](./doc/build/build-macos-x86-simulator.md)
- [ubuntu build Notes for platform arm](./doc/build/build-ubuntu-x86-simualtor.md)

### JS Bundle
- [JS Bundle build Notes](./doc/build/js-bundle.md)

## Components
---------------------
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
---------------------
[Buitin-Symbol](./doc/Symbol/symbol.md)

## Animation
---------------------
[Animation](./doc/animate/animate.md)

## Style
---------------------
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
---------------------
- [network](./doc/jsapi/network.md)
- [filesystem](./doc/jsapi/fs.md)
- [dimension](./doc/jsapi/dimension.md)

## Thanks
---------------------
lvgljs depends on following excellent work

[lvgl](https://github.com/lvgl/lvgl): Create beautiful UIs for any MCU, MPU and display type
[QuickJS](https://bellard.org/quickjs/): JavaScript engine
[libuv](https://github.com/libuv/libuv): platform abstraction layer
[curl](https://github.com/curl/curl): HTTP client
[txiki.js](https://github.com/saghul/txiki.js): Tiny JavaScript runtime

