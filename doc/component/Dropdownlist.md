Component Dropdownlist mapping [lvgl lv_dropdown)](https://docs.lvgl.io/master/widgets/dropdown.html)

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
- items
  - value type: string[]
- arrow
  - value type: enum EDropdownListArrowDirection
- selectIndex
  - current select item index in items array
- [text](../props/text/2.md)
- direction
  - value type: enum EDropdownlistDirection
`- highlightSelect
  - highlight current select item
- [onChange](../props/onChange/1.md)
## Controlled Mode
Component Checkbox support [controlled mode](https://krasimir.gitbooks.io/react-in-patterns/content/chapter-05/), achieve by selectIndex and onChange props  

## Usage
```jsx
import { Dropdownlist, Window, EDropdownListArrowDirection, EDropdownlistDirection } from 'lvlgjs-ui'
import { useState } from 'react'

const items1 = [
    "Apple",
    "Banana",
    "Orange",
    "Cherry",
    "Grape",
    "Raspberry",
    "Melon",
    "Orange",
    "Lemon",
    "Nuts",
]

function Component () {
    const [value, setValue] = useState(false)
    return (
        <Window>
            <Dropdownlist
              style={style.dropdownlist}
              onChange={(e) => setValue(e.value)}
              items={items1}
              selectIndex={2}
              direction={EDropdownlistDirection.bottom}
              text={"Menu"}
              highlightSelect={false}
              arrow={EDropdownListArrowDirection.down}
            />
        </Window>
    )
}

const style = {
    dropdownlist: {},
}
```

## Demo
test/dropdownlist
