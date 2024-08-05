import { View, Switch, Checkbox, Text, Chart, Image, Input, Dropdownlist, Button, Dimensions, BUILT_IN_SYMBOL } from 'lvgljs-ui';
import React, { useState, useRef, useEffect, useCallback } from 'react';

const { width, height } = Dimensions.window

function getRandom (n, m) {
    var num = Math.floor(Math.random() * (m - n + 1) + n)
    return num
}

export default function App () {
    const [list, setList] = useState([
        {
            name: 'Blue jeans',
            category: 'Clothes',
            price: '$722'
        },
        {
            name: 'Blue jeans',
            category: 'Clothes',
            price: '$411'
        },
        {
            name: 'Blue jeans',
            category: 'Clothes',
            price: '$917'
        },
        {
            name: 'Blue jeans',
            category: 'Clothes',
            price: '$64'
        },
        {
            name: 'Blue jeans',
            category: 'Clothes',
            price: '$805'
        },
    ])

    return (
        <View style={style.shopWrapper}>
            <View style={style.panel1}>
                <Text style={style.panel_text1}>Monthly Summary</Text>
                <Text style={style.panel_text2}>8-15 July, 2021</Text>
                <Text style={style.panel_text3}>$27,123.25</Text>
                <Text style={style.panel_text4}>{BUILT_IN_SYMBOL['up']} 17% growth this week</Text>
                <Chart
                    style={style.panel1_chart}
                    type="bar"
                    divLineCount={[6, 0]}
                    pointNum={12}
                    leftAxisOption={{
                        majorLen: 0,
                        minorLen: 0,
                        majorNum: 6,
                        minorNum: 1,
                        drawSize: 80
                    }}
                    bottomAxisOption={{
                        majorLen: 0,
                        minorLen: 0,
                        majorNum: 7,
                        minorNum: 1,
                        drawSize: 50
                    }}
                    leftAxisData={[
                        {
                            data: [
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
                        }
                    ]}
                />
            </View>
            <View style={style.subWrapper}>
                <View style={style.list}>
                    <Text style={style.list_text1}>Top products</Text>
                    {
                        list.map(item => (
                            <View style={style.list_item_wrapper}>
                                <Image
                                    style={style.list_item_image1}
                                    src="./demo/widgets/assets/clothes.png"
                                />
                                <Text style={style.list_item_text1}>{item.name}</Text>
                                <Text style={style.list_item_text2}>{item.category}</Text>
                                <Text style={style.list_item_text3}>{item.price}</Text>
                            </View>
                        ))
                    }
                </View>
                <View style={style.notify}>
                    <Text style={style.notift_text1}>Notification</Text>
                    <Checkbox
                        text="Item purchased"
                    />
                    <Checkbox
                        text="New connection"
                    />
                    <Checkbox
                        text="New subscriber"
                        checked={true}
                    />
                    <Checkbox
                        text="New message"
                        disabled={true}
                    />
                    <Checkbox
                        text="New message"
                        disabled={true}
                        checked={true}
                    />
                    <Checkbox
                        text="Out of stock"
                    />
                </View>
            </View>
        </View>
    )
}

const style = {
    shopWrapper: {
        'height': '100%',
        'width': '100%',
        'display': 'flex',
        'flex-direction': 'column'
    },
    panel1: {
        'width': '100%',
        'height': 'auto',
        'display': 'grid',
        'padding-bottom': '30px',
        'grid-template-columns': '1fr 1fr',
        'grid-template-rows': 'auto auto 20 auto auto',
    },
    panel_text1: {
        'font-size': '24px',

        'grid-child': true,
        'grid-column-pos': 0,
        'grid-column-span': 1,
        'justify-self': 'start',
        'align-self': 'start',
        'grid-row-pos': 0,
        'grid-row-span': 1,
    },
    panel_text2: {
        'opacity': '0.5',

        'grid-child': true,
        'grid-column-pos': 0,
        'grid-column-span': 1,
        'justify-self': 'start',
        'align-self': 'start',
        'grid-row-pos': 1,
        'grid-row-span': 1,
    },
    panel_text3: {
        'font-size': '24px',

        'grid-child': true,
        'grid-column-pos': 0,
        'grid-column-span': 1,
        'justify-self': 'start',
        'align-self': 'start',
        'grid-row-pos': 3,
        'grid-row-span': 1,
    },
    panel_text4: {
        'text-color': 'green',

        'grid-child': true,
        'grid-column-pos': 0,
        'grid-column-span': 1,
        'justify-self': 'start',
        'align-self': 'start',
        'grid-row-pos': 4,
        'grid-row-span': 1,
    },
    panel1_chart: {
        'width': '100%',
        'height': '100%',
        'column-spacing': '30%',

        'grid-child': true,
        'grid-column-pos': 1,
        'grid-column-span': 1,
        'justify-self': 'stretch',
        'align-self': 'stretch',
        'grid-row-pos': 0,
        'grid-row-span': 5,
    },
    subWrapper: {
        'display': 'flex',
        'flex-direction': 'row',
        'width': '100%',
        'height': 'auto',
        'border-width': 0,
        'outline-width': 0,
        'padding': 0
    },
    list: {
        'height': 'auto',
        'max-height': '300px',
        'display': 'flex',
        'flex-direction': 'column',
        'flex-grow': 1
    },
    list_text1: {
        'font-size': '24px',
    },
    list_item_wrapper: {
        'width': '100%',
        'height': 'auto',
        'display': 'grid',
        'grid-template-columns': 'auto 5 1fr 1fr',
        'grid-template-rows': '1fr 1fr',
    },
    list_item_image1: {
        'grid-child': true,
        'grid-column-pos': 0,
        'grid-column-span': 1,
        'justify-self': 'start',
        'align-self': 'start',
        'grid-row-pos': 0,
        'grid-row-span': 2,
    },
    list_item_text1: {
        'grid-child': true,
        'grid-column-pos': 2,
        'grid-column-span': 1,
        'justify-self': 'start',
        'align-self': 'end',
        'grid-row-pos': 0,
        'grid-row-span': 1,
    },
    list_item_text2: {
        'opacity': '0.5',

        'grid-child': true,
        'grid-column-pos': 2,
        'grid-column-span': 1,
        'justify-self': 'start',
        'align-self': 'start',
        'grid-row-pos': 1,
        'grid-row-span': 1,
    },
    list_item_text3: {
        'grid-child': true,
        'grid-column-pos': 3,
        'grid-column-span': 1,
        'justify-self': 'end',
        'align-self': 'end',
        'grid-row-pos': 0,
        'grid-row-span': 1,
    },
    notify: {
        'height': 'auto',
        'max-height': '300px',
        'display': 'flex',
        'flex-direction': 'column',
        'flex-grow': 1
    },
    notift_text1: {
        'font-size': '24px',
    }
}
