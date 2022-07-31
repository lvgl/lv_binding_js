import { View, Render, Window, Text, Image, Button } from 'lvgljs-ui';
import React, { useState } from 'react';

function App () {
    return (
        <Window style={style.window}>
            <Button style={style.button} onPressedStyle={style.buttonPress}>
                <Text>Button1</Text>
            </Button>
            <Button style={style.button} onPressedStyle={style.buttonPress}>
                <Text>Button2</Text>
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
        'height': '100px',
        'border-width': '3px',
        'border-color': 'grey',
        'background-color': 'white',
        'transition': 'border-width 100ms linear 200ms, background-color 100ms linear 200ms',
        'text-color': 'blue',
        'display': 'flex',
        'justify-content': 'center',
        'align-items': 'center'
    },
    buttonPress: {
        'border-width': '6px',
        'border-color': '#DC143C',
        'background-color': 'red',
        'transition': 'border-width 500ms linear 0, background-color 500ms linear 0',
        'display': 'flex',
        'justify-content': 'center',
        'align-items': 'center'
    }
};

Render.render(<App />);