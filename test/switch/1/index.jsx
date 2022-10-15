import { View, Render, Dimensions, Switch, EAlignType, Button } from 'lvgljs-ui';
import React, { useState } from 'react';

const { width, height } = Dimensions.window

function App () {
    return (
        <View style={style.window}>
            <Switch
                onChange={(e) => {
                    console.log('switch1 checked: ', e.checked)
                }}
            />
            <Switch
                onChange={(e) => {
                    console.log('switch2 checked: ', e.checked)
                }}
                checked={true}
            />
            <Switch
                onChange={(e) => {
                    console.log('switch3 checked: ', e.checked)
                }}
                disabled={true}
            />
            <Switch
                onChange={(e) => {
                    console.log('switch4 checked: ', e.checked)
                }}
                checked={true}
                disabled={true}
            />
        </View>
    )
};

const style = {
    window: {
        width,
        height,
        'display': 'flex',
        'flex-direction': 'column',
        'justify-content': 'center',
        'align-items': 'center',
    },
};

Render.render(<App />);