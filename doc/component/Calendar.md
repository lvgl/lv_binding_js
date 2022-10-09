# Component Keyboard mapping [lvgl lv_calendar)](https://docs.lvgl.io/master/widgets/calendar.html#overview)

It's used to realize a virtual keyboard to write texts into a Text area.

## Api
- [style](../api/style.md)
- [moveToFront](../api/moveToFront.md)
- [moveToBackground](../api/moveToBackground.md)
- [setStyle](../api/setStyle.md)
- [scrollIntoView](../api/scrollIntoView.md)

## Props
- [style](../props/style.md)
- [align](../props/align.md)
- [alignTo](../props/alignTo.md)
- today
  - will highlight the current day
- shownMonth
  - set the shown date
- highLightDates
  - The list of highlighted dates
- [onChange](../props/onChange/1.md)

## Usage
```jsx
import { Calendar, Render, EAlignType } from 'lvgljs-ui';
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
```

## Demo
test/calendar
