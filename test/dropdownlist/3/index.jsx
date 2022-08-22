import { Text, Render, Window, Dropdownlist, EAlignType, EDropdownlistDirection, EDropdownListArrowDirection } from 'lvgljs-ui';
import React, { useState } from 'react';

const items1 = [
    "Apple",
    "Banana",
    "Orange",
    "Cherry",
]

function App () {
    const [list, setList] = useState(items1)

    return (
        <Window style={style.window}>
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
        </Window>
    )
};

const style = {
    window: {
        'width': '480px',
        'height': '320px',
    },
};

Render.render(<App />);