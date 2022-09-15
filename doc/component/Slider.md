Component Slider mapping [lvgl lv_slider)](https://docs.lvgl.io/master/widgets/slider.html#overview)

## Api
- [style](../api/style.md)
- [moveToFront](../api/moveToFront.md)
- [moveToBackground](../api/moveToBackground.md)
- [setStyle](../api/setStyle.md)
- [scrollIntoView](../api/scrollIntoView.md)

## Props
- [style](../props/style.md)
- [align](../props/align.md)
- [alignTo](../props/alignTo.md)
- [onPressedStyle](../props/onPressedStyle.md)
- [scrollbarStyle](../props/scrollbarStyle.md)
- [onScrollbarPressedStyle](../props/onScrollbarPressedStyle.md)
- [onScrollbarScrollingStyle](../props/onScrollbarScrollingStyle.md)
- [indicatorStyle](../props/indicatorStyle.md)
- [onIndicatorPressedStyle](../props/onIndicatorPressedStyle.md)
- [knobStyle](../props/knobStyle.md)
- [onKnobPressedStyle](../props/onKnobPressedStyle.md)
- [onChange](../props/onChange/3.md)
- [range](../props/range.md)
- [value](../props/value/2.md)

## Controlled Mode
Component Slider support [controlled mode](https://krasimir.gitbooks.io/react-in-patterns/content/chapter-05/), achieve by onChange and value props  

## Usage
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

## Demo
test/slider
