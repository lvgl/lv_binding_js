import { View, Render, Text, Animate, Dimensions } from 'lvgljs-ui';
import React, { useRef, useEffect } from 'react';

const { width, height } = Dimensions.window

function App () {
    const ref = useRef()

    useEffect(() => {
        const animate = Animate.parallel([
            Animate.timing({
                duration: 500,
                startValue: 0,
                endValue: 10,
                playBackTime: 500,
                repeatCount: Infinity,
                execCallback: (value) => {
                    ref.current.setStyle({
                        'row-spacing': value
                    })
                },
            }),
            Animate.timing({
                duration: 3000,
                startValue: 0,
                endValue: 10,
                playBackTime: 3000,
                repeatCount: Infinity,
                execCallback: (value) => {
                    ref.current.setStyle({
                        'column-spacing': value
                    })
                },

            }),
        ])
        animate.start()
    }, [])

    return (
        <View style={style.window} ref={ref}>
            {
                Array(9).fill(0).map((_, i) => (
                    <View
                        style={style.view1}
                    >
                        <Text>{i}</Text>
                    </View>
                ))
            }
        </View>
    )
};

const style = {
    window: {
        width,
        height,
        'display': 'flex',
        'flex-wrap': 'wrap',
        'background-color': 'white',
        'padding': '10px',
        'row-spacing': '10px',
        'column-spacing': '10px'
    },
    view1: {
        'width': '70px',
        'height': 'auto',
        'display': 'flex',
        'align-items': 'center',
        'justify-content': 'center',
        'border-radius': 4,
        'padding': '4px',
        'border-width': '2px',
        'border-color': 'grey',
    },
};

Render.render(<App />);