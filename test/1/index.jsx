import { View, Render, Window } from 'lvgljs-ui';
import React from 'react';

function App () {
    return (
        <Window>
            <View></View>
        </Window>
    )
}

Render.render(<App />);