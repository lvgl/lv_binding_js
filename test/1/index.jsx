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
        width: 480,
        height: 320,
    },
    view: {
        width: 200,
        height: 50,
        left: 0,
        top: 0,
        "background-color": "ff0000",
        "border-radius": 0
    }
}

Render.render(<App />);