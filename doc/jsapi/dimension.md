# You can get the application window's width and height through dimension api

## Usage

```jsx
import { View, Render, Window, Text, Image, Button, Dimensions } from 'lvgljs-ui';
import React, { useState } from 'react';

const { width, height } = Dimensions.window

function App () {
    return (
        <Window style={style.window}>
            <Button>
                <Text>Button1</Text>
            </Button>
            <Button>
                <Text>Button2</Text>
            </Button>

        </Window>
    )
};

const style = {
    window: {
        'width': width,
        'height': height,
        'display': 'flex',
        'justify-content': 'center',
        'align-items': 'center'
    }
}
```