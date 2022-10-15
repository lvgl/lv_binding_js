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
                    type: EAlignType.ALIGN_TOP_MID,
                    pos: [0, 10]
                }}
                items={list}
                onChange={(e) => {
                    console.log(e.value)
                }}
                arrow={EDropdownListArrowDirection.down}
            />
            <Dropdownlist
                align={{
                    type: EAlignType.ALIGN_BOTTOM_MID,
                    pos: [0, -10]
                }}
                items={list}
                onChange={(e) => {
                    console.log(e.value)
                }}
                direction={EDropdownlistDirection.up}
                arrow={EDropdownListArrowDirection.up}
            />
            <Dropdownlist
                align={{
                    type: EAlignType.ALIGN_LEFT_MID,
                    pos: [10, 0]
                }}
                items={list}
                onChange={(e) => {
                    console.log(e.value)
                }}
                direction={EDropdownlistDirection.right}
                arrow={EDropdownListArrowDirection.right}
            />
            <Dropdownlist
                align={{
                    type: EAlignType.ALIGN_RIGHT_MID,
                    pos: [-10, 0]
                }}
                items={list}
                onChange={(e) => {
                    console.log(e.value)
                }}
                direction={EDropdownlistDirection.left}
                arrow={EDropdownListArrowDirection.left}
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