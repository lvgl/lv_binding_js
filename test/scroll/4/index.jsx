import { View, Render, Dimensions, Text, EAlignType, Image, Button } from 'lvgljs-ui';
import React, { useState, useRef, useEffect } from 'react';

const { width, height } = Dimensions.window

function App () {
    return (
        <View style={style.window}>
            <View 
                style={style.view1}
                align={{
                    type: EAlignType.ALIGN_CENTER,
                }}
                scrollbarStyle={style.scrollbarStyle}
                onScrollbarScrollingStyle={style.onScrollbarScrollingStyle}
            >
                <Text>
                    {`Lorem ipsum dolor sit amet, consectetur adipiscing elit.\n
                    Etiam dictum, tortor vestibulum lacinia laoreet, mi neque consectetur neque, vel mattis odio dolor egestas ligula. \n
                    Sed vestibulum sapien nulla, id convallis ex porttitor nec. \n
                    Duis et massa eu libero accumsan faucibus a in arcu. \n
                    Ut pulvinar odio lorem, vel tempus turpis condimentum quis. Nam consectetur condimentum sem in auctor. \n
                    Sed nisl augue, venenatis in blandit et, gravida ac tortor. \n
                    Etiam dapibus elementum suscipit. \n
                    Proin mollis sollicitudin convallis. \n
                    Integer dapibus tempus arcu nec viverra. \n
                    Donec molestie nulla enim, eu interdum velit placerat quis. \n
                    Donec id efficitur risus, at molestie turpis. \n
                    Suspendisse vestibulum consectetur nunc ut commodo. \n
                    Fusce molestie rhoncus nisi sit amet tincidunt. \n
                    Suspendisse a nunc ut magna ornare volutpat.`}
                </Text>
            </View>
        </View>
    )
};

const style = {
    window: {
        width,
        height
    },
    view1: {
        'width': 200,
        'height': 100,
    },
    scrollbarStyle: {
        'width': '4px',
        'padding': '5px 5px 0 0',
        'border-radius': 2,
        'background-opacity': 0.7,
        'background-color': 'blue',
        'border-color': '#03A9F4',
        'border-width': 2,
        'shadow-width': 8,
        'shadow-spread': 2,
        'shadow-color': '#3949AB',
        'transition': 'background-opacity 0.2s linear 0, width 0.2s linear 0'
    },
    onScrollbarScrollingStyle: {
        'width': 8,
        'background-opacity': 1
    }
};

Render.render(<App />);