# Component prop src

Prop src usually use in component Image、GIF loading resource, support network url、local path、buildtin symbol

## Usage
```jsx
import { Window, Image } from 'lvlgjs-ui'

const path = require('path')

function Component () {
    return (
        <Window>
            <Image src={path.resolve(__dirname, './assets/images/1.png')} />
            <Image src={'https://somewebsite/images/1.png'} />
            <Image src="audio" />
        </Window>
    )
}

```