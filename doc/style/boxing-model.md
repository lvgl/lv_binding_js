# Follows the html css [border-box model](https://developer.mozilla.org/en-US/docs/Web/CSS/box-sizing)

<img src="https://docs.lvgl.io/master/_images/boxmodel.png" />

<br />

## Padding
sets the padding area on all four sides of an element, with the following property

- padding
- padding-left
- padding-right
- padding-top
- padding-bottom

### Usage
```js
const style1 = {
    "padding": "20px"
}

const style3 = {
    "padding": "20ox 30px"
}

const style4 = {
    "padding": "20ox 30px 10px"
}

const style5 = {
    "padding": "20ox 30px 10px 50px"
}

const style2 = {
    "padding-left": "100px",
    "padding-bottom": 300,
    "padding-right": 20,
    "padding-top": "30px"
}
```

<br>

## Border
sets an element's border, with the following property

- border-width, sets the width of an element's border
- border-color, set the color of an element's border
- border-side, set the shown side of the border, with the following value
- left、right、top、bottom、full、"top-right"、"top-bottom"、"top-left"、"right-bottom"、"right-left"、"bottom-left"
- border-radius, set the rounds the corners of an element's outer border edge

### Usage
```js
const style = {
    "border-side": "left" or "right" or "top" or "bottom" or "full" or "top-right" or "top-bottom" or "top-left" or "right-bottom" or "right-left" or "bottom-left",
    "border-width": 8,
    "border-radius": 10,
    "border-color": "black"
}
```

### Demo
test/style/border

<br>

## Outline
sets an element's outline, with the following property

- outline-width
- outline-color
- outline-padding
- outline-opacity

### Usage
```js
const style = {
    "outline-width": "5px",
    "outline-color": "green",
    "outline-padding": 2,
    "outline-opacity": 0.4
}
```

### Demo
test/style/outline
