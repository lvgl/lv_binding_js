# The transform property lets you rotate, scale, or translate an element

## Syntax
- transform: rotate(10deg)
- transform: translate(10px, 20px)
- transform: scale(1.5)
- transform: translate-x(10px)
- transform: translate-y(20px)
- transform: transform-width(20px)
- transform: transform-height(20px)
- transform: translate-y(20px) scale(1.5) rotate(10deg)

## Usage
```jsx
function App () {
    return (
        <Window style={style.window}>
            <GIF
                align={{
                    type: EAlignType.ALIGN_CENTER,
                }}
                style={style.gif}
                src="http://p0.itc.cn/q_70/images03/20200807/9405b7432e34421b866f35a087812b6f.gif"
            />
        </Window>
    )
};

const style = {
    window: {
        'width': width,
        'height': height,
    },
    gif: {
        'width': 'auto',
        'height': 'auto',
        'transform': 'rotate(60deg)'
    }
};
```