# lvgljs

Write [lvgl](https://github.com/lvgl/lvgl) with JavaScript. It uses React's virtual DOM concept to manipulate lvgl UI components, providing a familiar experience to users.

在这里放一张代码图和效果图

## Table of Contents
- [Features](#Features)
- [Screenshot](#Screenshot)
- [Build](#Build)
- [Components](#Components)

## Features
- Support all lvgl built-in components
- Fully suport lvgl flex and grid style
- support most lvgl style，just write like html5 css
- support dynamic load image
- Fully support lvgl animation

## Screenshot
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


#### View
props
- style
- onPressedStyle
- scrollbarStyle
- scrollbarScrollingStyle
- onClick
- onPressed
- onLongPressed
- onLongPressRepeat
- align
- alignTo

api
- style
  - left
  - top
  - width
  - height
- moveToFront
- setStyle
- moveToBackground
- scrollIntoView

```jsx
import { View, EAlignType, Window } from 'lvlgjs-ui'
import { useRef, useEffect } from 'react'

function Component () {
    const ref = useRef()
    useEffect(() => {
        console.log(ref.current.style.left)
    })

    return (
        <Window>
             <View
              style={style.view}
              onPressedStyle={style.viewPressed}
              onClick={e => { e.stopPropagation() }}
              onPressed={() => {}}
              onLongPressed={() => {}}
              onLongPressRepeat={() => {}}
              align={{
                  type: EAlignType.ALIGN_CENTER,
                  pos: [10, 0]
              }}
              ref={ref}
          ></View>
        </Window>
    )
}

const style = {
    view: {},
    viewPressed: {}
}
```


#### Image
Image format support: png

props
- src (support network url、local path、buildtin symbol)
- style
- onClick
- align
- alignTo

api
- style
  - left
  - top
  - width
  - height
- moveToFront
- setStyle
- moveToBackground
- scrollIntoView

  
```jsx
import { Image, Window } from 'lvlgjs-ui'
import { useRef } from 'react'

function Component () {
    const ref = useRef()
    useEffect(() => {
        console.log(ref.current.moveToFront())
    }, [])

    return (
       <Window>
           <Image
              src={"./assets/1.png"}
          ></Image>
          <Image
              src={"https://some_website/some_pic.png"}
          ></Image>
          <Image
              src={"audio"}
          ></Image>
       </Window>
    )
}
```

#### Button
props
- style
- onPressedStyle
- onClick
- onPressed
- onLongPressed
- onLongPressRepeat
- align
- alignTo

api
- style
  - left
  - top
  - width
  - height
- moveToFront
- setStyle
- moveToBackground
- scrollIntoView


```jsx
import { Button, Text, Image, Window } from 'lvlgjs-ui'
import { useRef, useState } from 'react'

function Component () {
    const ref = useRef()
    const [imageShow, setImageShow] = useState(false)
    useEffect(() => {
        console.log(ref.current.moveToFront())
    }, [])

    return (
        <Window>
            {imageShow && <Image
                alignTo={{
                    parent: ref.current,
                    type: EAlignType.ALIGN_CENTER,
                    pos: [10, 0]
                }}
            />}
            <Button
                ref={ref}
                style={style.button}
                onPressedStyle={style.onPressedStyle}
                onClick={() => setImageShow(true)}
                onPressed={() => console.log('button onPressed')}
                onLongPressed={() => console.log('button onPressed')}
                onLongPressRepeat={() => console.log('button onLongPressRepeat')}
          >
              <Text>test</Text>
          </Button>
        </Window>
    )
}

const style = {
    onPressedStyle: {},
    button: {},
}
```

#### Text、Textarea
Text is one-line，Textarea is multi-line

props
- style
- scrollbarStyle
- scrollbarScrollingStyle
- onPressedStyle
- onClick
- align
- alignTo
- placeholder

api
- style
  - left
  - top
  - width
  - height
- setStyle
- moveToFront
- moveToBackground
- scrollIntoView

```jsx
import { Text, Window } from 'lvlgjs-ui'

function Component () {
    return (
        <Window>
            <Text
              style={style.text}
              onPressedStyle={style.onPressedStyle}
              scrollbarStyle={style.scrollbarStyle}
              scrollbarScrollingStyle={style.scrollbarScrollingStyle}
              onClick={() => console.log('text click')}
          >
              some text
          </Text>
        </Window>
    )
}

const style = {
    text: {},
    onPressedStyle: {},
    scrollbarStyle: {}
    scrollbarScrollingStyle: {}
}
```

#### Input

props
- style
- align
- alignTo
- placeholder
- mode
- maxLength
- onChange
- onFocus
- value
- onFocusStyle

api
- style
  - left
  - top
  - width
  - height
- setStyle
- moveToFront
- moveToBackground
- scrollIntoView

```jsx
import { Input, Window } from 'lvlgjs-ui'
import { useState } from 'react'

function Component () {
    const [value, setValue] = useState()
    return (
        <Window>
            {/* controlled */}
            <Input
              style={style.input}
              onFocus={() => console.log('focus')}
              onFocusStyle={style.onFocusStyle}
              onChange={(e) => setValue(e.value)}
              mode="password"
              value={value}
            />
            {/* not controlled */}
            <Input
              style={style.input}
              onFocus={() => console.log('focus')}
              onFocusStyle={style.onFocusStyle}
              mode="password"
            />
        </Window>
    )
}

const style = {
    input: {},
    onFocusStyle: {}
}
```

#### Switch

props
- style
- checkedStyle
- align
- alignTo
- disabled
- checked
- onChange

api
- style
  - left
  - top
  - width
  - height
- setStyle
- moveToFront
- moveToBackground
- scrollIntoView

```jsx
import { Switch, Window } from 'lvlgjs-ui'
import { useState } from 'react'

function Component () {
    const [value, setValue] = useState()
    return (
        <Window>
            {/* controlled */}
            <Switch
              style={style.switch}
              onChange={(e) => setValue(e.checked)}
              checked={value}
              checkedStyle={style.checkedStyle}
            />
            {/* not controlled */}
            <Switch
              style={style.Switch}
              checkedStyle={style.checkedStyle}
              onChange={(e) => console.log(e)}
            />
        </Window>
    )
}

const style = {
    switch: {},
    checkedStyle: {}
}
```

#### Slider
props
- style
- scrollbarStyle
- onScrollbarPressedStyle
- indicatorStyle
- onIndicatorPressedStyle
- onPressedStyle
- knobStyle
- onKnobPressedStyle
- align
- alignTo
- onChange
- range
- value

api
- style
  - left
  - top
  - width
  - height
- setStyle
- moveToFront
- moveToBackground
- scrollIntoView

```jsx
import { Slider, Window } from 'lvlgjs-ui'
import { useState } from 'react'

function Component () {
    const [value, setValue] = useState()
    return (
        <Window>
            {/* controlled */}
            <Slider
              style={style.slider}
              onChange={(e) => setValue(e.value)}
              value={value}
              range={[0, 50]}
            />
            {/* not controlled */}
            <Slider
              style={style.slider}
              onChange={(e) => console.log(e)}
              range={[0, 100]}
            />
        </Window>
    )
}

const style = {
    slider: {},
}
```

#### Checkbox
props
- style
- checkedStyle
- indicatorStyle
- indicatorCheckedStyle
- align
- alignTo
- onChange
- disabled
- checked
- text

api
- style
  - left
  - top
  - width
  - height
- setStyle
- moveToFront
- moveToBackground
- scrollIntoView


```jsx
import { Checkbox, Window } from 'lvlgjs-ui'
import { useState } from 'react'

function Component () {
    const [value, setValue] = useState(false)
    return (
        <Window>
            {/* controlled */}
            <Checkbox
              style={style.checkbox}
              onChange={(e) => setValue(e.checked)}
              checked={value}
              text={"商品A"}
            />
            {/* not controlled */}
            <Checkbox
              style={style.checkbox}
              onChange={(e) => console.log(e.checked)}
              text={"商品B"}
              disabled={true}
              checked={true}
            />
        </Window>
    )
}

const style = {
    checkbox: {},
}
```

#### Dropdownlist
props
- style
- align
- alignTo
- items
- arrow
- selectIndex
- text
- direction
- highlightSelect
- onChange

api
- style
  - left
  - top
  - width
  - height
- setStyle
- moveToFront
- moveToBackground
- scrollIntoView

```js
import { Dropdownlist, Window, EDropdownListArrowDirection } from 'lvlgjs-ui'
import { useState } from 'react'

const items1 = [
    "Apple",
    "Banana",
    "Orange",
    "Cherry",
    "Grape",
    "Raspberry",
    "Melon",
    "Orange",
    "Lemon",
    "Nuts",
]

function Component () {
    const [value, setValue] = useState(false)
    return (
        <Window>
            <Dropdownlist
              style={style.dropdownlist}
              onChange={(e) => setValue(e.value)}
              items={items1}
              selectIndex={2}
              direction={}
              text={"Menu"}
              highlightSelect={false}
              arrow={EDropdownListArrowDirection.down}
            />
        </Window>
    )
}

const style = {
    dropdownlist: {},
}
```


#### ProgressBar
props
- style
- indicatorStyle
- align
- alignTo
- value
- range

api
- style
  - left
  - top
  - width
  - height
- setStyle
- moveToFront
- moveToBackground
- scrollIntoView

```js

import { ProgressBar, Window } from 'lvlgjs-ui'
import { useState } from 'react'

function Component () {
    const [value, setValue] = useState(false)
    return (
        <Window>
            <ProgressBar
              style={style.progressBar}
              range={[0, 50]}
              value={30}
            />
        </Window>
    )
}

const style = {
    progressBar: {},
}
```

#### Line
props
- style
- points
- align
- alignTo

api
- style
  - left
  - top
  - width
  - height
- setStyle
- moveToFront
- moveToBackground
- scrollIntoView

```js
import { Line, Window } from 'lvlgjs-ui'
import { useState } from 'react'

const points = [[5, 5], [70, 70], [120, 10], [180, 60], [240, 10]]

function Component () {
    const [value, setValue] = useState(false)
    return (
        <Window>
            <Line
              style={style.line}
              points={points}
            />
        </Window>
    )
}

const style = {
    Lilinene: {},
}
```

#### Roller
props
- style
- selectedStyle
- options
- selectIndex
- visibleRowCount
- onChange
- align
- alignTo

api
- style
  - left
  - top
  - width
  - height
- setStyle
- moveToFront
- moveToBackground
- scrollIntoView

```js
import { Roller, Window } from 'lvlgjs-ui'
import { useState } from 'react'

const items = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
]
function Component () {
    const [value, setValue] = useState(false)
    return (
        <Window>
            <Roller
              style={style.roller}
              options={items}
              selectIndex={2}
              visibleRowCount={4}
              onChange={(e) => {
                  console.log(e.value)
              }}
              infinity={true}
            />
        </Window>
    )
}

const style = {
    roller: {},
}
```

#### Keyboard
props
- style
- mode ("lower" | "upper" | "special" | "number") 
- textarea
- onChange
- align
- alignTo

api
- style
  - left
  - top
  - width
  - height
- setStyle
- moveToFront
- moveToBackground
- scrollIntoView

```js
import { Keyboard, Window, Input } from 'lvlgjs-ui'
import { useState, useRef } from 'react'

function Component () {
    const [didMount, setDidMount] = useState(false)
    const ref = useRef()

    useEffect(() => {
        setDidMount(true)
    }, [])

    return (
        <Window>
            <Input
                ref={ref}  
            />
            {didMount && <Keyboard
                style={style.keyboard}
                textarea={ref.current}
                mode={"number"}
            />}
        </Window>
    )
}

const style = {
    keyboard: {},
}
```

#### Calendar
props
- style
- onChange
- today
- shownMonth
- highLightDates
- align
- alignTo

api
- style
  - left
  - top
  - width
  - height
- setStyle
- moveToFront
- moveToBackground
- scrollIntoView

```js
import { Calendar, Render, Window, EAlignType } from 'lvgljs-ui';
import React, { useState } from 'react';

function App () {

    return (
        <Window style={style.window}>
            <Calendar
                today={"2022-10-1"}
                shownMonth={"2022-10"}
                highLightDates={[
                    "2022-10-10",
                    "2022-10-11",
                ]}
                align={{
                    type: EAlignType.ALIGN_CENTER,
                    pos: [0, 27]
                }}
                onChange={(e) => { console.log(e.value) }}
            />
        </Window>
    )
};

const style = {
    window: {
        'width': '480px',
        'height': '320px',
    },
    calendar: {
        'width': 185,
        'height': 185,
    }
};

Render.render(<App />);
```

### BuiltIn Symbol
all symbol as follows:

audio、video、list、ok、close、power、settings、home、download、drive、refresh、mute、volume_mid、volume_max、image、tint、prev、play、pause、stop、next、eject、left、right、plus、minus、eye_open、eye_close、warning、shuffle、up、down、loop、directory、upload、call、cut、copy、save、bars、envelope、charge、paste、bell、keyboard、gps、file、wifi、battery_full、battery_3、battery_2、battery_1、battery_empty、usb、bluetooth、trash、edit、backspace、sd_card、newline、dummy


### Animation
Animated focuses on control time-based animation execution

properties
- duration, required
- startValue, required
- endValue, required
- playBackDelay
- playBackTime
- repeatDelay
- repeatCount
- execCallback, required
- startCallback
- readyCallback
- delay
- easing ("linear" | "ease-in" | "ease-out" | "ease-in-out" | "overshoot" | "bounce" | "step")

```js
import { View, Render, Window, Text, Image, EAlignType, Animate, EAnimateEasingFunc } from 'lvgljs-ui';
import React, { useRef, useEffect } from 'react';

function App () {
    const ref = useRef()

    useEffect(() => {
        try {
            const animate = Animate.parallel([
                Animate.timing({
                    duration: 1000,
                    startValue: 0,
                    endValue: 400,
                    playBackDelay: 100,
                    playBackTime: 300,
                    repeatDelay: 500,
                    repeatCount: 0,
                    easing: 'linear'
                    startCallback: () => {
                        console.log('animate1 start')
                    },
                    readyCallback: () => {
                        console.log('animate1 ready')
                    },
                    execCallback: (value) => {
                        ref.current.setStyle({
                            left: value
                        })
                    },
                }),
                Animate.timing({
                    duration: 1000,
                    startValue: 10,
                    endValue: 50,
                    playBackDelay: 100,
                    playBackTime: 300,
                    repeatDelay: 500,
                    repeatCount: 0,
                    execCallback: (value) => {
                        ref.current.setStyle({
                            width: value,
                            height: value
                        })
                    },
                }),
            ])
            animate.start()
        } catch (e) {
            console.log(e)
        }
    }, [])

    return (
        <Window style={style.window}>
            <View
                style={style.ball}
                align={{
                    type: EAlignType.ALIGN_LEFT_MID
                }}
                ref={ref}
            />
        </Window>
    )
};

const style = {
    window: {
        'width': '480px',
        'height': '320px',
    },
    ball: {
        'background-color': 'red',
        'border-radius': 0x7FFF,
        'width': '20px',
        'height': '20px'
    }
};

Render.render(<App />);
```

### Style

#### Position and Size (support absolute value、pixel values、percentage、auto)
- left
- top
- width
- height

```js
const style = {
    "width": "50%" | "100px" | 100,
    "height": "100px",
    "left": 20,
    "top": "50px",
    "width": "auto",
}
```

#### Box Model
- padding
- padding-left、padding-right、padding-top、padding-bottom
- border-width、border-color、border-side、border-radius
- outline-width、outline-color、outline-padding
  
```js
const style = {
    "padding": "20px" | "20px 20px" | "20px 20px 20px" | "20px 20px 20px 20px",
    "padding-left": "100px" | 100,
    "border-color": "yellow",
    "border-side": "left" | "right" | "top" | "bottom" | "full" | "top-right" | "top-bottom" | "top-left" | "right-bottom" | "right-left" | "bottom-left",
    "border-width": 8,
    "border-radius": 10,
    "outline-width": "50px",
    "outline-color": "green"
}
```

#### font
- font-size
- text-color
- letter-spacing
- line-spacing
- text-overflow
- text-align
- text-decoration

```js
const style = {
    "font-size": "20px",
    "text-color": "blue",
    "letter-spacing": "3px",
    "line-spacing": "15px",
    "text-overflow": "ellipsis" | "clip" | "auto" | "scroll" | "circular",
    "text-align": "auto" | "left" | "center" | "right",
    "text-decoration": "none" | "underline" | "strikethrough"
}
```  

#### flex
must use with display: "flex", flex can not mixed with left or top
- flex-direction (row | column)
- flex-wrap (wrap | nowrap | reverse)
- justify-content (flex-start | flex-end | center | space-evenly | space-around | space-between)
- align-items (flex-start | flex-end | center | space-evenly | space-around | space-between)
- align-content (flex-start | flex-end | center | space-evenly | space-around | space-between)
- flex-grow
  
```js
const style = {
    "display": "flex",
    "flex-wrap": "wrap",
    "justify-content": "center",
    "align-items": "center",
    "align-content": "center",
    "flex-grow": 1
}
```

#### grid

#### opacity
- opacity
- img-opacity
- border-opacity
- outline-opacity
- recolor-opacity
- shadow-opacity
  
```js
const style = {
    "opacity": 0.2,
    "img-opacity": 0.5,
    "border-opacity": 0.7,
    "outline-opacity": 0,
    "recolor-opacity": 1
}
```

#### display 
none | flex | grid
```js
const style = {
    "display": "none",
    "display": "grid",
    "display": "flex",
}
```

#### recolor
used with component Image
```js
const style = {
    "recolor": "green",
}
```

#### scrolling
- overflow-scrolling
- overflow
- scroll-dir
- scroll-snap-x
- scroll-snap-y
- scroll-enable-snap
```js
const style = {
    "overflow": "hidden" | "scroll" | "auto",
    "overflow-scrolling": "auto" | "touch",
    "scroll-dir": "none" | "left" | "right" | "top" | "bottom" | "horizontal" | "all",
    "scroll-snap-x": "none" | "snap_start" | "snap_end" | "snap_center",
    "scroll-snap-y": "none" | "snap_start" | "snap_end" | "snap_center",
    "scroll-enable-snap": true | false
}
```

#### spacing
set inner object row and column spacing
- row-spacing
- column-spacing

#### background
supoort local image、buildtin symbol、online image
- background-image
- background-color
- background-grad-color
- background-grad-color-dir

```js
const style = {
    "background-image": "./assets/somepic.png" | "http://some_website/somepic.png" | "audio"
    "background-color": "black",
    "background-grad-color": "green",
    "background-grad-color-dir": "none" | "vertical" | "horizontal"
}
```

#### shadow
- shadow-width
- shadow-color
- shadow-offset-x
- shadow-offset-y
- shadow-spread

```js
const style = {
    "shadow-width": "8px"
    "shadow-color": "black",
    "shadow-offset-x": "4px",
    "shadow-offset-y": "4px",
    "shadow-spread": "2px"
}
```
