import { View, Render, Text, Dimensions, Switch, EAlignType, Animate, EAnimateEasingFunc } from 'lvgljs-ui';
import React, { useRef, useEffect, useCallback } from 'react';

const { width, height } = Dimensions.window

function App () {
    const ref = useRef()

    const onChange = useCallback((e) => {
        if (e.checked) {
            const animate = Animate.timing({
                duration: 500,
                startValue: ref.current.style.left,
                endValue: width / 2 - ref.current.style.width / 2,
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
        <React.Fragment>
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
        </React.Fragment>
    )
};
const style = {
    text: {
        'top': '10px',
        'left': width / 2
    }
};

Render.render(<App />);