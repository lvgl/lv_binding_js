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
        'border-radius': '10px',
        'background-color': 'grey',
        'outline-color': 'blue',
        'outline-width': 2,
        'outline-padding': 8,
        'opacity': 1
    }
};

Render.render(<App />);