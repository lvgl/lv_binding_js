import { View, Render, Window, Text, Image, Button } from 'lvgljs-ui';
import React, { useState } from 'react';



function App () {
    return (
        <Window style={style.window}>
            <Image src={'./1.png'} style={style.image} />
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
    image: {
        'width': '175px',
        'height': '120px',
    },
};

Render.render(<App />);