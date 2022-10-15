# Component Keyboard mapping [lvgl lv_keyboard)](https://docs.lvgl.io/master/widgets/keyboard.html)

It's used to realize a virtual keyboard to write texts into a Text area.

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
- [textarea](../props/textarea.md)
- [mode](../props/mode/2.md)

## Usage
```jsx
import { Keyboard, Input } from 'lvlgjs-ui'
import { useState, useRef } from 'react'

function Component () {
    const [didMount, setDidMount] = useState(false)
    const ref = useRef()

    useEffect(() => {
        setDidMount(true)
    }, [])

    return (
        <React.Fragment>
            <Input
                ref={ref}  
            />
            {didMount && <Keyboard
                style={style.keyboard}
                textarea={ref.current}
                mode={"number"}
            />}
        </React.Fragment>
    )
}

const style = {
    keyboard: {},
}
```

## Demo
test/keyboard
