import { View, Render, Text, EAlignType, Dimensions } from 'lvgljs-ui';
import React, { useState } from 'react';

const { width, height } = Dimensions.window

function App () {
    return (
        <View style={style.window}>
            <View
                style={style.view1}
            >
                {
                    Array(8).fill(0).map((_, i) => (
                        <View
                            style={style.view2}
                        >
                            <Text>{i}</Text>
                        </View>
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
        'display': 'flex',
        'align-items': 'center',
        'justify-content': 'center'
    },
    view1: {
        'width': '300px',
        'height': '220px',
        'display': 'flex',
        'flex-wrap': 'wrap',
        'flex-direction': 'row',
        'justify-content': 'space-evenly',
        'background-color': 'white',
        'border-radius': 4,
        'padding': '4px',
        'border-width': '2px',
        'border-color': 'grey',
    },
    view2: {
        'width': '70px',
        'height': 'auto',
        'background-color': 'white',
        'border-radius': 4,
        'padding': '4px',
        'border-width': '2px',
        'border-color': 'grey',
        'display': 'flex',
        'align-items': 'center',
        'justify-content': 'center'
    }
};

Render.render(<App />);