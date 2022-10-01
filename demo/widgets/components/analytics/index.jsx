import { View, Switch, Slider, Text, Image, Input, Chart, Button, Dimensions, BUILT_IN_SYMBOL } from 'lvgljs-ui';
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { EAlignType } from '../../../../src/render/react/components/config';

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

export default function Analytics () {
    return (
        <View style={style.analyticsWrapper}>
            <View style={style.wrapper1}>
                <Text style={style.title1}>Unique visitors</Text>
                <Chart
                    style={style.chart1}
                    pointNum={12}
                    divLineCount={[0, 12]}
                    leftAxisOption={{
                        majorLen: 0,
                        minorLen: 0,
                        majorNum: 5,
                        minorNum: 1,
                        drawSize: 80
                    }}
                    bottomAxisOption={{
                        majorLen: 0,
                        minorLen: 0,
                        majorNum: 12,
                        minorNum: 1,
                        drawSize: 50
                    }}
                    leftAxisData={[
                        getRandomInt(80),
                        getRandomInt(80),
                        getRandomInt(80),
                        getRandomInt(80),
                        getRandomInt(80),
                        getRandomInt(80),
                        getRandomInt(80),
                        getRandomInt(80),
                        getRandomInt(80),
                        getRandomInt(80),
                        getRandomInt(80),
                        getRandomInt(80),
                    ]}
                />
            </View>
            <View style={style.wrapper2}>
                <Text style={style.title2}>Monthly revenue</Text>
                <Chart
                    style={style.chart2}
                    type={'bar'}
                    pointNum={12}
                    divLineCount={[6, 0]}
                    leftAxisOption={{
                        majorLen: 0,
                        minorLen: 0,
                        majorNum: 5,
                        minorNum: 1,
                        drawSize: 80
                    }}
                    bottomAxisOption={{
                        majorLen: 0,
                        minorLen: 0,
                        majorNum: 12,
                        minorNum: 1,
                        drawSize: 50
                    }}
                    leftAxisData={[
                        getRandomInt(80),
                        getRandomInt(80),
                        getRandomInt(80),
                        getRandomInt(80),
                        getRandomInt(80),
                        getRandomInt(80),
                        getRandomInt(80),
                        getRandomInt(80),
                        getRandomInt(80),
                        getRandomInt(80),
                        getRandomInt(80),
                        getRandomInt(80),
                    ]}
                />
            </View>
        </View>
    )
}

const style = {
    analyticsWrapper: {
        'display': 'flex',
        'flex-direction': 'column',
        'width': '100%',
        'height': '100%',
    },
    wrapper1: {
        'display': 'grid',
        'grid-template-columns': '20 1fr',
        'grid-template-rows': 'auto 1fr 10',
        'height': 300,
        'width': '100%',
    },
    title1: {
        'grid-child': true,
        'grid-column-pos': 0,
        'grid-column-span': 2,
        'justify-self': 'start',
        'align-self': 'start',
        'grid-row-pos': 0,
        'grid-row-span': 1,
    },
    chart1: {
        'grid-child': true,
        'grid-column-pos': 1,
        'grid-column-span': 1,
        'justify-self': 'stretch',
        'align-self': 'stretch',
        'grid-row-pos': 1,
        'grid-row-span': 1,

        'border-radius': 0,
        'border-side': 'bottom-left'
    },
    wrapper2: {
        'display': 'grid',
        'grid-template-columns': '20 1fr',
        'grid-template-rows': 'auto 1fr 10',
        'height': 300,
        'width': '100%',
    },
    title2: {
        'grid-child': true,
        'grid-column-pos': 0,
        'grid-column-span': 2,
        'justify-self': 'start',
        'align-self': 'start',
        'grid-row-pos': 0,
        'grid-row-span': 1,
    },
    chart2: {
        'grid-child': true,
        'grid-column-pos': 1,
        'grid-column-span': 1,
        'justify-self': 'stretch',
        'align-self': 'stretch',
        'grid-row-pos': 1,
        'grid-row-span': 1,

        'border-radius': 0,
        'border-side': 'bottom-left'
    },
}