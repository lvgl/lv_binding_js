import { View, Render, Dimensions, Text, Image, EAlignType, Animate, ProgressBar } from 'lvgljs-ui';
import React, { useState, useEffect } from 'react';

const { width, height } = Dimensions.window

function App () {
    const [value, setValue] = useState(-20)

    useEffect(() => {
        try {
            const animate = Animate.timing({
                duration: 3000,
                startValue: -20,
                endValue: 40,
                playBackTime: 3000,
                repeatCount: Infinity,
                startCallback: () => {
                    console.log('animate start')
                },
                readyCallback: () => {
                    console.log('animate ready')
                },
                execCallback: (value) => {
                    setValue(value)
                },
            })
            animate.start()
        } catch (e) {
            console.log(e)
        }
    }, [])

    return (
        <View style={style.window}>
            <ProgressBar
                style={style.bar}
                align={{
                    type: EAlignType.ALIGN_CENTER
                }}
                value={value}
                range={[-20, 40]}
                useAnimation={true}
                animationTime={1000}
                indicatorStyle={style.indicator}
            />
        </View>
    )
};

const style = {
    window: {
        width,
        height
    },
    indicator: {
        'background-color': 'red',
        'background-grad-color': 'blue',
        'background-grad-color-dir': 'vertical',
    },
    bar: {
        'width': 20,
        'height': 200,
    }
};

Render.render(<App />);