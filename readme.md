# lvgljs
Write [LVGL](https://github.com/lvgl/lvgl) with JavaScript.
It uses React's virtual DOM concept to manipulate LVGL UI components, providing a familiar experience to users.

**Code**
<img src="./demo/screenshoot/code.png">

**Running on a real device**
<img src="./demo/screenshoot/real_device.jpg" style="transform: rotate(270deg)">

## Table of Contents
- [Features](#features)
- [Demo](#demo)
- [Building](#building)
- [Components](#components)
- [Font](#font)
- [Animation](#animation)
- [Style](#style)
- [JSAPI](#jsapi)
- [Thanks](#thanks)

## Features
- Support all lvgl built-in components
- Fully suport lvgl flex and grid style
- Support most lvgl style，just write like html5 css
- Support dynamic load image
- Fully support lvgl animation

## Demo
### Widgets
![sdl_simulator](./demo/widgets/screenshoot/sdl_simulator.gif)

### Calculator
![sdl_simulator](./demo/calculator/screenshoot/sdl_simulator.gif)

## Building
The following are developer notes on how to build lvgljs.\
It is recommended that you first work with the simulator and only then try
to compile for a target device.

### lvgljs
- [Simulator build notes](./doc/build/build-simulator.md)
- [Device build notes](./doc/build/build-device.md)

### JS Bundle
- [JS Bundle build notes](./doc/build/js-bundle.md)

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
lvgljs depends on following excellent work:

- [lvgl](https://github.com/lvgl/lvgl): Create beautiful UIs for any MCU, MPU and display type
- [txiki.js](https://github.com/saghul/txiki.js): Tiny JavaScript runtime
    - [QuickJS](https://github.com/quickjs-ng/quickjs/): JavaScript engine
    - [libuv](https://github.com/libuv/libuv): platform abstraction layer
    - [curl](https://github.com/curl/curl): HTTP client
