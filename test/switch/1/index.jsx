import { Text, Render, Window, Switch, EAlignType, Button } from 'lvgljs-ui';
import React, { useState } from 'react';

function App () {
    return (
        <Window style={style.window}>
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
        </Window>
    )
};

const style = {
    window: {
        'width': '480px',
        'height': '320px',
        'display': 'flex',
        'justify-content': 'center',
        'align-items': 'center',
        'align-content': 'center'
    },
};

Render.render(<App />);