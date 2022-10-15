# Component prop placeholder

Prop placeholder usually use in component Slider

## Value
type is array with two number

## Usage
```jsx
import { Slider } from 'lvlgjs-ui'
import { useState } from 'react'

function Component () {
    const [value, setValue] = useState()
    return (
        <React.Fragment>
            {/* controlled */}
            <Slider
              style={style.slider}
              onChange={(e) => setValue(e.value)}
              value={value}
              range={[0, 50]}
            />
            {/* not controlled */}
            <Slider
              style={style.slider}
              onChange={(e) => console.log(e)}
              range={[0, 100]}
            />
        </React.Fragment>
    )
}

const style = {
    slider: {},
}

```

## Demo
test/slider/1