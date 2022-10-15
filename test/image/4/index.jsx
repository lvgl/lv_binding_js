import { View, Render, Dimensions, Text, Image, Button } from 'lvgljs-ui';
import React, { useState } from 'react';

const { width, height } = Dimensions.window

function App () {
    return (
        <View style={style.window}>
            <Image src={'audio'} style={style.image1} />
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
    image1: {
        'width': '175px',
        'height': '120px',
        'border-width': '2px',
        'border-color': 'black',
    },
};

Render.render(<App />);