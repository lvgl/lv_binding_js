import { View, Render, Window, Text, EAlignType, Button, Input } from 'lvgljs-ui';
import React, { useState } from 'react';

const arr = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "del", "0", "enter"]

function App () {
    const [value, setValue] = useState('')

    return (
        <Window style={style.window}>
            <Input
                align={{
                    type: EAlignType.ALIGN_TOP_MID,
                    pos: [0, 10]
                }}
                onChange={e => setValue(e.value)}
                value={value}
                onFocus={e => console.log('input focus')}
            />
            <View
                style={style.view1}
                align={{
                    type: EAlignType.ALIGN_BOTTOM_MID,
                    pos: [0, -10]
                }}
                onClick={e => {
                    const { target } = e
                    const { dataset } = target
                    if (!dataset?.action) return
                    const { action } = dataset
                    let newValue = value
                    if (action === 'del') {
                        newValue = value.substring(0, value.length - 1)
                    } else if (action === 'enter') {
                        console.log('click enter')
                    } else {
                        newValue = `${value}${action}`
                    }

                    setValue(newValue)
                }}
            >
                {
                    arr.map(item => (
                        <Button
                            style={style.button1}
                            data-action={item}
                        >
                            <Text>{item}</Text>
                        </Button>
                    ))
                }
            </View>
        </Window>
    )
};

const style = {
    window: {
        'width': '480px',
        'height': '320px',
    },
    view1: {
        'width': '270px',
        'height': '150px',
        'border-radius': 4,
        'padding': '4px',
        'border-width': '2px',
        'border-color': 'grey',
        'display': 'flex',
        'justify-content': 'center',
        'align-content': 'center',
        'flex-wrap': 'wrap'
    },
    button1: {
        'width': '70px',
        'height': '20px',
        'display': 'flex',
        'align-items': 'center',
        'justify-content': 'center',
        'background-color': 'grey',
        'border-radius': 4,
    }
};

Render.render(<App />);