import { View, Render, Window, Text, Image, Dimensions, EAlignType, Button, Textarea } from 'lvgljs-ui';
import React, { useRef, useEffect, useCallback } from 'react';

const { width, height } = Dimensions.window

const buttons = [  
    "(", ")",  "C", "<-",
    "7", "8", "9", "/",
    "4", "5", "6", "*",
    "1", "2", "3", "-",
    "0", ".", "=", "+",  ""
]

function App () {
    <Window >
        <Textarea 
            style={style.textarea}
        />
        <View style={style.buttonWrapper}>
        {
            buttons.map((text, index) => (
                <Button style={style.button}>
                    <Text style={style.buttonText}>{text}</Text>
                </Button>
            ))
        }
        </View>
    </Window>
};

const style = {
    window: {
        'display': 'flex',
        'flex-direction': 'column',
    },
    textarea: {
        'font-size': '34px',
        'background-color': 'black',
        'text-color': 'green',
        'border-radius': 0,
        'height': Math.floor(height / 4),
        'width': width,
    },
    buttonWrapper: {
        'flex': 1,
        'background-color': 'white',
        'padding': '8px',
        'row-spacing': '8px'
    },
    button: {
        'width': 
    },
    buttonText: {
        'font-size': 26,

    }
}

Render.render(<App />);
