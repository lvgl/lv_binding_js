# Component prop disabled

Prop disabled used in component Switch、Checkbox

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
