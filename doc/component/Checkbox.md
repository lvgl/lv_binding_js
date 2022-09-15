Component Checkbox mapping [lvgl lv_checkbox)](https://docs.lvgl.io/master/widgets/checkbox.html)

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
- [checkedStyle](../props/checkedStyle.md)
- [indicatorStyle](../props/indicatorStyle.md)
- [indicatorCheckedStyle](../props/onIndicatorPressedStyle.md)
- [onChange](../props/onChange/2.md)
- [value](../props/value/2.md)
- [disabled](../props/disabled.md)
- [text](../props/text/1.md)

## Controlled Mode
Component Checkbox support [controlled mode](https://krasimir.gitbooks.io/react-in-patterns/content/chapter-05/), achieve by onChange and value props  

## Usage
```jsx
import { Checkbox, Window } from 'lvlgjs-ui'
import { useState } from 'react'

function Component () {
    const [value, setValue] = useState(false)
    return (
        <Window>
            {/* controlled */}
            <Checkbox
              style={style.checkbox}
              onChange={(e) => setValue(e.checked)}
              checked={value}
              text={"商品A"}
            />
            {/* not controlled */}
            <Checkbox
              style={style.checkbox}
              onChange={(e) => console.log(e.checked)}
              text={"商品B"}
              disabled={true}
              checked={true}
            />
        </Window>
    )
}

const style = {
    checkbox: {},
}
```

## Demo
test/checkbox
