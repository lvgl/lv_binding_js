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
    - type {color: string; data: number[]}[]
- bottomAxisData
    - type {color: string; data: number[]}[]
- rightAxisData
    - type {color: string; data: number[]}[]
- topAxisData
    - type {color: string; data: number[]}[]
- scatterData, set data when type is scatter
    - type {color: string; data: [number, number][]}[]
- leftAxisLabels, rightAxisLabels, topAxisLabels, bottomAxisLabels, add axis labels
    - type string[]
- leftAxisRange, rightAxisRange, topAxisRange, bottomAxisRange, set axis range
    - type [number, number]

## Props
- [style](../props/style.md)
- [onPressedStyle](../props/onPressedStyle.md)
- [indicatorStyle](../props/indicatorStyle.md)
- [itemStyle](../props/itemStyle.md)
- [onClick](../props/onClick.md)
- [onPressed](../props/onPressed.md)
- [onLongPressed](../props/onLongPressed.md)
- [onLongPressRepeat](../props/onLongPressRepeat.md)
- [align](../props/align.md)
- [alignTo](../props/alignTo.md)

## Usage
```jsx
import { Button, Text, Image } from 'lvlgjs-ui'
import { useRef, useState } from 'react'

function App () {

    return (
        <Chart
            style={style.chart}
            type={"bar"}
            pointNum={12}
            leftAxisRange={[0, 100]}
            rightAxisRange={[0, 400]}
            bottomAxisLabels={[
                'Jan',
                'Febr',
                'March',
                'Apr',
                'May',
                'Jun',
                'July',
                'Aug',
                'Sept',
                'Oct',
                'Nov',
                'Dec'
            ]}
            leftAxisOption={{
                majorLen: 10,
                minorLen: 5,
                majorNum: 6,
                minorNum: 2,
                drawSize: 50
            }}
            bottomAxisOption={{
                majorLen: 10,
                minorLen: 5,
                majorNum: 12,
                minorNum: 3,
                drawSize: 40
            }}
            rightAxisOption={{
                majorLen: 10,
                minorLen: 5,
                majorNum: 3,
                minorNum: 4,
                drawSize: 50
            }}
            leftAxisData={[
                {
                    color: '#00FA9A',
                    data: [
                        31,
                        66,
                        10,
                        89,
                        63,
                        56,
                        32,
                        35,
                        57,
                        85,
                        22,
                        58
                    ]
                },
            ]}
            rightAxisData={[
                {
                    color: '#008080',
                    data: [
                        92,
                        71,
                        61,
                        15,
                        21,
                        35,
                        35,
                        58,
                        31,
                        53,
                        33,
                        73
                    ]
                }
            ]}
            align={{
                type: EAlignType.ALIGN_CENTER,
            }}
        />
    )
};

const style = {
    chart: {
        'width': 200,
        'height': 150,
        'transform': 'scaleX(3)'
    }
};

const style = {
    onPressedStyle: {},
    button: {},
}
```

## Demo
test/button