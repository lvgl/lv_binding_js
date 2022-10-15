import { View, Render, Dimensions, EAlignType, Image, Animate } from 'lvgljs-ui';
import React, { useEffect, useRef } from 'react';

const { width, height } = Dimensions.window

function App () {
    const ref = useRef()

    useEffect(() => {
        const animate = Animate.parallel([
            Animate.timing({
                duration: 5000,
                startValue: 0,
                endValue: 3600,
                repeatCount: Infinity,
                execCallback: (value) => {
                    ref.current.setStyle({
                        transform: `rotate(${value}deg)`
                    })
                },
            }),
            Animate.timing({
                duration: 5000,
                startValue: 128,
                endValue: 256,
                playBackTime: 3000,
                repeatCount: Infinity,
                execCallback: (value) => {
                    ref.current.setStyle({
                        transform: `scale(${value / 256})`
                    })
                },
            }),
        ])

        animate.start()
    }, [])

    return (
        <View style={style.window}>
            <Image 
                src={'./3.png'} 
                style={style.image} 
                ref={ref} 
                align={{
                    type: EAlignType.ALIGN_CENTER
                }}    
            />
        </View>
    )
};

const style = {
    window: {
        width,
        height,
    },
    image: {
        'width': 'auto',
        'height': 'auto',
        'transform-origin': '0 0'
    },
};

Render.render(<App />);