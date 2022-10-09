# Component Image mapping [lvgl lv_img)](https://docs.lvgl.io/master/widgets/img.html#overview)

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
- [src](../props/src.md)

## Usage
```jsx
import { Image } from 'lvlgjs-ui'

const path = require('path')
function Component () {
    return (
        <React.Fragment>
            <Image src={path.resolve(__dirname, './assets/images/1.png')} />
            <Image src={'https://somewebsite/images/1.png'} />
            <Image src="audio" />
        </React.Fragment>
    )
}
```

## Demo
test/image