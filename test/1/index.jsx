import { View, Render, Window } from 'lvgljs-ui';
import React from 'react';

function App () {
    return (
        <Window style={style.window}>
            <View style={style.view}></View>
        </Window>
    )
}

const style = {
    window: {
        width: 600,
        height: 600
    },
    view: {
        width: 300,
        height: 300,
        left: 50,
        top: 50,
        "background-color": "ff0000"
    }
}

Render.render(<App />);