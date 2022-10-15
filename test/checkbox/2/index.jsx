import { View, Render, Text, Dimensions, Checkbox } from 'lvgljs-ui';
import React, { useState } from 'react';

const { width, height } = Dimensions.window

function App () {
    const [line1Checked, setLine1Checked] = useState()
    const [line2Checked, setLine2Checked] = useState()
    return (
        <View style={style.window}>
            <View style={style.view1}
                onClick={(e) => {
                    const { target } = e
                    const { dataset } = target
                    if (!dataset) return
                    const { index } = dataset
                    if (index == void 0) return
                    if (line1Checked == index) {
                        setLine1Checked()
                    } else {
                        setLine1Checked(index)
                    }
                }}
            >
                <Checkbox
                    text="A1"
                    indicatorStyle={style.indicator}
                    indicatorCheckedStyle={style.indicatorChecked}
                    data-index={1}
                    checked={1 === line1Checked}
                    onChange={e => console.log('checkbox1 checked: ', e.checked)}
                />
                <Checkbox
                    checked={2 === line1Checked}
                    indicatorCheckedStyle={style.indicatorChecked}
                    text="A2"
                    data-index={2}
                    indicatorStyle={style.indicator}
                    onChange={e => console.log('checkbox2 checked: ', e.checked)}
                />
                <Checkbox
                    checked={3 === line1Checked}
                    indicatorCheckedStyle={style.indicatorChecked}
                    text="A3"
                    data-index={3}
                    indicatorStyle={style.indicator}
                    onChange={e => console.log('checkbox3 checked: ', e.checked)}
                />
                <Checkbox
                    checked={4 === line1Checked}
                    indicatorCheckedStyle={style.indicatorChecked}
                    text="A4"
                    data-index={4}
                    indicatorStyle={style.indicator}
                    onChange={e => console.log('checkbox4 checked: ', e.checked)}
                />
                <Checkbox
                    checked={5 === line1Checked}
                    indicatorCheckedStyle={style.indicatorChecked}
                    text="A5"
                    data-index={5}
                    indicatorStyle={style.indicator}
                    onChange={e => console.log('checkbox5 checked: ', e.checked)}
                />
            </View>
            <View style={style.view2}
                onClick={(e) => {
                    const { target } = e
                    const { dataset } = target
                    if (!dataset) return
                    const { index } = dataset
                    if (index == void 0) return
                    if (line2Checked == index) {
                        setLine2Checked()
                    } else {
                        setLine2Checked(index)
                    }
                }}
            >
                <Checkbox
                    checked={1 === line2Checked}
                    indicatorCheckedStyle={style.indicatorChecked}
                    text="A1"
                    indicatorStyle={style.indicator}
                    data-index={1}
                    onChange={e => console.log('checkbox1 checked: ', e.checked)}
                />
                <Checkbox
                    checked={2 === line2Checked}
                    indicatorCheckedStyle={style.indicatorChecked}
                    text="A2"
                    data-index={2}
                    indicatorStyle={style.indicator}
                    onChange={e => console.log('checkbox2 checked: ', e.checked)}
                />
                <Checkbox
                    checked={3 === line2Checked}
                    indicatorCheckedStyle={style.indicatorChecked}
                    text="A3"
                    data-index={3}
                    indicatorStyle={style.indicator}
                    onChange={e => console.log('checkbox3 checked: ', e.checked)}
                />
            </View>
        </View>
    )
};

const style = {
    window: {
        width,
        height,
        'background-color': 'grey',
        'opacity': 0.4
    },
    view1: {
        'border-radius': '8px',
        'display': 'flex',
        'flex-direction': 'column',
        'width': '40%',
        'height': '80%',
        'justify-content': 'center',
        'align-items': 'center'
    },
    view2: {
        'border-radius': '8px',
        'display': 'flex',
        'flex-direction': 'column',
        'width': '40%',
        'height': '80%',
        'left': '50%',
        'justify-content': 'center',
        'align-items': 'center'
    },
    indicator: {
        'border-radius': 9999,
    },
    indicatorChecked: {
        'background-image': null
    }
};

Render.render(<App />);