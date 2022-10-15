import { Chart, Render, Line, EAlignType } from 'lvgljs-ui';
import React, { useState, useEffect } from 'react';

let index1 = 0
let index2 = 0

function App () {
    const [data1, setData1] = useState([65,10,10,10,10,10,10,30,70,90])
    const [data2, setData2] = useState([90,70,65,65,65,65,65,65,65,65])

    useEffect(() => {
        setInterval(() => {
            const data11 = [...data1]
            const data22 = [...data2]
            data11[index1++] = Math.floor(Math.random() * 100)
            data22[index2++] = Math.floor(Math.random() * 100)

            if (index1 >= data1.length) {
                index1 = 0
            }
            if (index2 >= data2.length) {
                index2 = 0
            }

            setData1(data11)
            setData2(data22)
        }, 200)
    }, [])

    return (
        <Chart
            style={style.chart}
            leftAxisData={[
                {
                    color: 'red',
                    data: data1
                },
                {
                    color: 'green',
                    data: data2
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
    }
};

Render.render(<App />);