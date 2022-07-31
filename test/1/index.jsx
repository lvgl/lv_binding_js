import { View, Render, Window, Text, Image, Button } from 'lvgljs-ui';
import React, { useState } from 'react';

const path = require('path')

const rootDir = path.resolve(__dirname, "./");
const assetUrl = path.resolve(rootDir, "assets/icons");
const iconId1 = '01d'
const iconId2 = '02n'
const imageUrl1 = `${path.resolve(assetUrl, `${iconId1}.png`)}`;
const imageUrl2 = `${path.resolve(assetUrl, `${iconId2}.png`)}`;

function App () {
    const [imageUrl, setImageUrl] = useState(imageUrl1)
    const [imageShow, setImageShow] = useState(true)
    const [text1height, setText1Height] = useState(70)

    return (
        <Window style={style.window}>
            <View style={style.view1} onClick={() => setText1Height(100)}>
                <View style={[style.view2, { height: text1height }]} onClick={(e) => {setImageShow(!imageShow); e.stopPropagation()}}>
                    <Text style={[style.text1]}>22222</Text>
                </View>
                <View style={style.view3} onClick={(e) => {setImageUrl(imageUrl2); e.stopPropagation()}}></View>
            </View>
            {imageShow && <Image
                style={style.image}
                src={imageUrl}
                onClick={() => console.log(666666)}
            />}
        </Window>
    )
}

const style = {
    window: {
        width: '480px',
        height: '320px',
        'border-width': 3,
        'border-color': '#4169E1',
    },
    view1: {
        width: '80%',
        height: '100px',
        left: 0,
        top: 0,
        "background-grad-color": "#ff0000",
        "background-grad-color-dir": "horizontal",
        'display': 'flex',
        'justify-content': 'center',
        'align-items': 'center',
    },
    view2: {
        width: 50,
        height: 70,
        "background-color": "#00FA9A",
        'transition': 'height 1s'
    },
    view2Press: {
        transform: 'width(100)',
        'transition': 'height 1s'
    },
    view3: {
        width: 50,
        height: 50,
        "background-color": "#00FA9A",
    },
    text1: {
        "font-size": "24px",
        "text-overflow": 'ellipsis',
        width: 50,
        height: 50,
        'text-color': 'red'
    },
    image: {
        'top': 100,
        'left': 0,
        'border-width': 3,
        'border-color': '#4169E1',
        'opacity': 0.4,
        'transform': 'translate(10, 20)'
    }
}

Render.render(<App />);