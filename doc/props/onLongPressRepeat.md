# Component prop onLongPressRepeat

Prop onLongPressRepeat mapping lvgl object event LV_EVENT_LONG_PRESSED_REPEAT

```ts
interface IEVENT_TYPE {
    target: componentInstance; // original target
    currentTarget: componentInstance; // current target object, not the original object
    stopPropagation: () => {}; // stop event bubble
}
```

## Value
onLongPressRepeat callback with the following type
- IEVENT_TYPE[]
- IEVENT_TYPE
- null

## Usage
```jsx
import { View, Window, Button, Text } from 'lvlgjs-ui'

function Component () {
    return (
        <Window>
             <View
                onScrollbarScrollingStyle={style.view}
                onLongPressRepeat={[e => console.log(e.target), e => console.log(e.currentTarget)]}
            >
                <Button onLongPressRepeat={e => e.stopPropagation()}>
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

