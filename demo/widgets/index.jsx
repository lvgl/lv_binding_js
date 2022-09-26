import { View, Render, Text, Image, Dimensions, EAlignType, Button, Tabs } from 'lvgljs-ui';
import React, { useState, useRef, useEffect, useCallback } from 'react';
import Profile from './components/profile'

const { width, height } = Dimensions.window

const colorList = [
    0x2196f3,
    0x4caf50,
    0x9e9e9e,
    0x607d8b,
    0xff9800,
    0xf44336,
    0x9c27b0,
    0x009688
]

const colorsStyle = [
    { 'background-color': 'blue' },
    { 'background-color': 'green' },
    { 'background-color': 'grey' },
    { 'background-color': 'blue-grey' },
    { 'background-color': 'orange' },
    { 'background-color': 'red' },
    { 'background-color': 'purple' },
    { 'background-color': 'teal' },
]

function App () {
    return (
        <View style={style.window}>
            <Tabs
                tabs={["Profile", "Analytics", "Shop"]}
                tabSize={70}
                style={style.tabs}
            >
                <Profile />
                <View>
                    <Text>Tab2</Text>
                </View>
                <View>
                    <Text>Tab3</Text>
                </View>
            </Tabs>
            <View 
                style={style.colorList}
                align={{
                    type: EAlignType.ALIGN_BOTTOM_RIGHT
                }}
            >
            {
                colorsStyle.map((color, i) => (
                    <Button
                        style={[style.colorButton, color]}
                        data-color={colorList[i]}
                    />
                ))
            }
            </View>
        </View>
    )
};

const style = {
    window: {
        'height': height,
        'width': width,
        'padding': 0,
        'border-radius': 0,
        'border-width': 0,
    },
    tabs: {
        'height': 'auto',
        'width': 'auto',
    },
    colorList: {
        'display': 'flex',
        'background-color': 'white',
        'justify-content': 'space-evenly',
        'align-items': 'center',
        'padding-right': 55,
        'border-radius': 0x7FFF,
        'width': '800px',
        'height': '60px',
        'position': 'absolute'
    },
    colorButton: {
        'width': '20px',
        'height': '20px',
        'border-radius': 0x7FFF,
        'opacity': 1,

    }
};

Render.render(<App />);