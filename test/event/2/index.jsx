import { View, Render, Window, Text, Image, Button } from 'lvgljs-ui';
import React, { useState } from 'react';

function App () {
    const [num, setNum] = useState('Click me!')

    return (
        <Window style={style.window}>
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
        </Window>
    )
};

const style = {
    window: {
        'width': '480px',
        'height': '320px',
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