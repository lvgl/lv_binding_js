import { View, Render, Text, Animate, Dimensions, EAlignType, Button, Tabs, Theme } from 'lvgljs-ui';
import React, { useState, useRef, useEffect, useCallback } from 'react';
import Profile from './components/profile'
import Analytics from './components/analytics';
import Shop from './components/shop'

const { width, height } = Dimensions.window

const colorList = [
    0x2196f3,
    0x4caf50,
    0x9e9e9e,
    0x607d8b,
    0xff9800,
    0xf44336,
    0x9c27b0,
    0x009688
]

const colorsStyle = [
    { 'background-color': 'blue' },
    { 'background-color': 'green' },
    { 'background-color': 'grey' },
    { 'background-color': 'blue-grey' },
    { 'background-color': 'orange' },
    { 'background-color': 'red' },
    { 'background-color': 'purple' },
    { 'background-color': 'teal' },
]

function App () {
    const [colorListExpand, setColorListExpand] = useState(false)
    const colorListItemsRef = useRef([])
    const wrapperRef = useRef()
    const colorListRef = useRef()

    return (
        <View ref={wrapperRef} style={style.window}>
            <Tabs
                tabs={["Profile", "Analytics", "Shop"]}
                tabSize={70}
                style={style.tabs}
            >
                <Profile />
                <Analytics />
                <Shop />
            </Tabs>
            <View
                style={style.colorList}
                align={{
                    type: EAlignType.ALIGN_BOTTOM_RIGHT,
                    pos: [-10, -10]
                }}
                ref={colorListRef}
            >
                {
                    colorsStyle.map((color, i) => (
                        <Button
                            ref={ins => colorListItemsRef.current[i] = ins}
                            style={[style.colorListButton, color]}
                            data-color={colorList[i]}
                            onClick={(e) => {
                                const { dataset } = e.target
                                const { color } = dataset

                                Theme.setTheme({
                                    primaryColor: color
                                })
                            }}
                        />
                    ))
                }
            </View>
            <Button
                style={style.colorButton}
                align={{
                    type: EAlignType.ALIGN_BOTTOM_RIGHT,
                    pos: [-15, -15]
                }}
                onClick={() => {
                    setColorListExpand(!colorListExpand)
                    const width = wrapperRef.current.style.width - 20
                    if (!colorListExpand) {
                        const animate = Animate.timing({
                            duration: 200,
                            startValue: 0,
                            endValue: 256,
                            execCallback: (value) => {
                                colorListRef.current.setStyle({
                                    width: Math.floor((value / 256) * (width - 60) + 60),
                                })
                                colorListItemsRef.current.forEach(item => {
                                    item.setStyle({
                                        opacity: (value / 256).toFixed(2),
                                    })
                                })
                            }
                        })
                        animate.start()
                    } else {
                        const animate = Animate.timing({
                            duration: 200,
                            startValue: 256,
                            endValue: 0,
                            execCallback: (value) => {
                                colorListRef.current.setStyle({
                                    width: Math.floor((value / 256) * (width - 60) + 60),
                                })
                                colorListItemsRef.current.forEach(item => {
                                    item.setStyle({
                                        opacity: (value / 256).toFixed(2),
                                    })
                                })
                            }
                        })
                        animate.start()
                    }
                }}
            />
        </View>
    )
};

const style = {
    window: {
        'height': height,
        'width': width,
        'padding': 0,
        'border-radius': 0,
        'border-width': 0,
    },
    tabs: {
        'height': 'auto',
        'width': 'auto',
    },
    colorList: {
        'display': 'flex',
        'background-color': 'white',
        'justify-content': 'space-evenly',
        'align-items': 'center',
        'padding-right': 55,
        'border-radius': 0x7FFF,
        'width': '60px',
        'height': '60px',
        'position': 'absolute',
        'overflow': 'hidden'
    },
    colorListButton: {
        'width': '20px',
        'height': '20px',
        'border-radius': 0x7FFF,
        'opacity': 0,
    },
    colorButton: {
        'position': 'absolute',
        'padding': 10,
        'border-radius': 0x7FFF,
        'shadow-width': 0,
        'background-image': 'tint',
        'width': '50px',
        'height': '50px',
    }
};

Render.render(<App />);