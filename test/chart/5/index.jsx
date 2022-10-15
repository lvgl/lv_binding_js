import { Chart, Render, Line, EAlignType } from 'lvgljs-ui';
import React, { useState, useEffect } from 'react';

function getRandom (n, m) {
    var num = Math.floor(Math.random() * (m - n + 1) + n)
    return num
}

let index = 0

function App () {
    const [data, setData] = useState(Array(50).fill(0).map(item => [getRandom(0, 200), getRandom(0, 1000)]))

    useEffect(() => {
        setInterval(() => {
            const d = [...data]
            d[index] = [getRandom(0, 200), getRandom(0, 1000)]
            setData(d)
            index++
        }, 200)
    }, [])

    return (
        <Chart
            style={style.chart}
            type="scatter"
            scatterData={[
                {
                    color: 'red',
                    data: data
                },
            ]}
            align={{
                type: EAlignType.ALIGN_CENTER,
            }}
            pointNum={50}
            bottomAxisOption={{
                majorLen: 5,
                minorLen: 5,
                majorNum: 5,
                minorNum: 1,
                drawSize: 30
            }}
            leftAxisOption={{
                majorLen: 10,
                minorLen: 5,
                majorNum: 6,
                minorNum: 5,
                drawSize: 50
            }}
            leftAxisRange={[0, 1000]}
            bottomAxisRange={[0, 200]}
            itemStyle={style.itemStyle}
        />
    )
};

const style = {
    chart: {
        'width': 200,
        'height': 150,
    },
    itemStyle: {
        'line-width': 0
    }
};

Render.render(<App />);