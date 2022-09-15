# Component prop onClick

Prop onClick mapping lvgl object event LV_EVENT_CLICKED 

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
import { View, Window, Button, Text } from 'lvlgjs-ui'

function Component () {
    return (
        <Window>
             <View
                onScrollbarScrollingStyle={style.view}
                onPressed={[e => console.log(e.target), e => console.log(e.currentTarget)]}
            >
                <Button onClick={e => e.stopPropagation()}>
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

