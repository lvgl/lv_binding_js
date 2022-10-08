import { Calendar, Render, Line, EAlignType, Button } from 'lvgljs-ui';
import React, { useState } from 'react';

function App () {

    return (
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
    )
};

const style = {
    calendar: {
        'width': 185,
        'height': 185,
    }
};

Render.render(<App />);