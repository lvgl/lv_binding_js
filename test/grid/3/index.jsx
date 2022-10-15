import { View, Render, Text, EAlignType, Dimensions } from 'lvgljs-ui';
import React, { useState } from 'react';

const arr = Array(9).fill(1)

const { width, height } = Dimensions.window

function App () {
    return (
        <View style={style.window}>
        {
            arr.map((item, index) => (
                <View
                    style={[style.view, { 'grid-column-pos': index % 3, 'grid-row-pos': Math.floor(index / 3) }]}
                >
                    <Text>
                        {`c${index % 3}, r${Math.floor(index / 3)}`}
                    </Text>
                </View>
            ))
        }
        </View>
    )
};

const style = {
    window: {
        width,
        height,
        'display': 'grid',
        'grid-template-columns': '60 1fr 2fr',
        'grid-template-rows': '50 1fr 50',
        'padding': 4,
        'border-radius': 0
    },
    view: {
        'grid-child': true,
        'align-self': 'stretch',
        'justify-self': 'stretch',
        'display': 'flex',
        'justify-content': 'center',
        'align-items': 'center',
        'overflow': 'hidden'
    },
};

Render.render(<App />);