import { View, Render, Window, Text, Image, Button } from 'lvgljs-ui';
import React, { useState } from 'react';



function App () {
    return (
        <Window style={style.window}>
            <Image src={'./1.png'} style={style.image1} />
            <Image src={'http://www.kuaipng.com/Uploads/pic/w/2020/11-07/93727/water_93727_260_260.png'} style={style.image2} />
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
    },
    image2: {
        'width': 'auto',
        'height': 'auto',
    }
};

Render.render(<App />);