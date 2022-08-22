import { View, Render, Window, Text, ProgressBar, EAlignType, Animate, EAnimateEasingFunc } from 'lvgljs-ui';
import React, { useRef, useEffect } from 'react';

function App () {
    return (
        <Window style={style.window}>
            <ProgressBar
                style={style.bar}
                align={{
                    type: EAlignType.ALIGN_CENTER
                }}
                value={100}
                useAnimation={true}
                animationTime={1000}
                indicatorStyle={style.indicator}
            />
        </Window>
    )
};

const style = {
    window: {
        'width': '480px',
        'height': '320px',
    },
    bar: {
        'width': 200,
        'height': 20,
        'border-color': 'blue',
        'border-width': 2,
        'padding': 6,
        'border-radius': 6
    },
    indicator: {
        'background-color': 'blue',
        'border-radius': 3
    }
};

Render.render(<App />);