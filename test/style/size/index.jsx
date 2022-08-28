import { View, Render, Window, Text, EAlignType, Button } from 'lvgljs-ui';
import React, { useState } from 'react';

function App () {

    return (
        <Window style={style.window}>
            <View style={style.view}>
                <Text>Hello</Text>
            </View>
        </Window>
    )
};

const style = {
    window: {
        'width': '480px',
        'height': '320px',
    },
    view: {
        'border-radius': '5px',
        'width': '150px',
        'height': 'auto',
        'padding': '20px 20px 20px 5px',
        'left': '50%',
        'top': '80px'
    }
};

Render.render(<App />);