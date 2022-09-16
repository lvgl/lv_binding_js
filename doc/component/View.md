# Component View mapping [lvgl Base object (lv_obj)](https://docs.lvgl.io/master/widgets/obj.html)

## Api
- [style](../api/style.md)
- [moveToFront](../api/moveToFront.md)
- [moveToBackground](../api/moveToBackground.md)
- [setStyle](../api/setStyle.md)
- [scrollIntoView](../api/scrollIntoView.md)

## Props
- [style](../props/style.md)
- [onPressedStyle](../props/onPressedStyle.md)
- [scrollbarStyle](../props/scrollbarStyle.md)
- [onScrollbarPressedStyle](../props/onScrollbarPressedStyle.md)
- [onScrollbarScrollingStyle](../props/onScrollbarScrollingStyle.md)
- [onClick](../props/onClick.md)
- [onPressed](../props/onPressed.md)
- [onLongPressed](../props/onLongPressed.md)
- [onLongPressRepeat](../props/onLongPressRepeat.md)
- [align](../props/align.md)
- [alignTo](../props/alignTo.md)

## Usage
```jsx
import { View, EAlignType, Window, Button, Text } from 'lvlgjs-ui'
import { useRef, useEffect } from 'react'

function Component () {
    const ref = useRef()
    useEffect(() => {
        console.log(ref.current.style.left)
    })

    return (
        <Window>
             <View
                style={style.view}
                onPressedStyle={style.viewPressed}
                onClick={e => { e.stopPropagation() }}
                onPressed={() => {}}
                onLongPressed={() => {}}
                onLongPressRepeat={() => {}}
                align={{
                    type: EAlignType.ALIGN_CENTER,
                    pos: [10, 0]
                }}
                ref={ref}
            >
                <Button>
                    <Text>2222</Text>
                </Button>
            </View>
        </Window>
    )
}

const style = {
    view: {},
    viewPressed: {}
}
```

