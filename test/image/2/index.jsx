import { View, Render, Dimensions, Text, Image, Slider, EAlignType } from 'lvgljs-ui';
import React, { useRef, useState } from 'react';

const { width, height } = Dimensions.window

function App () {
    const [color1, setColor1] = useState(51)
    const [color2, setColor2] = useState(229)
    const [color3, setColor3] = useState(153)
    const [opacity, setOpacity] = useState(50)

    return (
        <View style={style.window}>
            <Slider
                range={[0, 255]}
                value={51}
                style={style.slider1}
                align={{
                    type: EAlignType.ALIGN_LEFT_MID,
                    pos: [25, 0]
                }}
                onChange={e => setColor1(e.value)}
            />
            <Slider
                range={[0, 255]}
                value={229}
                style={style.slider2}
                align={{
                    type: EAlignType.ALIGN_LEFT_MID,
                    pos: [50, 0],
                }}
                onChange={e => setColor2(e.value)}
            />
            <Slider
                range={[0, 255]}
                value={153}
                style={style.slider3}
                align={{
                    type: EAlignType.ALIGN_LEFT_MID,
                    pos: [75, 0]
                }}
                onChange={e => setColor3(e.value)}
            />
            <Slider
                range={[0, 100]}
                value={50}
                style={style.slider4}
                align={{
                    type: EAlignType.ALIGN_LEFT_MID,
                    pos: [100, 0]
                }}
                onChange={e=> setOpacity(e.value)}
            />
            <Image 
                src={'./2.png'} 
                style={[style.image, { recolor: `rgb(${color1}, ${color2}, ${color3})`, 'recolor-opacity': opacity / 100 }]} 
                align={{
                    type: EAlignType.ALIGN_RIGHT_MID,
                    pos: [0, 0]
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
    slider1: {
        'left': '25px',
        'width': '10px',
        'height': '200px',
        'background-color': 'red',
    },
    slider2: {
        'left': '50px',
        'width': '10px',
        'height': '200px',
        'background-color': 'green'
    },
    slider3: {
        'left': '75px',
        'width': '10px',
        'height': '200px',
        'background-color': 'blue'
    },
    slider4: {
        'width': '10px',
        'left': '100px',
        'height': '200px',
        'background-color': 'gray'
    },
    image: {
        'width': '175px',
        'height': '120px',
    }
};

Render.render(<App />);