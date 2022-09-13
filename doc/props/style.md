# Component prop style

Prop style mapping lvgl object LV_PART_MAIN style

## Value
support JS Object or JS Array

## Usage
```jsx
import { View, Window, Button, Text } from 'lvlgjs-ui'

function Component () {
    return (
        <Window>
             <View
                style={style.view}
            >
                <Button style={[style.button1, style.button2]}>
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