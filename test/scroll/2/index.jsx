import { View, Render, Dimensions, Text, EAlignType, Button } from 'lvgljs-ui';
import React, { useState } from 'react';

const { width, height } = Dimensions.window

function App () {

    return (
        <View style={style.window}>
            <View 
                style={style.view}
                align={{
                    type: EAlignType.ALIGN_CENTER,
                    pos: [0, 20]
                }}
            >
                {
                    Array(2).fill(1).map((item, i) => (
                        <Button style={style.button}>
                            <Text>{`Panel ${i + 1}`}</Text>
                        </Button>
                    ))
                }
                <Button style={style.nosnap}>
                    <Text>{`Panel 3 no-snap`}</Text>
                </Button>
                {
                    Array(7).fill(1).map((item, i) => (
                        <Button style={style.button}>
                            <Text>{`Panel ${i + 4}`}</Text>
                        </Button>
                    ))
                }
            </View>
        </View>
    )
};

const style = {
    window: {
       width,
       height
    },
    view: {
        'width': 280,
        'height': 120,
        'display': 'flex',
        'flex-direction': 'row',
        'scroll-snap-x': 'snap_center'
    },
    button: {
        'width': 150,
        'height': '100%',
        'display': 'flex',
        'align-items': 'center',
        'justify-content': 'center',
    },
    nosnap: {
        'width': 150,
        'height': '100%',
        'display': 'flex',
        'align-items': 'center',
        'justify-content': 'center',
        'scroll-enable-snap': false
    }
};

Render.render(<App />);