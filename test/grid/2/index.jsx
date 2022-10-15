import { View, Render, Text, EAlignType, Dimensions } from 'lvgljs-ui';
import React, { useState } from 'react';

const arr = Array(9).fill(1)

const { width, height } = Dimensions.window

function App () {
    return (
        <View style={style.window}>
            {/* line1 */}
            <View style={{ 'grid-child': true, 'align-self': 'stretch','justify-self': 'stretch', 'grid-column-pos': 0, 'grid-row-pos': 0 }}>
                <Text>{"c0, r0"}</Text>
            </View>
            <View style={{ 'grid-child': true, 'align-self': 'stretch','justify-self': 'stretch', 'grid-column-pos': 1, 'grid-row-pos': 0 }}>
                <Text>{"c1, r0"}</Text>
            </View>
            <View style={{ 'grid-child': true, 'align-self': 'stretch','justify-self': 'stretch', 'grid-column-pos': 2, 'grid-row-pos': 0 }}>
                <Text>{"c2, r0"}</Text>
            </View>

            {/* line2 */}
            <View style={{ 'grid-child': true,  'align-self': 'stretch',
        'justify-self': 'stretch', 'grid-column-pos': 0, 'grid-row-pos': 1, 
        'grid-row-span': 2,
         }}>
                <Text>{"c1-2, r1"}</Text>
            </View>

            <View style={{ 'grid-child': true,  'align-self': 'stretch',
        'justify-self': 'stretch', 'grid-column-pos': 1, 'grid-row-pos': 1, 
        'grid-column-span': 2,
         }}>
                <Text>{"c2, r0"}</Text>
            </View>
        </View>
    )
};

const style = {
    window: {
        'width': width,
        'height': height,
        'display': 'grid',
        'grid-template-columns': '70 70 70',
        'grid-template-rows': '50 50 50'
    },
};

Render.render(<App />);