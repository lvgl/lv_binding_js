import { Render, Window, Text, Button } from 'lvgljs-ui';
import React, { useState } from 'react';

function App () {
    const [backgroungColors, setBackgroundColors] = useState(Array(30).fill(false))

    return (
        <Window style={style.window} 
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
        </Window>
    )
};

const style = {
    window: {
        'width': '290px',
        'height': '200px',
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