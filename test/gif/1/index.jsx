import { View, Render, Window, GIF, EAlignType, Button } from 'lvgljs-ui';
import React, { useState } from 'react';

function App () {
    return (
        <Window style={style.window}>
            <GIF
                align={{
                    type: EAlignType.ALIGN_CENTER,
                }}
                style={style.gif}
                src="https://yiche-static.oss-accelerate.aliyuncs.com/backend/uploads/image/20220814/gif-sun-wind-snow-818737-thumbs.jpg"
            />
            
        </Window>
    )
};

const style = {
    window: {
        'width': '480px',
        'height': '320px',
    },
    gif: {
        'width': 'auto',
        'height': 'auto'
    }
};

Render.render(<App />);