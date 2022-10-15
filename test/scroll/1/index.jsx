import { View, Render, Dimensions, Text, EAlignType, Button } from 'lvgljs-ui';
import React, { useState } from 'react';

const { width, height } = Dimensions.window

function App () {

    return (
        <View style={style.window}>
            <View 
                style={style.view}
                align={{
                    type: EAlignType.ALIGN_CENTER
                }}
            >
                <View style={style.child1}><Text>Zero</Text></View>
                <View style={style.child2}>
                    <Button style={style.button1}>
                        <Text>Right</Text>
                    </Button>
                </View>
                <View style={style.child3}><Text>Bottom</Text></View>
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
        'width': 200,
        'height': 200,
    },
    child1: {
        'left': 0,
        'top': 0,
        'width': 70,
        'height': 70,
        'display': 'flex',
        'align-items': 'center',
        'justify-content': 'center'
    },
    child2: {
        'left': 160,
        'top': 80,
        'width': 80,
        'height': 80,
    },
    child3: {
        'left': 40,
        'top': 160,
        'width': 100,
        'height': 70,
        'display': 'flex',
        'align-items': 'center',
        'justify-content': 'center'
    },
    child4: {

    },
    button1: {
        'width': 100,
        'height': 50,
        'display': 'flex',
        'align-items': 'center',
        'justify-content': 'center'
    }
};

Render.render(<App />);