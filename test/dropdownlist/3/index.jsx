import { View, Render, Dimensions, Dropdownlist, EAlignType, EDropdownlistDirection, EDropdownListArrowDirection } from 'lvgljs-ui';
import React, { useState } from 'react';

const items1 = [
    "Apple",
    "Banana",
    "Orange",
    "Cherry",
]

const { width, height } = Dimensions.window

function App () {
    const [list, setList] = useState(items1)

    return (
        <View style={style.window}>
            <Dropdownlist
                align={{
                    type: EAlignType.ALIGN_TOP_LEFT,
                    pos: [10, 10]
                }}
                items={list}
                onChange={(e) => {
                    console.log(e.value)
                }}
                text={"Menu"}
                highlightSelect={false}
            />
        </View>
    )
};

const style = {
    window: {
        width,
        height
    },
};

Render.render(<App />);