import { View, Render, Dimensions, Line, EAlignType, Button } from 'lvgljs-ui';
import React, { useState } from 'react';

const points = [[5, 5], [70, 70], [120, 10], [180, 60], [240, 10]]

const { width, height } = Dimensions.window

function App () {

    return (
        <View style={style.window}>
            <Line
                points={points}
                style={style.line}
            />
        </View>
    )
};

const style = {
    window: {
        width,
        height
    },
    line: {
        'line-width': 8,
        'line-color': 'blue',
        'line-rounded': true
    }
};

Render.render(<App />);