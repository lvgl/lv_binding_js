import { View, Render, Window, Text, Image, EAlignType, Animate, EAnimateEasingFunc } from 'lvgljs-ui';
import React, { useRef, useEffect } from 'react';

function App () {
    const ref = useRef()

    useEffect(() => {
        try {
            const animate = Animate.timing({
                duration: 1000,
                startValue: 10,
                endValue: 50,
                execCallback: (value) => {
                    console.log(value)
                    ref.current.setStyle({
                        left: value
                    })
                }
            })
            animate.start()
        } catch (e) {
            console.log(e)
        }
    }, [])

    return (
        <Window style={style.window}>
            <View
                style={style.ball}
                align={{
                    type: EAlignType.ALIGN_LEFT_MID
                }}
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
    ball: {
        'background-color': 'red',
        'border-radius': 0x7FFF,
        'width': '20px',
        'height': '20px'
    }
};

Render.render(<App />);