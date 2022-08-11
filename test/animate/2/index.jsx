import { View, Render, Window, Text, Image, Switch, EAlignType, Animate, EAnimateEasingFunc } from 'lvgljs-ui';
import React, { useRef, useEffect, useCallback } from 'react';

function App () {
    const ref = useRef()

    const onChange = useCallback((e) => {
        if (e.checked) {
            const animate = Animate.timing({
                duration: 500,
                startValue: ref.current.style.left,
                endValue: 180,
                easing: 'overshoot',
                execCallback: (value) => {
                    ref.current.setStyle({
                        left: value,
                    })
                },
                readyCallback () {
                    animate.release()
                }
            })
            animate.start()
        } else {
            const animate = Animate.timing({
                duration: 500,
                startValue: ref.current.style.left,
                endValue: -ref.current.style.width,
                easing: 'ease-in',
                execCallback: (value) => {
                    ref.current.setStyle({
                        left: value,
                    })
                },
                readyCallback () {
                    animate.release()
                }
            })
            animate.start()
        }
    }, [])

    return (
        <Window style={style.window}>
            <Text
                style={style.text}
                ref={ref}
            >Hello animations!</Text>
            <Switch
                align={{
                    type: EAlignType.ALIGN_CENTER
                }}
                onChange={onChange}
                checked={true}
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
        'left': '180px',
        'top': '10px'
    }
};

Render.render(<App />);