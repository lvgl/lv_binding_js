import { View, Render, Window, Text, EAlignType, Button } from 'lvgljs-ui';
import React, { useState } from 'react';

function App () {

    return (
        <Window style={style.window}>
            <Text align={{
                type: EAlignType.ALIGN_CENTER
            }} style={style.text}>{`Text of a label`}</Text>
        </Window>
    )
};

const style = {
    window: {
        'width': '480px',
        'height': '320px',
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