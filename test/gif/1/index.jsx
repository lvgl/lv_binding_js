import { View, Render, GIF, EAlignType, Dimensions } from 'lvgljs-ui';
import React, { useState } from 'react';

const { width, height } = Dimensions.window

function App () {
    return (
        <View style={style.window}>
            <GIF
                align={{
                    type: EAlignType.ALIGN_CENTER,
                }}
                style={style.gif}
                src="http://p0.itc.cn/q_70/images03/20200807/9405b7432e34421b866f35a087812b6f.gif"
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