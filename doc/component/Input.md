# Component Input mapping [lvgl lv_textarea)](https://docs.lvgl.io/master/widgets/textarea.html)

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
- [placeholder](../props/placeholder.md)
- [mode](../props/mode.md)
- [maxLength](../props/maxLength.md)
- [onChange](../props/onChange/1.md)
- [onFocus](../props/onFocus.md)
- [value](../props/value/1.md)
- [onFocusStyle](../props/onFocusStyle.md)

## Note
- Input Component is One line mode lv_textarea

## Controlled Mode
Component Input support [controlled mode](https://krasimir.gitbooks.io/react-in-patterns/content/chapter-05/), achieve by onChange and value props  

## Usage
```jsx
import { Input, Window } from 'lvlgjs-ui'
import { useState } from 'react'

function Component () {
    const [value, setValue] = useState()
    return (
        <Window>
            {/* controlled */}
            <Input
              style={style.input}
              onFocus={() => console.log('focus')}
              onFocusStyle={style.onFocusStyle}
              onChange={(e) => setValue(e.value)}
              mode="password"
              value={value}
            />
            {/* not controlled */}
            <Input
              style={style.input}
              onFocus={() => console.log('focus')}
              onFocusStyle={style.onFocusStyle}
              mode="password"
            />
        </Window>
    )
}

const style = {
    input: {},
    onFocusStyle: {}
}
```

## Demo
test/textarea/1
