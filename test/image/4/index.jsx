import { View, Render, Window, Text, Image, Button } from 'lvgljs-ui';
import React, { useState } from 'react';



function App () {
    return (
        <Window style={style.window}>
            <Image src={'audio'} style={style.image1} />
        </Window>
    )
};

const style = {
    window: {
        'width': '480px',
        'height': '320px',
        'display': 'flex',
        'justify-content': 'center',
        'align-items': 'center'
    },
    image1: {
        'width': '175px',
        'height': '120px',
        'border-width': '2px',
        'border-color': 'black',
    },
};

Render.render(<App />);