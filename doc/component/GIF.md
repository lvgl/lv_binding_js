# Component GIF mapping [lvgl lv_gif)](https://docs.lvgl.io/master/libs/gif.html)

## Api
- [style](../api/style.md)
- [moveToFront](../api/moveToFront.md)
- [moveToBackground](../api/moveToBackground.md)
- [setStyle](../api/setStyle.md)
- [scrollIntoView](../api/scrollIntoView.md)
- pause, pause the GIF animation
- resume, resume the paused GIF animation

## Props
- [style](../props/style.md)
- [align](../props/align.md)
- [alignTo](../props/alignTo.md)
- [onClick](../props/onClick.md)
- [src](../props/src.md)
- paused, controll the play state of the GIF animation, when true pause the animation, when false resume it (also applied after the GIF loads)
    - type Boolean

## Usage
```jsx
import { GIF, EAlignType } from 'lvgljs-ui'
import { useState } from 'react'

const path = require('path')
function Component () {
    const [paused, setPaused] = useState(false)
    return (
        <React.Fragment>
            <GIF src={path.resolve(__dirname, './assets/images/1.gif')} />
            <GIF src={'https://somewebsite/images/1.gif'} />
            <GIF
                align={{
                    type: EAlignType.ALIGN_CENTER,
                }}
                style={style.gif}
                src={'./sample.gif'}
                paused={paused}
                onClick={() => setPaused((prev) => !prev)}
            />
        </React.Fragment>
    )
}

const style = {
    gif: {
        width: 'auto',
        height: 'auto',
    },
}
```

## Demo
test/gif
