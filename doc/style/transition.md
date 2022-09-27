The style mapping [lvgl style transition](https://docs.lvgl.io/master/overview/style.html#transitions)

## Feature
It's possible to set
- the time of the transition
- the delay before starting the transition
- the animation path (also known as timing or easing function)
- the properties to animate

## Value
transition with following properties:
- transition-property, supoort multiple values, sets the properties to which a transition effect should be applied
- transition-duration, support write with millisecond, second
- transition-timing-function, sets how intermediate values are calculated for properties being affected by a transition effect, with following value
  - linear
  - ease-in
  - ease-out
  - ease-in-out
  - overshoot
  - bounce
  - step
- transition-delay, support write with millisecond, second

## Usage
```jsx
function App () {
    return (
        <Window style={style.window}>
            <View 
                align={{
                    type: EAlignType.ALIGN_CENTER
                }} 
                style={style.view}
                onPressedStyle={style.pressedStyle}    
            >{`Text of a label`}</View>
        </Window>
    )
};

const style = {
    window: {
        'width': '480px',
        'height': '320px',
    },
    view: {
        'transition-property': 'border-width, background-color, border-color',
        'transition-duration': '100ms',
        'transition-timing-function': 'linear',
        'transition-delay': '200ms',
    },
    pressedStyle: {
        'border-width': 6,
        'border-color': 'red',
        'background-color': 'red',
        'transition-property': 'border-width, background-color, border-color',
        'transition-duration': '0.5s',
        'transition-timing-function': 'linear',
        'transition-delay': '0',
    }
};
```