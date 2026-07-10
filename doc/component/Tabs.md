# Component Tabs mapping [lvgl lv_tabview)](https://docs.lvgl.io/master/widgets/tabview.html)

Each child of Tabs becomes the content of one tab, matched in order with the names in the tabs prop.

## Api
- [style](../api/style.md)
- [moveToFront](../api/moveToFront.md)
- [moveToBackground](../api/moveToBackground.md)
- [setStyle](../api/setStyle.md)
- [scrollIntoView](../api/scrollIntoView.md)

## Props
- [style](../props/style.md)
- [align](../props/align.md)
- [alignTo](../props/alignTo.md)
- [onClick](../props/onClick.md)
- [onPressed](../props/onPressed.md)
- [onLongPressed](../props/onLongPressed.md)
- [onLongPressRepeat](../props/onLongPressRepeat.md)
- tabs, set the name of each tab button, each child of Tabs is matched to a tab name in order
    - type String[]
- tabPosition, control [the position of the tab buttons](https://docs.lvgl.io/master/widgets/tabview.html), only applied on creation, with following values
    - left, top (default), right, bottom
- tabSize, control the size of the tab buttons area (height for top/bottom position, width for left/right position), only applied on creation
    - type Number

## Usage
```jsx
import { Tabs, View, Text } from 'lvlgjs-ui'

function Component () {
    return (
        <Tabs
            style={style.tabs}
            tabs={['Profile', 'Analytics', 'Shop']}
            tabPosition="top"
            tabSize={70}
        >
            <View style={style.tabContent}>
                <Text>Profile tab content</Text>
            </View>
            <View style={style.tabContent}>
                <Text>Analytics tab content</Text>
            </View>
            <View style={style.tabContent}>
                <Text>Shop tab content</Text>
            </View>
        </Tabs>
    )
}

const style = {
    tabs: {
        width: 480,
        height: 320,
    },
    tabContent: {
        width: '100%',
        height: '100%',
    },
}
```

## Demo
demo/widgets
