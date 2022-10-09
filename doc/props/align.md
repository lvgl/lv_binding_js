# Component prop align

Prop align mapping lvgl lv_obj_align

<br/>

## Value
align value object with the following type
- type, enum EAlignType
- pos, x、y position

<br/>

EAlignType with the following type
- ALIGN_DEFAULT mapping LV_ALIGN_DEFAULT
- ALIGN_TOP_LEFT mapping LV_ALIGN_TOP_LEFT
- ALIGN_TOP_MID mapping LV_ALIGN_TOP_MID
- ALIGN_TOP_RIGHT mapping LV_ALIGN_TOP_RIGHT
- ALIGN_BOTTOM_LEFT mapping LV_ALIGN_BOTTOM_LEFT
- ALIGN_BOTTOM_MID mapping LV_ALIGN_BOTTOM_MID
- ALIGN_BOTTOM_RIGHT mapping LV_ALIGN_BOTTOM_RIGHT
- ALIGN_LEFT_MID mapping LV_ALIGN_LEFT_MID
- ALIGN_RIGHT_MID mapping LV_ALIGN_RIGHT_MID
- ALIGN_CENTER mapping LV_ALIGN_CENTER
- ALIGN_OUT_TOP_LEFT mapping LV_ALIGN_OUT_TOP_LEFT
- ALIGN_OUT_TOP_MID mapping LV_ALIGN_OUT_TOP_MID
- ALIGN_OUT_TOP_RIGHT mapping LV_ALIGN_OUT_TOP_RIGHT
- ALIGN_OUT_BOTTOM_LEFT mapping LV_ALIGN_OUT_BOTTOM_LEFT
- ALIGN_OUT_BOTTOM_MID mapping LV_ALIGN_OUT_BOTTOM_MID
- ALIGN_OUT_BOTTOM_RIGHT mapping LV_ALIGN_OUT_BOTTOM_RIGHT
- ALIGN_OUT_LEFT_TOP mapping LV_ALIGN_OUT_LEFT_TOP
- ALIGN_OUT_LEFT_MID mapping LV_ALIGN_OUT_LEFT_MID
- ALIGN_OUT_LEFT_BOTTOM mapping LV_ALIGN_OUT_LEFT_BOTTOM
- ALIGN_OUT_RIGHT_TOP mapping LV_ALIGN_OUT_RIGHT_TOP
- ALIGN_OUT_RIGHT_MID mapping LV_ALIGN_OUT_RIGHT_MID
- ALIGN_OUT_RIGHT_BOTTOM mapping LV_ALIGN_OUT_RIGHT_BOTTOM


## Usage
```jsx
import { View, EAlignType, Text } from 'lvlgjs-ui'

function Component () {
    return (
       <View
          align={{
            type: EAlignType.ALIGN_CENTER,
            pos: [10, 0]
        }}
      >
      </View>
    )
}
```