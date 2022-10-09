# Animate mapping [lvgl Animations](https://docs.lvgl.io/master/overview/animation.html)

Animated focuses on control time-based animation execution

## Api
- Animate.timing with flowlling params 
  - duration
    - required, describe the animate time
  - startValue
    - reuqired, describe the animate style start value
  - endValue
    - reuqired, describe the animate style end value
  - playBackDelay
  - playBackTime
  - repeatDelay
  - repeatCount
  - execCallback
    - required, set the component style here
  - startCallback
  - readyCallback
    - trigger when the animate is done
  - delay
  - easing ("linear" | "ease-in" | "ease-out" | "ease-in-out" | "overshoot" | "bounce" | "step")

- Animate.parallel, use to start multi animate at the same time

## Usage
```js
import { View, Render, Window, Text, Image, EAlignType, Animate } from 'lvgljs-ui';
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
                    easing: 'linear'
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
                align={{
                    type: EAlignType.ALIGN_LEFT_MID
                }}
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
```