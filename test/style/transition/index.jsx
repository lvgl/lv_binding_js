import { View, Render, Dimensions, Text, EAlignType, Button } from 'lvgljs-ui';
import React, { useState } from 'react';

const { width, height } = Dimensions.window

function App () {

    return (
        <View style={style.window}>
            <View 
                align={{
                    type: EAlignType.ALIGN_CENTER
                }} 
                style={style.view}
                onPressedStyle={style.pressedStyle}    
            >{`Text of a label`}</View>
        </View>
    )
};

const style = {
    window: {
        width,
        height
    },
    view: {
        'transition-property': 'background-color, border-color, border-width',
        'transition-duration': '0.1s',
        'transition-timing-function': 'linear',
        'transition-delay': '0.2s',
    },
    pressedStyle: {
        'border-width': 6,
        'border-color': 'red',
        'background-color': 'red',

        'transition-property': 'background-color, border-color, border-width',
        'transition-duration': '0.5s',
        'transition-timing-function': 'linear',
        'transition-delay': '0',
    }
};

Render.render(<App />);