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
                value={70}
                useAnimation={false}
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
    }
};

Render.render(<App />);