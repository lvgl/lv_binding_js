# Component Switch mapping [lvgl lv_switch)](https://docs.lvgl.io/master/widgets/switch.html)

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
- [disabled](../props/disabled.md)
- [checked](../props/checked.md)
- [onChange](../onChange/2.md)

## Usage
```jsx
import { Switch } from 'lvlgjs-ui'
import { useState } from 'react'

function Component () {
    const [value, setValue] = useState()
    return (
        <React.Fragment>
            {/* controlled */}
            <Switch
              style={style.switch}
              onChange={(e) => setValue(e.checked)}
              checked={value}
              checkedStyle={style.checkedStyle}
            />
            {/* not controlled */}
            <Switch
              style={style.Switch}
              checkedStyle={style.checkedStyle}
              onChange={(e) => console.log(e)}
            />
        </React.Fragment>
    )
}

const style = {
    switch: {},
    checkedStyle: {}
}
```

## Demo
test/switch/
