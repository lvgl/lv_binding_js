The style mapping [lvgl style transition](https://docs.lvgl.io/master/overview/style.html#transitions)

## Feature
It's possible to set
- the time of the transition
- the delay before starting the transition
- the animation path (also known as timing or easing function)
- the properties to animate

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
        'transition': 'background-color 0.1s linear 0.2s, border-color 0.1s linear 0.2s, border-width 0.1s linear 0.2s'
    },
    pressedStyle: {
        'border-width': 6,
        'border-color': 'red',
        'background-color': 'red',
        'transition': 'background-color 0.5s linear 0, border-color 0.5s linear 0, border-width 0.5s linear 0'
    }
};
```