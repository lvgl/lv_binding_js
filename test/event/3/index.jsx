import { Render, Dimensions, Text, Button, View } from 'lvgljs-ui';
import React, { useState } from 'react';

const { width, height } = Dimensions.window

function App () {
    const [backgroungColors, setBackgroundColors] = useState(Array(30).fill(false))

    return (
        <View style={style.window} 
            onClick={(e) => {
                const { target } = e
                const { dataset } = target
                if (!dataset) return
                const { index } = dataset
                if (index == void 0) return
                backgroungColors[index] = !backgroungColors[index]
                setBackgroundColors([...backgroungColors])
            }}
        >
            {
                Array(30).fill(0).map((item, i) => {
                    return (
                        <Button 
                            style={[style.button, backgroungColors[i] ? { 'background-color': 'red' } : {}]}
                            data-index={i}
                        >
                            <Text>{i + 1}</Text>
                        </Button>
                    )
                })
            }
        </View>
    )
};

const style = {
    window: {
        width,
        height,
        'display': 'flex',
        'flex-direction': 'row',
        'flex-wrap': 'wrap',
        'padding': '8px'
    },
    button: {
        'width': '80px',
        'height': '50px',
        'display': 'flex',
        'justify-content': 'center',
        'align-items': 'center',
    },
};

Render.render(<App />);