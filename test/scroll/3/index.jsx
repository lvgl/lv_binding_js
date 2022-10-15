import { View, Render, Dimensions, Text, EAlignType, Image, Button } from 'lvgljs-ui';
import React, { useState, useRef, useEffect } from 'react';

const { width, height } = Dimensions.window

function App () {
    const [list, setlist] = useState(Array(2).fill(1))
    const button = useRef()
    const lastItem = useRef()

    useEffect(() => {
        lastItem.current?.scrollIntoView()
    }, [list])

    return (
        <View style={style.window}>
            <View 
                style={style.view1}
                align={{
                    type: EAlignType.ALIGN_CENTER,
                }}
            >
                {
                    list.map((_, i) => (
                        <View 
                            style={style.view2} 
                            key={i} 
                            ref={(ins) => {
                                if (i == list.length - 1) {
                                    lastItem.current = ins
                                }
                            }}
                        >
                            <Image src="audio" />
                            <Text>{`Track ${i + 1}`}</Text>
                        </View>
                    ))
                }
                <Button 
                    style={style.button}
                    ref={button}
                    align={{
                        type: EAlignType.ALIGN_BOTTOM_RIGHT,
                    }}
                    onClick={() => {
                        setlist(Array(list.length + 1).fill(1))
                        button.current?.moveToFront()
                    }}
                >
                </Button>
            </View>
        </View>
    )
};

const style = {
    window: {
        width,
        height
    },
    view1: {
        'width': 280,
        'height': 220,
        'display': 'flex',
        'flex-direction': 'column',
    },
    view2: {
        'display': 'flex',
        'flex-direction': 'row',
        'width': '100%',
        'height': 'auto'
    },
    button: {
        'position': 'absolute',
        'border-radius': 9999,
        'width': 30,
        'height': 30,
        'background-image': 'plus'
    },
    image: {
        'width': 'auto',
        'height': 'auto',
    }
};

Render.render(<App />);