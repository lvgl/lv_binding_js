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
    return (
        <Window style={style.window}>
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
    )
};

const style = {
    window: {
        'display': 'flex',
        'flex-direction': 'column',
        'align-items': 'center',
        'justify-content': 'space-between',
        'height': height,
        'width': width,
        'padding': 0,
        'border-radius': 0,
        'border-width': 0,
    },
    textarea: {
        'font-size': '34px',
        'background-color': 'black',
        'text-color': 'green',
        'border-radius': 0,
        'height': Math.floor(height / 4),
        'width': width,
        'left': 0,
        'top': 0
    },
    buttonWrapper: {
        'background-color': 'white',
        'padding': '8px',
        'row-spacing': '8px',
        'width': width,
        'height': Math.floor(height * 3 / 4),
        'display': 'flex',
        'flex-direction': 'row',
        'flex-wrap': 'wrap',
        'border-radius': 0,
    },
    button: {
        'width': Math.floor(width / 4 - 5 * 8 - 2 * 8),
        'height': Math.floor(height / 5 - 6 * 8 - 2 * 8),
    },
    buttonText: {
        'font-size': 26,

    }
}

Render.render(<App />);
