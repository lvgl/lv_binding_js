import { View, Render, Window, Text, EAlignType, Image, Button } from 'lvgljs-ui';
import React, { useState } from 'react';

function App () {
    const [list, setlist] = useState(Array(2).fill(1))

    return (
        <Window style={style.window}>
            <View 
                style={style.view1}
                align={{
                    type: EAlignType.ALIGN_CENTER,
                }}
            >
                {
                    list.map((_, i) => (
                        <View style={style.view2} key={i}>
                            <Image src="audio" />
                            <Text>{`Track ${i + 1}`}</Text>
                        </View>
                    ))
                }
                <Button 
                    style={style.button}
                    align={{
                        type: EAlignType.ALIGN_BOTTOM_RIGHT,
                    }}
                    onClick={() => {
                        setlist(Array(list.length + 1).fill(1))
                    }}
                >
                </Button>
            </View>
        </Window>
    )
};

const style = {
    window: {
        'width': '480px',
        'height': '320px',
    },
    view1: {
        'width': 280,
        'height': 220,
        'display': 'flex',
        'flex-direction': 'column',
    },
    view2: {
        'display': 'flex',
        'flex-direction': 'row',
        'width': '100%',
        'height': 'auto'
    },
    button: {
        'position': 'absolute',
        'border-radius': 9999,
        'width': 30,
        'height': 30,
        'background-image': 'plus'
    },
    image: {
        'width': 'auto',
        'height': 'auto',
    }
};

Render.render(<App />);