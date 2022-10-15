import { View, Render, Dimensions, Text, ProgressBar, EAlignType, Animate, EAnimateEasingFunc } from 'lvgljs-ui';
import React, { useRef, useEffect } from 'react';

const { width, height } = Dimensions.window

function App () {
    return (
        <View style={style.window}>
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
        </View>
    )
};

const style = {
    window: {
        width,
        height
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