import { View, Text, Render, Dimensions, Arc } from 'lvgljs-ui';
import React, { useState } from 'react';

const { width, height } = Dimensions.window;

function App() {
  const [value, setValue] = useState(35);

  return (
    <View style={style.window}>
      <Arc
        style={style.arc}
        indicatorStyle={style.indicator}
        onIndicatorPressedStyle={style.indicatorPressed}
        onPressedStyle={style.arcPressed}
        knobStyle={style.knob}
        onKnobPressedStyle={style.knobPressed}
        range={[0, 100]}
        value={value}
        rotation={135}
        backgroundStartAngle={0}
        backgroundEndAngle={270}
        startAngle={0}
        endAngle={Math.floor((value / 100) * 270)}
        mode="normal"
        changeRate={360}
        onChange={(e) => setValue(e.value)}
      />
      <Text style={style.text}>{`value: ${Math.round(value)}`}</Text>
      <Text style={style.hint}>Drag the knob or click the arc</Text>
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
    width: 200,
    height: 200,
    'arc-width': 16,
    'arc-color': 'rgb(200,200,200)',
    'arc-rounded': true,
    'background-color': 'white',
  },
  arcPressed: {
    'arc-color': 'rgb(160,160,160)',
  },
  indicator: {
    'arc-width': 16,
    'arc-color': 'cyan',
    'arc-rounded': true,
  },
  indicatorPressed: {
    'arc-color': '0x00838F',
  },
  knob: {
    'background-color': 'white',
    'border-width': 2,
    'border-color': 'cyan',
    'border-radius': 0x7fff,
    padding: 6,
  },
  knobPressed: {
    'background-color': '0x00838F',
    'border-color': '0x00838F',
  },
  text: {
    'text-color': 'black',
    'font-size': 20,
    'padding-top': 10,
  },
  hint: {
    'text-color': 'grey',
    'font-size': 14,
    'padding-top': 4,
  },
};

Render.render(<App />);


