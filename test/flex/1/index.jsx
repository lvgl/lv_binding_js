import { View, Render, Dimensions, Text, EAlignType, Button } from 'lvgljs-ui';
import React, { useState } from 'react';

const { width, height } = Dimensions.window

function App () {
    return (
        <View style={style.window}>
            <View 
                style={style.view1}
                align={{
                    type: EAlignType.ALIGN_TOP_MID,
                    pos: [0, 5]
                }}
            >
                {
                    Array(10).fill(0).map((_, i) => (
                        <Button
                            style={style.button1}
                        >
                            <Text>{`Item: ${i + 1}`}</Text>
                        </Button>
                    ))
                }
            </View>
            <View
                align={{
                    type: EAlignType.ALIGN_BOTTOM_MID,
                    pos: [0, -5]
                }}
                style={style.view2}
            >
                {
                    Array(10).fill(0).map((_, i) => (
                        <Button
                            style={style.button2}
                        >
                            <Text>{`Item: ${i + 1}`}</Text>
                        </Button>
                    ))
                }
            </View>
        </View>
    )
};

const style = {
    window: {
        width,
        height,
    },
    view1: {
        'width': '90%',
        'height': '75px',
        'flex-direction': 'row',
        'display': 'flex',
        'overflow': 'auto',
        'background-color': 'white',
        'border-radius': 4,
        'padding': '4px',
        'border-width': '2px',
        'border-color': 'grey',
        'border-side': 'bottom-left'
    },
    button1: {
        'width': '100px',
        'height': '100%',
        'display': 'flex',
        'align-items': 'center',
        'justify-content': 'center'
    },
    view2: {
        'width': '200px',
        'height': '150px',
        'flex-direction': 'column',
        'display': 'flex',
        'overflow': 'auto',
        'background-color': 'white',
        'border-radius': 4,
        'padding': '4px',
        'border-width': '2px',
        'border-color': 'grey'
    },
    button2: {
        'width': '100%',
        'height': 'auto'
    }
};

Render.render(<App />);