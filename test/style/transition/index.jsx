import { View, Render, Window, Text, EAlignType, Button } from 'lvgljs-ui';
import React, { useState } from 'react';

function App () {

    return (
        <Window style={style.window}>
            <View 
                align={{
                    type: EAlignType.ALIGN_CENTER
                }} 
                style={style.view}
                onPressedStyle={style.pressedStyle}    
            >{`Text of a label`}</View>
        </Window>
    )
};

const style = {
    window: {
        'width': '480px',
        'height': '320px',
    },
    view: {
        'transition': 'background-color 0.1s linear 0.2s, border-color 0.1s linear 0.2s, border-width 0.1s linear 0.2s'
    },
    pressedStyle: {
        'border-width': 6,
        'border-color': 'red',
        'background-color': 'red',
        'transition': 'background-color 0.5s linear 0, border-color 0.5s linear 0, border-width 0.5s linear 0'
    }
};

Render.render(<App />);