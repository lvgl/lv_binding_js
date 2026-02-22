import { Calendar, Render, Button, Text, EAlignType, View } from 'lvgljs-ui';
import React, { useState } from 'react';
import { Dimensions } from 'lvgljs-ui';

const { width, height } = Dimensions.window

function App () {
    const [pos, setPos] = useState([0, 0])
    return (
        <View style={style.window}>
            <Button onClick={() => { 
                setPos(prevPos => {
                    return [prevPos[0] + 10, prevPos[1] + 10];
                });
            }}>
                <Text>Click me</Text>
            </Button>
            <Calendar
                style={style.calendar}
                today={"2025-10-1"}
                shownMonth={"2025-10"}
                highLightDates={[
                    "2025-10-10",
                    "2025-10-11",
                ]}
                align={{
                    type: EAlignType.ALIGN_CENTER,
                    pos: pos
                }}
                onChange={(e) => { console.log(e.value) }}
            />
        </View>
    )
};

const style = {
    window: {
        width: width,
        height: height,
    },
    calendar: {
        'width': 285,
        'height': 285,
    }
};

Render.render(<App />);