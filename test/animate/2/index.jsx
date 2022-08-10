import { View, Render, Window, Text, Image, Switch, EAlignType, Animate, EAnimateEasingFunc } from 'lvgljs-ui';
import React, { useRef, useEffect } from 'react';

function App () {
    const ref = useRef()

    useEffect(() => {
        console.log(ref.current.style.left)
    }, [])

    return (
        <Window style={style.window}>
            <Text style={style.text}>Hello animations!</Text>
            <Switch
                align={{
                    type: EAlignType.ALIGN_CENTER
                }}
                onChange={(e) => console.log(e.checked)}
                ref={ref}
            />
        </Window>
    )
};

const style = {
    window: {
        'width': '480px',
        'height': '320px',
    },
    text: {
        
    }
};

Render.render(<App />);