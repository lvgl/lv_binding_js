# The Grid layout is a subset of [CSS Flexbox](https://css-tricks.com/snippets/css/complete-guide-grid/).

## Feature

### grid-template-columns
describe the size of columns
The property with the following value
- pixel value
- auto
- fr

### grid-template-rows
describe the size of rows 
The property with the following value
- pixel value
- auto
- fr

### justify-content
If there are some empty space the rows can be aligned several ways
The property with the following value
- start
- end
- center
- space-evenly
- space-around
- space-between

### align-items
If there are some empty space the column can be aligned several ways:
- start
- end
- center
- space-evenly
- space-around
- space-between

### grid-child
unlike html5 css grid, lvgljs grid child must set style like grid-child: true, otherwise the child will not in parent grid layout

### grid-column-pos
specifies a grid item's start position within the grid column

### grid-row-pos
specifies a grid item's start position within the grid row

### grid-row-span
specifies a grid item's row span

### grid-column-span
specifies a grid item's column span

### justify-self
determine how to align the children in its cell, with the following value
- start
- center
- end
- stretch

### align-self
determine how to align the children in its cell
- start
- center
- end
- stretch

## Usage
```js

```

## Demo
test/grid



