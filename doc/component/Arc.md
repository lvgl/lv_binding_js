# Component Arc mapping [lvgl lv_arc)](https://docs.lvgl.io/master/widgets/arc.html)

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
- [indicatorStyle](../props/indicatorStyle.md)
- [onIndicatorPressedStyle](../props/onIndicatorPressedStyle.md)
- [knobStyle](../props/knobStyle.md)
- [onKnobPressedStyle](../props/onKnobPressedStyle.md)
- [onChange](../props/onChange/3.md)
- [range](../props/range.md)
- [value](../props/value/2.md)
- startAngle, set [the start angle of the indicator arc](https://docs.lvgl.io/master/widgets/arc.html#angles), zero degree is at the middle right (3 o'clock) of the object and the degrees are increasing in clockwise direction
    - type Number (0-360)
- endAngle, set the end angle of the indicator arc
    - type Number (0-360)
- backgroundStartAngle, set the start angle of the background arc
    - type Number (0-360)
- backgroundEndAngle, set the end angle of the background arc
    - type Number (0-360)
- rotation, set [an offset to the zero degree position](https://docs.lvgl.io/master/widgets/arc.html#rotation)
    - type Number
- mode, controll [how the indicator arc is drawn between the range value](https://docs.lvgl.io/master/widgets/arc.html#modes), with following values
    - normal, symmetrical, reverse
- changeRate, limit [the max rate of the value change on click](https://docs.lvgl.io/master/widgets/arc.html#change-rate), in degrees per second
    - type Number

## Controlled Mode
Component Arc support [controlled mode](https://krasimir.gitbooks.io/react-in-patterns/content/chapter-05/), achieve by onChange and value props

## Usage
```jsx
import { Arc } from 'lvgljs-ui'
import { useState } from 'react'

function Component () {
    const [value, setValue] = useState(50)
    return (
        <React.Fragment>
            {/* controlled */}
            <Arc
              style={style.arc}
              onChange={(e) => setValue(e.value)}
              value={value}
              range={[0, 100]}
            />
            {/* not controlled */}
            <Arc
              style={style.arc}
              backgroundStartAngle={135}
              backgroundEndAngle={45}
              rotation={0}
              mode="normal"
              value={30}
              indicatorStyle={style.indicator}
              knobStyle={style.knob}
              onChange={(e) => console.log(e.value)}
            />
        </React.Fragment>
    )
}

const style = {
    arc: {
        width: 150,
        height: 150,
    },
    indicator: {},
    knob: {},
}
```
