import { View, Render, Window, Text, Image } from 'lvgljs-ui';
import React from 'react';

const path = require('path')

const rootDir = path.resolve(__dirname, "./");
const assetUrl = path.resolve(rootDir, "assets/icons");

function App () {
    const iconId = '01d'
    const imageUrl = `${path.resolve(assetUrl, `${iconId}.png`)}`;

    return (
        <Window style={style.window}>
            <View style={style.view1} onClick={() => console.log(22222)}>
                <View style={style.view2} onClick={(e) => {console.log(3333333); e.stopPropagation()}}>
                    <Text style={style.text1}>22222</Text>
                </View>
                <View style={style.view3} onClick={(e) => {console.log(4444444); e.stopPropagation()}}></View>
            </View>
            <Image
                style={style.image}
                src={imageUrl}
            />
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
        "background-color": "#ff0000",
        'display': 'flex',
        'justify-content': 'center',
        'align-content': 'center'
    },
    view2: {
        width: 50,
        height: 50,
        "background-color": "#00FA9A",
        'display': 'flex',
        'justify-content': 'center',
        'align-content': 'center'
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
        height: 50
    },
    image: {
        'top': 100,
        'left': 0,
        'border-width': 3,
        'border-color': '#4169E1',
        'width': '175px',
        'height': '120px'
    }
}

Render.render(<App />);