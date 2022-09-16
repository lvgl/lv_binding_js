# Component Button mapping [lvgl lv_btn)](https://docs.lvgl.io/master/widgets/btn.html)

## Api
- [style](../api/style.md)
- [moveToFront](../api/moveToFront.md)
- [moveToBackground](../api/moveToBackground.md)
- [setStyle](../api/setStyle.md)
- [scrollIntoView](../api/scrollIntoView.md)

## Props
- [style](../props/style.md)
- [onPressedStyle](../props/onPressedStyle.md)
- [onClick](../props/onClick.md)
- [onPressed](../props/onPressed.md)
- [onLongPressed](../props/onLongPressed.md)
- [onLongPressRepeat](../props/onLongPressRepeat.md)
- [align](../props/align.md)
- [alignTo](../props/alignTo.md)

## Usage
```jsx
import { Button, Text, Image, Window } from 'lvlgjs-ui'
import { useRef, useState } from 'react'

function Component () {
    const ref = useRef()
    const [imageShow, setImageShow] = useState(false)
    useEffect(() => {
        console.log(ref.current.moveToFront())
    }, [])

    return (
        <Window>
            {imageShow && <Image
                alignTo={{
                    parent: ref.current,
                    type: EAlignType.ALIGN_CENTER,
                    pos: [10, 0]
                }}
            />}
            <Button
                ref={ref}
                style={style.button}
                onPressedStyle={style.onPressedStyle}
                onClick={() => setImageShow(true)}
                onPressed={() => console.log('button onPressed')}
                onLongPressed={() => console.log('button onPressed')}
                onLongPressRepeat={() => console.log('button onLongPressRepeat')}
          >
              <Text>test</Text>
          </Button>
        </Window>
    )
}

const style = {
    onPressedStyle: {},
    button: {},
}
```

## Demo
test/button