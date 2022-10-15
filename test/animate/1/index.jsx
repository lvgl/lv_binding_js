import { View, Render, Text, Image, EAlignType, Animate, EAnimateEasingFunc } from 'lvgljs-ui';
import React, { useRef, useEffect } from 'react';

function App () {
    const ref = useRef()

    useEffect(() => {
        try {
            const animate = Animate.parallel([
                Animate.timing({
                    duration: 1000,
                    startValue: 0,
                    endValue: 400,
                    playBackDelay: 100,
                    playBackTime: 300,
                    repeatDelay: 500,
                    repeatCount: 0,
                    startCallback: () => {
                        console.log('animate1 start')
                    },
                    readyCallback: () => {
                        console.log('animate1 ready')
                    },
                    execCallback: (value) => {
                        ref.current.setStyle({
                            left: value
                        })
                    },
                }),
                Animate.timing({
                    duration: 1000,
                    startValue: 10,
                    endValue: 50,
                    playBackDelay: 100,
                    playBackTime: 300,
                    repeatDelay: 500,
                    repeatCount: 0,
                    execCallback: (value) => {
                        ref.current.setStyle({
                            width: value,
                            height: value
                        })
                    },
                }),
            ])
            animate.start()
        } catch (e) {
            console.log(e)
        }
    }, [])

    return (
        <View
            style={style.ball}
            ref={ref}
        />
    )
};

const style = {
    ball: {
        'background-color': 'red',
        'border-radius': 0x7FFF,
        'width': '20px',
        'height': '20px'
    }
};

Render.render(<App />);