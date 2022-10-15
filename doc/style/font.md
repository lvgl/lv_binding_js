# This style control the [Font](https://docs.lvgl.io/master/overview/font.html)

## font-size

support pixel value

### Usage
```jsx
const style = {
    "font-size": "20px",
}
```

<br />

## text-color
Sets the color of the Text Component

### Usage
```jsx
const style = {
    "text-color": "blue",
}
```

<br />

## letter-spacing
sets the horizontal spacing behavior between text characters

### Usage
```jsx
const style = {
    "letter-spacing": "3px",
}
```

<br />

## line-spacing
sets the horizontal spacing behavior between text line

### Usage
```jsx
const style = {
    "line-spacing": "3px",
}
```

<br />

## text-overflow
sets the desired behavior for an Text component's overflow

### Value
property with the following value 
- ellipsis, p the size and write dots at the end if the text is too long
- clip, Keep the size and clip the text out of it
- auto, Keep the object width, wrap the too long lines and expand the object height
- scroll, Keep the size and roll the text back and forth
- circular, Keep the size and roll the text circularly

### Usage
```jsx
const style = {
    "text-overflow": "clip",
}
```

<br />

## text-align
sets the horizontal alignment of Text Component content

### Value
property with the following value 
- auto 
- left
- center
- right

### Usage
```jsx
const style = {
    "text-align": "center",
}
```

<br />

## text-decoration
sets the orientation of the text characters in a line

### Value
property with the following value 
- none 
- underline
- strikethrough

### Usage
```jsx
const style = {
    "text-decoration": "underline",
}
```

<br />

## Demo
test/style/text