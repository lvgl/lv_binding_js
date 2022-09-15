Component Textarea mapping [lvgl lv_textarea)](https://docs.lvgl.io/master/widgets/textarea.html)

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
- [mode](../props/mode/1.md)
- [maxLength](../props/maxLength.md)
- [onChange](../props/onChange/1.md)
- [onFocus](../props/onFocus.md)
- [value](../props/value/1.md)
- [onFocusStyle](../props/onFocusStyle.md)
- [scrollbarStyle](../props/scrollbarStyle.md)
- [onScrollbarPressedStyle](../props/onScrollbarPressedStyle.md)
- [onScrollbarScrollingStyle](../props/onScrollbarScrollingStyle.md)

## Note
- Textarea Component is Multi line mode lv_textarea

## Controlled Mode
Component Textarea support [controlled mode](https://krasimir.gitbooks.io/react-in-patterns/content/chapter-05/), achieve by onChange and value props  

## Usage
```jsx
import { Textarea, Window } from 'lvlgjs-ui'
import { useState } from 'react'

function Component () {
    const [value, setValue] = useState()
    return (
        <Window>
            {/* controlled */}
            <Textarea
              style={style.textarea}
              onFocus={() => console.log('focus')}
              onFocusStyle={style.onFocusStyle}
              onChange={(e) => setValue(e.value)}
              mode="password"
              value={value}
            />
            {/* not controlled */}
            <Textarea
              style={style.textarea}
              onFocus={() => console.log('focus')}
              onFocusStyle={style.onFocusStyle}
              mode="password"
            />
        </Window>
    )
}

const style = {
    textarea: {},
    onFocusStyle: {}
}
```

## Demo
test/textarea
