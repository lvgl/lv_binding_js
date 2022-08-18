import { View, Render, Window, Text, EAlignType, Keyboard, Input } from 'lvgljs-ui';
import React, { useState, useRef, useEffect } from 'react';

function App () {
    const [value1, setValue1] = useState('')
    const [value2, setValue2] = useState('')

    const ref1 = useRef()
    const ref2 = useRef()
    const [focus, setFocus] = useState(1)
    const [didMount, setDidMount] = useState(false)

    useEffect(() => {
        setDidMount(true)
    }, [])
    return (
        <Window style={style.window}>
            {didMount && <Text 
                style={style.text1}
                alignTo={{
                    type: EAlignType.ALIGN_OUT_TOP_LEFT,
                    parent: ref1.current
                }}
            >Password</Text>}
            <Input
                mode="password"
                onChange={e => {
                    console.log('input 1 is: ', e.value)
                    setValue1(e.value)
                }}
                value={value1}
                style={style.input1}
                ref={ref1}
                onFocus={() => {
                    console.log('input1 focus')
                    setFocus(1)
                }}
                placeholder={"enter plz"}
            />
            <Input
                onChange={e => {
                    console.log('input 2 is: ', e.value)
                    setValue2(e.value)
                }}
                value={value2}
                style={style.input2}
                align={{
                    type: EAlignType.ALIGN_TOP_RIGHT,
                    pos: [-5, 20]
                }}
                ref={ref2}
                onFocus={() => {
                    console.log('input2 focus')
                    setFocus(2)
                }}
                placeholder={"enter plz"}
            />
            {didMount && <Text 
                alignTo={{
                    type: EAlignType.ALIGN_OUT_TOP_LEFT,
                    parent: ref2.current
                }}
            >Text</Text>}
            {didMount && <Keyboard
                style={style.keyboard}
                textarea={focus == 1 ? ref1.current : focus == 2 ? ref2.current : null}
                mode={"number"}
            />}
        </Window>
    )
};

const style = {
    window: {
        'width': '480px',
        'height': '320px',
    },
    text1: {
        
    },
    text2: {

    },
    input1: {
        'width': '40%',
        'left': '5px',
        'top': '20px'
    },
    input2: {
        'width': '40%',
    },
    keyboard: {
        'width': '100%',
        'height': '50%',
    }
};

Render.render(<App />);