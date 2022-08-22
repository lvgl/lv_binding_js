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
                value={70}
                useAnimation={false}
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
    }
};

Render.render(<App />);