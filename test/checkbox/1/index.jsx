import { View, Render, Text, Dimensions, Checkbox } from 'lvgljs-ui';
import React, { useState } from 'react';

const { width, height } = Dimensions.window

function App () {
    return (
        <View style={style.window}>
            <Checkbox
                checked={false}
                text="Apple"
                onChange={e => console.log('checkbox1 checked: ', e.checked)}
            />
            <Checkbox
                checked={false}
                text="Banana"
                onChange={e => console.log('checkbox2 checked: ', e.checked)}
            />
            <Checkbox
                checked={false}
                disabled={true}
                text="Lemon"
                onChange={e => console.log('checkbox3 checked: ', e.checked)}
            />
            <Checkbox
                checked={false}
                text={`Melon\nand a new line`}
                onChange={e => console.log('checkbox4 checked: ', e.checked)}
            />
        </View>
    )
};

const style = {
    window: {
        width,
        height,
        'display': 'flex',
        'justify-content': 'center',
        'align-items': 'flex-start',
        'flex-direction': 'column',
        'align-content': 'center'
    }
};

Render.render(<App />);