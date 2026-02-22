import { View, Text, Render, Dimensions, Arc, Button } from 'lvgljs-ui';
import React, { useMemo, useState } from 'react';

const { width, height } = Dimensions.window;

const modes: Array<'normal' | 'symmetrical' | 'reverse'> = [
  'normal',
  'symmetrical',
  'reverse',
];

function App() {
  const [modeIndex, setModeIndex] = useState(0);
  const [rotation, setRotation] = useState(0);
  const [rangeToggle, setRangeToggle] = useState(false);
  const [value, setValue] = useState(10);

  const mode = modes[modeIndex];
  const range: [number, number] = useMemo(
    () => (rangeToggle ? [-50, 50] : [0, 100]),
    [rangeToggle],
  );

  return (
    <View style={style.window}>
      <Arc
        style={style.arc}
        indicatorStyle={style.indicator}
        knobStyle={style.knob}
        range={range}
        value={value}
        rotation={rotation}
        backgroundStartAngle={0}
        backgroundEndAngle={270}
        startAngle={0}
        endAngle={270}
        mode={mode}
        changeRate={360}
        onChange={(e) => setValue(e.value)}
      />

      <Text style={style.text}>
        {`mode: ${mode}  rotation: ${rotation}°  range: [${range[0]}, ${range[1]}]  value: ${Math.round(
          value,
        )}`}
      </Text>

      <View style={style.controls}>
        <Button
          style={style.button}
          onPressedStyle={style.buttonPressed}
          onClick={() => setModeIndex((i) => (i + 1) % modes.length)}
        >
          <Text style={style.buttonText}>Mode</Text>
        </Button>

        <Button
          style={style.button}
          onPressedStyle={style.buttonPressed}
          onClick={() => setRotation((r) => (r + 30) % 360)}
        >
          <Text style={style.buttonText}>Rotate +30</Text>
        </Button>

        <Button
          style={style.button}
          onPressedStyle={style.buttonPressed}
          onClick={() => setRangeToggle((t) => !t)}
        >
          <Text style={style.buttonText}>Toggle Range</Text>
        </Button>

        <Button
          style={style.button}
          onPressedStyle={style.buttonPressed}
          onClick={() => {
            setModeIndex(0);
            setRotation(0);
            setRangeToggle(false);
            setValue(10);
          }}
        >
          <Text style={style.buttonText}>Reset</Text>
        </Button>
      </View>
    </View>
  );
}

const style = {
  window: {
    width,
    height,
    display: 'flex',
    'flex-direction': 'column',
    'justify-content': 'center',
    'align-items': 'center',
  },
  arc: {
    width: 220,
    height: 220,
    'arc-width': 18,
    'arc-color': 'rgb(210,210,210)',
    'arc-rounded': true,
    'background-color': 'white',
  },
  indicator: {
    'arc-width': 18,
    'arc-color': '0x4caf50',
    'arc-rounded': true,
  },
  knob: {
    'background-color': 'white',
    'border-width': 2,
    'border-color': '0x4caf50',
    'border-radius': 0x7fff,
    padding: 6,
  },
  text: {
    width: width - 20,
    'text-color': 'black',
    'font-size': 14,
    'text-align': 'center',
    'padding-top': 12,
    'padding-bottom': 12,
  },
  controls: {
    width: width - 20,
    display: 'flex',
    'flex-direction': 'row',
    'justify-content': 'space-evenly',
    'align-items': 'center',
  },
  button: {
    width: 90,
    height: 44,
    'border-width': 2,
    'border-color': 'grey',
    'background-color': 'white',
    'border-radius': 12,
    display: 'flex',
    'justify-content': 'center',
    'align-items': 'center',
  },
  buttonPressed: {
    'border-color': '0x4caf50',
    'border-width': 3,
  },
  buttonText: {
    'text-color': 'black',
    'font-size': 12,
    'text-align': 'center',
  },
};

Render.render(<App />);


