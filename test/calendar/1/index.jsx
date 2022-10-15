import { Calendar, Render, Line, EAlignType, Button } from 'lvgljs-ui';
import React, { useState } from 'react';

function App () {

    return (
        <Calendar
            style={style.calendar}
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
        'width': 285,
        'height': 285,
    }
};

Render.render(<App />);