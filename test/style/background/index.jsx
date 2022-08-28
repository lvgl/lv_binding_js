import { View, Render, Window, Text, EAlignType, Button } from 'lvgljs-ui';
import React, { useState } from 'react';

function App () {

    return (
        <Window style={style.window}>
            <View 
                style={style.view}
                align={{
                    type: EAlignType.ALIGN_CENTER
                }}
            >
            </View>
        </Window>
    )
};

const style = {
    window: {
        'width': '480px',
        'height': '320px',
    },
    view: {
        'border-radius': '5px',
        'background-color': 'grey',
        'background-grad-color': 'blue',
        'background-grad-color-dir': 'vertical',
        'opacity': 1
    }
};

Render.render(<App />);