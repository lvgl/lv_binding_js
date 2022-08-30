# lvgljs

Write [lvgl](https://github.com/lvgl/lvgl) with JavaScript. It uses React's virtual DOM concept to manipulate lvgl UI components, providing a familiar experience to users.

在这里放一张代码图和效果图

## Features
- Fully support all lvgl components and most of their api
- Fully suport lvgl flex and grid style
- support most lvgl style，just write like html5 css
- support dynamic load image
- Fully support lvgl animation


## Documentation
### component
- like css Pseudo classes, lvgljs components support style bind with state like onPressedStyle、onFocusStyle
- support get component pos and size
- support lvgl align
- like css z-index, moveToFront、moveToBackground can controll component layer
- scrollIntoView, just like html5 scrollIntoView
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

### BuiltIn Symbol
all symbol as follows:

audio、video、list、ok、close、power、settings、home、download、drive、refresh、mute、volume_mid、volume_max、image、tint、prev、play、pause、stop、next、eject、left、right、plus、minus、eye_open、eye_close、warning、shuffle、up、down、loop、directory、upload、call、cut、copy、save、bars、envelope、charge、paste、bell、keyboard、gps、file、wifi、battery_full、battery_3、battery_2、battery_1、battery_empty、usb、bluetooth、trash、edit、backspace、sd_card、newline、dummy


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
