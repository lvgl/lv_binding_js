import { View, Render, Window, Text, EAlignType, Checkbox } from 'lvgljs-ui';
import React, { useState } from 'react';

function App () {
    return (
        <Window style={style.window}>
            <Checkbox
                checked={false}
                text="Apple"
            />
            <Checkbox
                checked={false}
                text="Banana"
            />
            <Checkbox
                checked={false}
                disabled={false}
                text="Lemon"
            />
            <Checkbox
                checked={false}
                text={`Melon\nand a new line`}
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
        'align-items': 'flex-start',
        'flex-direction': 'column',
        'align-content': 'center'
    }
};

Render.render(<App />);