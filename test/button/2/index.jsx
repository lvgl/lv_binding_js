import { View, Render, Text, Image, Button, Dimensions } from 'lvgljs-ui';
import React, { useState } from 'react';

const { width, height } = Dimensions.window

function App () {
    return (
        <View style={style.window}>
            <Button style={style.button} onPressedStyle={style.buttonPress}>
                <Text>Gum</Text>
            </Button>
        </View>
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
        'text-color': 'white',
        'display': 'flex',
        'justify-content': 'center',
        'align-items': 'center',
        'background-color': 'blue',

        'transition-property': 'transform-width, transform-height',
        'transition-duration': '250ms',
        'transition-timing-function': 'ease-in-out',
        'transition-delay': '250ms',
    },
    buttonPress: {
        'transform': 'transform-width(10), transform-height(-10)',
        'letter-spacing': 10,

        'transition-property': 'transform-width, transform-height',
        'transition-duration': '250ms',
        'transition-timing-function': 'overshoot',
        'transition-delay': '250ms',

        'width': 'auto'
    }
};

Render.render(<App />);