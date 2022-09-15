# Component prop onFocus

Prop onFocus mapping lvgl object event LV_EVENT_FOCUSED 

```ts
interface PARAM_TYPE {
    target: componentInstance; // original target
    currentTarget: componentInstance; // current target object, not the original object
    stopPropagation: () => {}; // stop event bubble
}

interface CALLBACK_TYPE {
    (e: PARAM_TYPE): void;
}
```

## Value
onClick callback with the following type
- CALLBACK_TYPE[]
- CALLBACK_TYPE
- null

## Usage
```jsx
import { Input, Window } from 'lvlgjs-ui'
import { useState } from 'react'

function Component () {
    const [value, setValue] = useState()
    return (
        <Window>
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
