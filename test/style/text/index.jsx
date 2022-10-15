import { View, Render, Text, EAlignType, Dimensions } from 'lvgljs-ui';
import React, { useState } from 'react';

const { width, height } = Dimensions.window

function App () {

    return (
        <View style={style.window}>
            <Text align={{
                type: EAlignType.ALIGN_CENTER
            }} style={style.text}>{`Text of a label`}</Text>
        </View>
    )
};

const style = {
    window: {
        width,
        height
    },
    text: {
        'text-color': 'blue',
        'letter-spacing': 5,
        'line-spacing': 20,
        'text-decoration': 'underline',
        'text-overflow': 'auto',
        'height': 'auto',
        'border-radius': '5',
        'border-width': 2,
        'border-color': 'blue',
        'padding': 10,
        'width': '150px'
    }
};

Render.render(<App />);