import { View, Render, Text, Dimensions, Button } from 'lvgljs-ui';
import React, { useState } from 'react';

const { width, height } = Dimensions.window

function App () {
    const [num, setNum] = useState('Click me!')

    return (
        <View style={style.window}>
            <Button 
                onClick={() => {
                    let value
                    if (isNaN(num)) {
                        value = 1
                    } else {
                        value = num + 1
                    }
                    setNum(value)
                }} 
                style={style.button}
            >
                <Text>{num}</Text>
            </Button>
        </View>
    )
};

const style = {
    window: {
        width,
        height,
        'display': 'flex',
        'justify-content': 'center',
        'align-items': 'center'
    },
    button: {
        'width': '100px',
        'height': '50px',
        'display': 'flex',
        'justify-content': 'center',
        'align-items': 'center'
    },
};

Render.render(<App />);