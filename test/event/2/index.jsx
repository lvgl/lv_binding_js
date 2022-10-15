import { View, Render, Dimensions, Text, Image, Button } from 'lvgljs-ui';
import React, { useState } from 'react';

const { width, height } = Dimensions.window

function App () {
    const [num, setNum] = useState('Click me!')

    return (
        <View style={style.window}>
            <Button 
                onClick={() => {
                    console.log('The last button event: CLICKED')
                }}
                onPressed={() => {
                    console.log('The last button event: PRESSED')
                }}
                onLongPressed={() => {
                    console.log('The last button event: LONGPRESSED')
                }}
                onLongPressRepeat={() => {
                    console.log('The last button event: LONGPRESSREPEAT')
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