import { View, Render, Window, Text, Image, Button } from 'lvgljs-ui';
import React, { useState } from 'react';

function App () {
    return (
        <Window style={style.window}>
            <Button style={style.button} onPressedStyle={style.buttonPress}>
                <Text>Gum</Text>
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
        'width': '60px',
        'height': '50px',
        'text-color': 'white',
        'display': 'flex',
        'justify-content': 'center',
        'align-items': 'center',
        'background-color': 'blue',
        'font-size': '16px',
        'transition': 'transform-width 250ms ease-in-out 0ms, transform-height 250ms, letter-spacing 250ms'
    },
    buttonPress: {
        'transform': 'transform-width(10), transform-height(-10)',
        'letter-spacing': 10,
        'transition': 'transform-width 250ms overshoot 0, transform-height 250ms, letter-spacing 250ms'
    }
};

Render.render(<App />);