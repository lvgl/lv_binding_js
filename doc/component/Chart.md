# Component Chart mapping [lvgl lv_chart)](https://docs.lvgl.io/master/widgets/chart.html)

## Api
- [style](../api/style.md)
- [moveToFront](../api/moveToFront.md)
- [moveToBackground](../api/moveToBackground.md)
- [setStyle](../api/setStyle.md)
- [scrollIntoView](../api/scrollIntoView.md)
- type, controll [display types](https://docs.lvgl.io/master/widgets/chart.html#chart-type), with following values
    - none, line, bar, scatter
- divLineCount, controll [the number of horizontal and vertical division lines](https://docs.lvgl.io/master/widgets/chart.html#division-lines)
    - type Array[horizontalDiv, verticalDiv]
- pointNum, controll [the number of points in the series](https://docs.lvgl.io/master/widgets/chart.html#number-of-points)
    - type Number
- leftAxisOption, controll [left axis ticks and labels](https://docs.lvgl.io/master/widgets/chart.html#tick-marks-and-labels), with following property
    - majorLen
    - minorLen
    - majorNum
    - minorNum
    - drawSize
- rightAxisOption, controll [right axis ticks and labels](https://docs.lvgl.io/master/widgets/chart.html#tick-marks-and-labels), with following property
    - majorLen
    - minorLen
    - majorNum
    - minorNum
    - drawSize
- topAxisOption, controll [top axis ticks and labels](https://docs.lvgl.io/master/widgets/chart.html#tick-marks-and-labels), with following property
    - majorLen
    - minorLen
    - majorNum
    - minorNum
    - drawSize
- bottomAxisOption, controll [bottom axis ticks and labels](https://docs.lvgl.io/master/widgets/chart.html#tick-marks-and-labels), with following property
    - majorLen
    - minorLen
    - majorNum
    - minorNum
    - drawSize
- leftAxisData, [add left series to the charts](https://docs.lvgl.io/master/widgets/chart.html#data-series)
    - type number[]
- bottomAxisData, 
- rightAxisData
- topAxisData

## Props
- [style](../props/style.md)
- [onPressedStyle](../props/onPressedStyle.md)
- [onClick](../props/onClick.md)
- [onPressed](../props/onPressed.md)
- [onLongPressed](../props/onLongPressed.md)
- [onLongPressRepeat](../props/onLongPressRepeat.md)
- [align](../props/align.md)
- [alignTo](../props/alignTo.md)

## Usage
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

## Demo
test/button