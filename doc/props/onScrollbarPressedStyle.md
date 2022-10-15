# Component prop onScrollbarPressedStyle

Prop onScrollbarPressedStyle mapping lvgl object LV_PART_SCROLLBAR | LV_STATE_PRESSED style

## Value
support JS Object or JS Array

## Usage
```jsx
import { View, Button, Text } from 'lvlgjs-ui'

function Component () {
    return (
        <View
            onScrollbarPressedStyle={style.view}
        >
            <Button onScrollbarPressedStyle={[style.button1, style.button2]}>
                <Text>2222</Text>
            </Button>
        </View>
    )
}

const style = {
    view: {},
    button1: {},
    button2: {}
}
```