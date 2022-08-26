import { Text, Render, Window, Line, EAlignType, Button } from 'lvgljs-ui';
import React, { useState } from 'react';

const points = [[5, 5], [70, 70], [120, 10], [180, 60], [240, 10]]

function App () {

    return (
        <Window style={style.window}>
            <Line
                points={points}
            />
        </Window>
    )
};

const style = {
    window: {
        'width': '480px',
        'height': '320px',
    },
    line: {
        'line-width': 8,
        'line-color': 'blue',
        'line-rounded': true
    }
};

Render.render(<App />);