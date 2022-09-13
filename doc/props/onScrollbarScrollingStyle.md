# Component prop onScrollbarScrollingStyle

Prop onScrollbarScrollingStyle mapping lvgl object LV_PART_SCROLLBAR | LV_STATE_PRESSED style

## Value
support JS Object or JS Array

## Usage
```jsx
import { View, Window, Button, Text } from 'lvlgjs-ui'

function Component () {
    return (
        <Window>
             <View
                onScrollbarScrollingStyle={style.view}
            >
                <Button onScrollbarScrollingStyle={[style.button1, style.button2]}>
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