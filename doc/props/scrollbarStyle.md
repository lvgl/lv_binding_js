# Component prop scrollbarStyle

Prop scrollbarStyle mapping lvgl object LV_PART_SCROLLBAR style

## Value
support JS Object or JS Array

## Usage
```jsx
import { View, Button, Text } from 'lvlgjs-ui'

function Component () {
    return (
             <View
                scrollbarStyle={style.view}
            >
                <Button scrollbarStyle={[style.button1, style.button2]}>
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