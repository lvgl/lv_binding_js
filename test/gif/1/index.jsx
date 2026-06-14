import { View, Render, GIF, EAlignType, Dimensions } from 'lvgljs-ui';
import React from 'react';

const { width, height } = Dimensions.window

const captureMode = tjs.env.TEST_CAPTURE === '1';

function App () {
    return (
        <View style={style.window}>
            <GIF
                align={{
                    type: EAlignType.ALIGN_CENTER,
                }}
                paused={captureMode}
                style={style.gif}
                src={"./sample.gif"}
            />
        </View>
    )
};

const style = {
    window: {
        'width': width,
        'height': height,
    },
    gif: {
        'width': 'auto',
        'height': 'auto',
        'transform': 'rotate(60deg)'
    }
};

Render.render(<App />);