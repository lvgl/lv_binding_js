import { Chart, Render, Line, EAlignType } from 'lvgljs-ui';
import React, { useState, useEffect } from 'react';

function App () {

    return (
        <Chart
            style={style.chart}
            type={"bar"}
            pointNum={12}
            leftAxisRange={[0, 100]}
            rightAxisRange={[0, 400]}
            bottomAxisLabels={[
                'Jan',
                'Febr',
                'March',
                'Apr',
                'May',
                'Jun',
                'July',
                'Aug',
                'Sept',
                'Oct',
                'Nov',
                'Dec'
            ]}
            leftAxisOption={{
                majorLen: 10,
                minorLen: 5,
                majorNum: 6,
                minorNum: 2,
                drawSize: 50
            }}
            bottomAxisOption={{
                majorLen: 10,
                minorLen: 5,
                majorNum: 12,
                minorNum: 3,
                drawSize: 40
            }}
            rightAxisOption={{
                majorLen: 10,
                minorLen: 5,
                majorNum: 3,
                minorNum: 4,
                drawSize: 50
            }}
            leftAxisData={[
                {
                    color: '#00FA9A',
                    data: [
                        31,
                        66,
                        10,
                        89,
                        63,
                        56,
                        32,
                        35,
                        57,
                        85,
                        22,
                        58
                    ]
                },
            ]}
            rightAxisData={[
                {
                    color: '#008080',
                    data: [
                        92,
                        71,
                        61,
                        15,
                        21,
                        35,
                        35,
                        58,
                        31,
                        53,
                        33,
                        73
                    ]
                }
            ]}
            align={{
                type: EAlignType.ALIGN_CENTER,
            }}
        />
    )
};

const style = {
    chart: {
        'width': 200,
        'height': 150,
        'transform': 'scaleX(3)'
    }
};

Render.render(<App />);