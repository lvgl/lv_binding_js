# Component prop textarea

Prop textarea usually use in component Keyboard

## Value
some textarea、input's componentInstance

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