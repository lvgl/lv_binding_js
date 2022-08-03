import { Text, Render, Window, Slider } from 'lvgljs-ui';
import React, { useState } from 'react';

function App () {
    const [progress, setProgress] = useState(0)

    return (
        <Window style={style.window}>
            <Slider
                onChange={(e) => {
                    const { value } = e
                    setProgress(value)
                }}
                style={style.slider}
                indicatorStyle={style.indicatorStyle}
                knobStyle={style.knobStyle}
                onIndicatorPressedStyle={style.indicatorPressedStyle}
                onKnobPressedStyle={style.knobPressed0Style}
            />
            <Text>{progress}%</Text>
        </Window>
    )
};

const style = {
    window: {
        'width': '480px',
        'height': '320px',
        'display': 'flex',
        'flex-direction': 'column',
        'justify-content': 'center',
        'align-items': 'center'
    },
    slider: {
        'background-color': 'rgb(187,187,187)',
        'border-radius': 0x7FFF,
        'padding': '-2px 0'
    },
    indicatorStyle: {
        'background-color': 'cyan',
        'border-radius': 0x7FFF,
    },
    knobStyle: {
        'background-color': 'cyan',
        'border-width': '2px',
        'border-color': 'cyan',
        'padding': '6px',
        'border-radius': 0x7FFF,
        'transition': 'background-color 300ms linear 0'
    },
    indicatorPressedStyle: {
        'border-radius': 0x7FFF,
        'background-color': '0x00838F',
        'transition': 'background-color 300ms linear 0'
    },
    knobPressed0Style: {
        'background-color': '0x00838F',
        'border-radius': 0x7FFF,
        'transition': 'background-color 300ms linear 0',
        'border-width': '2px',
        'border-color': '0x00838F',
        'padding': '6px',
    }
};

Render.render(<App />);