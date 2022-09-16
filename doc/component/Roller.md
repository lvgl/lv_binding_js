# Component Dropdownlist mapping [lvgl lv_roller)](https://docs.lvgl.io/master/widgets/roller.html)

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
- [selectedStyle](../props/selectedStyle.md)
- infinity
  - makes the roller circular
- options
  - value type: string[]
- selectIndex
  - current select item index in items array
- visibleRowCount
  - The number of visible rows
- [onChange](../props/onChange/1.md)
## Controlled Mode
Component Checkbox support [controlled mode](https://krasimir.gitbooks.io/react-in-patterns/content/chapter-05/), achieve by selectIndex and onChange props  

## Usage
```jsx
import { Roller, Window } from 'lvlgjs-ui'
import { useState } from 'react'

const items = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
]
function Component () {
    const [value, setValue] = useState(false)
    return (
        <Window>
            <Roller
              style={style.roller}
              options={items}
              selectIndex={2}
              visibleRowCount={4}
              onChange={(e) => {
                  console.log(e.value)
              }}
              infinity={true}
            />
        </Window>
    )
}

const style = {
    roller: {},
}
```

## Demo
test/roller
