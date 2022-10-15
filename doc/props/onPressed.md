# Component prop onPressed

Prop onPressed mapping lvgl object event LV_EVENT_PRESSED

```ts
interface IEVENT_TYPE {
    target: componentInstance; // original target
    currentTarget: componentInstance; // current target object, not the original object
    stopPropagation: () => {}; // stop event bubble
}
```

## Value
onPressed callback with the following type
- IEVENT_TYPE[]
- IEVENT_TYPE
- null

## Usage
```jsx
import { View, Button, Text } from 'lvlgjs-ui'

function Component () {
    return (
         <View
            onScrollbarScrollingStyle={style.view}
            onPressed={[e => console.log(e.target), e => console.log(e.currentTarget)]}
        >
            <Button onPressed={e => e.stopPropagation()}>
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

