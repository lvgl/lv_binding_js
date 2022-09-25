import { View, Render, Text, Image, Dimensions, EAlignType, Button, Tabs } from 'lvgljs-ui';
import React, { useState, useRef, useEffect, useCallback } from 'react';
import Profile from './components/profile'

const { width, height } = Dimensions.window

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
    }
};

Render.render(<App />);