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
#### View
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
  - getBoundingClientRect

```jsx
import { View, EAlignType } from 'lvlgjs-ui'
import { useRef, useEffect } from 'react'

function Component () {
    const ref = useRef()
    useEffect(() => {
        console.log(ref.current.style.left)
    })

    return (
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
- src (support network url and local path)
- style
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
  - getBoundingClientRect
  
```jsx
import { Image } from 'lvlgjs-ui'

function Component () {
    const ref = useRef()
    useEffect(() => {
        console.log(ref.current.style.left)
    })

    return (
        <Image
            src={"./assets/1.png"}
        ></Image>
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
  - getBoundingClientRect

```jsx
import { Button, Text } from 'lvlgjs-ui'

function Component () {
    const ref = useRef()
    useEffect(() => {
        console.log(ref.current.style.left)
    })

    return (
        <Button
        >
            <Text>test</Text>
        </Button>
    )
}
```

### style

#### Position and Size (support absolute value、pixel values、percentage、auto)
- left
- top
- width
- height
  
```js
const style = {
    "width": 50%,
    "height": "100px",
    "left": 20,
    "top": "50px",
    "width": "auto"
}
```

#### Box Model
- padding
- padding-left、padding-right、padding-top、padding-bottom
- border-width、border-color、border-side
- outline-width、outline-color、outline-padding
  
```js
const style = {
    "padding": "20px",
    "padding": "20px 20px",
    "padding": "20px 20px 20px",
    "padding": "20px 20px 20px 20px",
    "padding-left": "100px",
    "border-color": "yellow",
    "border-side": "left",
    "outline-width": "50px",
    "outline-color": "green"
}
```

#### font
- font-size
- text-color
- letter-spacing
- text-overflow (ellipsis | clip | auto | scroll | circular)

```js
const style = {
    "font-size": "20px",
    "text-color": "blue",
    "letter-spacing": "3px",
    "text-overflow": "ellipsis"
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
- overflow-scrolling (auto | touch)
- overflow (hidden | scroll | auto)
```js
const style = {
    "overflow": "hidden",
    "overflow-scrolling": "auto"
}
```

#### spacing
set inner object row and column spacing
- row-spacing
- column-spacing