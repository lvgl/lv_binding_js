import { Text, Render, Window, Roller, EAlignType, Button } from 'lvgljs-ui';
import React, { useState } from 'react';

const items1 = [
    "Apple",
    "Banana",
    "Orange",
    "Cherry",
    "Grape",
    "Raspberry",
    "Melon",
    "Orange",
    "Lemon",
    "Nuts",
]

const items2 = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
]

function App () {
    const [list, setList] = useState(items1)

    return (
        <Window style={style.window}>
            <Button 
                style={style.button1}
                onClick={() => setList(items1)}>
                <Text>use list1</Text>
            </Button>
            <Button
                style={style.button2}
                onClick={() => setList(items2)}>
                <Text>use list2</Text>
            </Button>
            <Roller
                align={{
                    type: EAlignType.ALIGN_TOP_MID,
                    pos: [0, 30]
                }}
                options={list}
                selectIndex={2}
                visibleRowCount={4}
                onChange={(e) => {
                    console.log(e.value)
                }}
                infinity={true}
            />
        </Window>
    )
};

const style = {
    window: {
        'width': '480px',
        'height': '320px',
    },
    button1: {
        left: 5,
        top: 5,
    },
    button2: {
        left: 5,
        top: 45
    }
};

Render.render(<App />);