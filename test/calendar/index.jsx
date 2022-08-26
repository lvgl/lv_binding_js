import { Calendar, Render, Window, Line, EAlignType, Button } from 'lvgljs-ui';
import React, { useState } from 'react';

function App () {

    return (
        <Window style={style.window}>
            <Calendar
                today={"2022-10-1"}
                shownMonth={"2022-10"}
                highLightDates={[
                    "2022-10-10",
                    "2022-10-11",
                ]}
                align={{
                    type: EAlignType.ALIGN_CENTER,
                    pos: [0, 27]
                }}
                onChange={(e) => { console.log(e.value) }}
            />
        </Window>
    )
};

const style = {
    window: {
        'width': '480px',
        'height': '320px',
    },
    calendar: {
        'width': 185,
        'height': 185,
    }
};

Render.render(<App />);