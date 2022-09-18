import { View, Render, Window, Text, EAlignType, Button } from 'lvgljs-ui';
import React, { useState } from 'react';

const arr = Array(9).fill(1)

function App () {
    return (
        <Window style={style.window}>
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
        </Window>
    )
};

const style = {
    window: {
        'width': '300px',
        'height': '220px',
        'display': 'grid',
        'grid-template-columns': '60 60 60',
        'grid-template-rows': '45 45 45',
        'padding': 4,
        'border-radius': 0,
        'justify-content': 'space-between',
        'align-items': 'end'
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