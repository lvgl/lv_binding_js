import { View, Render, Dimensions, Text, EAlignType, Button } from 'lvgljs-ui';
import React, { useState } from 'react';

const { width, height } = Dimensions.window

function App () {

    return (
        <View style={style.window}>
            <View 
                style={style.view}
                align={{
                    type: EAlignType.ALIGN_CENTER
                }}
            >
            </View>
        </View>
    )
};

const style = {
    window: {
        width,
        height
    },
    view: {
        'border-radius': '10px',
        'background-color': 'grey',
        'shadow-color': 'blue',
        'shadow-width': 55,
        'shadow-offset-x': 10,
        'shadow-offset-y': 20,
        'opacity': 1
    }
};

Render.render(<App />);