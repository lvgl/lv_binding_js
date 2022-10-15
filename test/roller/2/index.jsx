import { View, Render, Dimensions, Roller, EAlignType, Button } from 'lvgljs-ui';
import React, { useState } from 'react';

const { width, height } = Dimensions.window

const items = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10"
]

function App () {
    const [list, setList] = useState(items)

    return (
        <View style={style.window}>
            <Roller
                align={{
                    type: EAlignType.ALIGN_LEFT_MID,
                    pos: [10, 0]
                }}
                options={list}
                selectIndex={2}
                visibleRowCount={2}
                onChange={(e) => {
                    console.log(e.value)
                }}
                infinity={false}
                style={style.roller1}
                selectedStyle={style.selected}
            />
            <Roller
                align={{
                    type: EAlignType.ALIGN_CENTER,
                    pos: [0, 0]
                }}
                options={list}
                selectIndex={5}
                visibleRowCount={3}
                onChange={(e) => {
                    console.log(e.value)
                }}
                infinity={false}
                style={style.roller2}
                selectedStyle={style.selected}
            />
            <Roller
                align={{
                    type: EAlignType.ALIGN_RIGHT_MID,
                    pos: [-10, 0]
                }}
                options={list}
                selectIndex={8}
                visibleRowCount={4}
                onChange={(e) => {
                    console.log(e.value)
                }}
                infinity={false}
                style={style.roller3}
                selectedStyle={style.selected}
            />
        </View>
    )
};

const style = {
    window: {
        width,
        height
    },
    roller1: {
        'width': '100px',
        'text-align': 'left'
    },
    roller2: {
        'text-align': 'center'
    },
    roller3: {
        'width': '80px',
        'text-align': 'right'
    },
    selected: {
        'font-size': '20px'
    }
};

Render.render(<App />);