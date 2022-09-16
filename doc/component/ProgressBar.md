# Component ProgressBar mapping [lvgl lv_bar)](https://docs.lvgl.io/master/widgets/bar.html)

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
- [range](../props/range.md)
- [value](../props/value/2.md)
- [indicatorStyle](../props/indicatorStyle.md)

## Usage
```jsx
import { ProgressBar, Window } from 'lvlgjs-ui'
import { useState } from 'react'

function Component () {
    const [value, setValue] = useState(false)
    return (
        <Window>
            <ProgressBar
              style={style.progressBar}
              range={[0, 50]}
              value={30}
            />
        </Window>
    )
}

const style = {
    progressBar: {},
}
```

## Demo
test/progressbar
