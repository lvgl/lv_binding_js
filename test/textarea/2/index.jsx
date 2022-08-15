import { View, Render, Window, Text, EAlignType, Keyboard, Input } from 'lvgljs-ui';
import React, { useState } from 'react';

function App () {
    const [value1, setValue1] = useState('')

    return (
        <Window style={style.window}>
            <Text style={style.text1}>Password</Text>
            <Input
                mode="password"
                onChange={e => setValue1(e.value)}
                value={value1}
                style={style.input1}
            />
            <Input
                mode="password"
                onChange={e => setValue1(e.value)}
                value={value1}
                style={style.input1}
                align={{
                    type: EAlignType.ALIGN_TOP_RIGHT,
                    pos: [-5, 20]
                }}
            />
            <Text 
                style={style.text1}
                align={{
                    type: EAlignType.ALIGN_OUT_TOP_LEFT,
                }}
            >Text</Text>
            <Keyboard
                style={style.keyboard}
                
            />
        </Window>
    )
};

const style = {
    window: {
        'width': '480px',
        'height': '320px',
    },
    text1: {
        'left': 0,
        'top': 0
    },
    input1: {
        'width': '40%',
        'left': '5px',
        'top': '20px'
    },
    input2: {
        'width': '40%',
    },
    keyboard: {
        'width': '100%',
        'height': '50%',
        'left': 0,
        'top': '50%'
    }
};

Render.render(<App />);