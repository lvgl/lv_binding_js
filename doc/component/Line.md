# Component Line mapping [lvgl lv_line)](https://docs.lvgl.io/master/widgets/line.html)

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
- points
  - value type: [number, number][]
## Usage
```jsx
import { Line } from 'lvlgjs-ui'
import { useState } from 'react'

const points = [[5, 5], [70, 70], [120, 10], [180, 60], [240, 10]]

function Component () {
    const [value, setValue] = useState(false)
    return (
          <Line
            style={style.line}
            points={points}
          />
    )
}

const style = {
    line: {},
}
```

## Demo
test/line
