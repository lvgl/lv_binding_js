# Component prop textarea

Prop textarea usually use in component Keyboard

## Value
some textarea、input's componentInstance

## Usage
```jsx
import { Keyboard, Window, Input } from 'lvlgjs-ui'
import { useState, useRef } from 'react'

function Component () {
    const [didMount, setDidMount] = useState(false)
    const ref = useRef()

    useEffect(() => {
        setDidMount(true)
    }, [])

    return (
        <Window>
            <Input
                ref={ref}  
            />
            {didMount && <Keyboard
                style={style.keyboard}
                textarea={ref.current}
                mode={"number"}
            />}
        </Window>
    )
}

const style = {
    keyboard: {},
}
```

## Demo
test/keyboard