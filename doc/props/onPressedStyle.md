# Component prop onPressedStyle

Prop onPressedStyle mapping lvgl object LV_STATE_PRESSED style

## Value
support JS Object or JS Array

## Usage
```jsx
import { View, Window, Button, Text } from 'lvlgjs-ui'

function Component () {
    return (
        <Window>
             <View
                onPressedStyle={style.view}
            >
                <Button onPressedStyle={[style.button1, style.button2]}>
                    <Text>2222</Text>
                </Button>
            </View>
        </Window>
    )
}

const style = {
    view: {},
    button1: {},
    button2: {}
}
```