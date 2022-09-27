import { View, Render, Window, Text, Image, Button, Dimensions } from 'lvgljs-ui';
import React, { useState } from 'react';

const { width, height } = Dimensions.window

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
        'width': width,
        'height': height,
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
        'transition-property': 'border-width, background-color',
        'transition-duration': '100ms',
        'transition-timing-function': 'linear',
        'transition-delay': '200ms',
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