# The Flexbox (or Flex for short) is a subset of [CSS Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/).

## Feature

### flex-direction
sets how flex items are placed in the flex container defining the main axis and the direction (normal or reversed).
The property with the following value
- row
- column

### flex-wrap
sets whether flex items are forced onto one line or can wrap onto multiple lines. If wrapping is allowed, it sets the direction that lines are stacked.
The property with the following value
- wrap
- nowrap
- reverse

### justify-content
defines how the browser distributes space between and around content items along the main-axis of a flex container, and the inline axis of a grid container.
The property with the following value
- flex-start
- flex-end
- center
- space-evenly
- space-around
- space-between

### align-items
sets the align-self value on all direct children as a group. In Flexbox, it controls the alignment of items on the Cross Axis. The property with the following value
- flex-start
- flex-end
- center
- space-evenly
- space-around
- space-between

### align-content
sets the distribution of space between and around content items along a flexbox's cross-axis
- flex-end
- center
- space-evenly
- space-around
- space-between

### flex-grow
sets the flex grow factor of a flex item's main size. value must be int and > 1

## Usage
```js
const parent = {
    "display": "flex",
    "flex-wrap": "wrap",
    "justify-content": "center",
    "align-items": "center",
    "align-content": "center",
}

const child1 = {
    "flex-grow": 2
}

const child2 = {
    "flex-grow": 1
}
```

## Demo
test/flex



