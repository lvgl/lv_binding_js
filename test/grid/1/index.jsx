import { View, Render, Text, Dimensions, Button } from 'lvgljs-ui';
import React, { useState } from 'react';

const arr = Array(9).fill(1)

const { width, height } = Dimensions.window

function App () {
    return (
        <View style={style.window}>
        {
            arr.map((item, index) => (
                <Button
                    style={[style.view, { 'grid-column-pos': index % 3, 'grid-row-pos': Math.floor(index / 3) }]}
                >
                    <Text>
                        {`c${index % 3}, r${Math.floor(index / 3)}`}
                    </Text>
                </Button>
            ))
        }
        </View>
    )
};

const style = {
    window: {
        'width': width,
        'height': height,
        'display': 'grid',
        'grid-template-columns': '70 70 70',
        'grid-template-rows': '50 50 50'
    },
    view: {
        'grid-child': true,
        'align-self': 'stretch',
        'justify-self': 'stretch',
        'display': 'flex',
        'justify-content': 'center',
        'align-items': 'center'
    }
};

Render.render(<App />);