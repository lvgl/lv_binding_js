# Used to describe style color

## RGB color model
The RGB color model defines a given color in the sRGB color space according to its red, green, and blue components

### Usage
support rgb, do not support rgba

```js
const style = {
    "background-color": "rgb(255,0,153)",
}
```

<br>

## Hex color
A notation for describing the hexadecimal color syntax of an sRGB color using its primary color components (red, green, blue) written as hexadecimal numbers

### Usage
Supports 3-digit, 4-digit, 6-digit, and 8-digit hexadecimal color formats:
- 3-digit: `#fff` (equivalent to `#ffffff`)
- 4-digit: `#fff3` (equivalent to `#ffffff33`, includes alpha channel)
- 6-digit: `#ff0099` (standard RGB color)
- 8-digit: `#ff009933` (RGB + Alpha channel, automatically sets corresponding opacity property)

```js
const style = {
    "background-color": "#ff0099",      // Standard color, will set background-opacity to 255
    "background-color": "#FFFFFF33",    // With opacity, automatically sets background-opacity
}
```

<br>

## Built-in colors
red、pink、purple、deep-purple、indigo、blue、light-color、cyan、teal、green、light-green、lime、yellow、amber、orange、deep-orange、brown、blue-grey、grey、white、black

### Usage

```js
const style = {
    "background-color": "red",
    "border-color": "orange"
}
```