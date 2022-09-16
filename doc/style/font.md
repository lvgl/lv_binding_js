# This style control the [Font](https://docs.lvgl.io/master/overview/font.html)

## font-size

support pixel value



### Usage
```jsx
const style = {
    "width": "50%" | "100px" | 100,
    "height": "100px",
    "left": 20,
    "top": "50px",
    "width": "auto",
}
```

### Demo
test/style/size

<br />

## Layout

support flex、grid、absolute layout

display, property with following value
- [flex](./flex.md)
- [grid](./grid.md)

position, property with following value
- [absolute](https://docs.lvgl.io/master/overview/coords.html#flags?LV_OBJ_FLAG_FLOATING)

### Usage
```jsx
const style = {
    'position': 'absolute'
}
```

## Spacing

used to controll line、row spacing，support pixel value、absolute value

- [row-spacing](https://docs.lvgl.io/master/overview/style.html?highlight=lv_style_set_pad_row#_CPPv420lv_style_set_pad_rowP10lv_style_t10lv_coord_t)
- [column-spacing](https://docs.lvgl.io/master/overview/style.html?highlight=lv_style_set_pad_row#_CPPv423lv_style_set_pad_columnP10lv_style_t10lv_coord_t)

### Demo
test/scroll/3
