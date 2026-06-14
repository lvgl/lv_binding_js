import { Chart, Render, View, Text, EAlignType } from 'lvgljs-ui';
import React, { useState, useRef } from 'react';

const captureMode = tjs.env.TEST_CAPTURE === '1';

let captureRndStep = 0;

function getRandom (n, m) {
    if (captureMode) {
        const step = captureRndStep++;
        if (n === 60) {
            return [72, 84, 68, 77, 63, 88, 71, 79, 66, 82, 74, 69][step];
        }
        return [18, 32, 24, 15, 28, 21, 35, 12, 27, 19, 31, 22][step - 12];
    }
    return Math.floor(Math.random() * (m - n + 1) + n);
}

const data1 = [
    getRandom(60, 90),
    getRandom(60, 90),
    getRandom(60, 90),
    getRandom(60, 90),
    getRandom(60, 90),
    getRandom(60, 90),
    getRandom(60, 90),
    getRandom(60, 90),
    getRandom(60, 90),
    getRandom(60, 90),
    getRandom(60, 90),
    getRandom(60, 90),
]

const data2 = [
    getRandom(10, 40),
    getRandom(10, 40),
    getRandom(10, 40),
    getRandom(10, 40),
    getRandom(10, 40),
    getRandom(10, 40),
    getRandom(10, 40),
    getRandom(10, 40),
    getRandom(10, 40),
    getRandom(10, 40),
    getRandom(10, 40),
    getRandom(10, 40),
]

const list = [
    {
        color: 'red',
        data: data1
    },
    {
        color: 'green',
        data: data2
    }
]

function App () {
    const chartRef = useRef()
    const [boxesPos, setBoxesPos] = useState([])
    return (
        <React.Fragment>
            <Chart
                ref={chartRef}
                style={style.chart}
                leftAxisData={list}
                align={{
                    type: EAlignType.ALIGN_CENTER,
                }}
                onPressed={(e) => {
                    const { pressedPointPos = [], pressedPoint } = e
                    const { left: chartLeft, top: chartTop, width: chartWidth, height: chartHeight } = chartRef.current.style
                    setBoxesPos(pressedPointPos.map(item => ({
                        left: item.x + chartLeft - 20,
                        top: item.y + chartTop - 30,
                        width: 40,
                        height: 20,
                        index: pressedPoint
                    })))
                }}
                onReleased={e => {
                    setBoxesPos([])
                }}
            />
            {
                boxesPos.map((item, i) => (
                    <View style={[style.box, { left: item.left, top: item.top, width: item.width, height: item.height }]}>
                        <Text 
                            style={style.boxText} 
                            align={{
                                type: EAlignType.ALIGN_CENTER,
                            }}
                        >
                            {i == 0 ? data1[item.index] : data2[item.index]}
                        </Text>
                    </View>
                ))
            }
        </React.Fragment>
    )
};

const style = {
    wrapper: {
        height: '100%',
        width: '100%'
    },
    chart: {
        'width': 200,
        'height': 150,
        'transform': 'scaleX(3)'
    },
    box: {
        'border-radius': 3,
        'background-opacity': 0.5,
        'background-color': 'black',
        'overflow': 'hidden'
    },
    boxText: {
        'text-color': 'white',
        'font-size': '12px'
    }
};

Render.render(<App />);