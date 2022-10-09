# Symbol mapping [lvgl Fonts Symbol](https://docs.lvgl.io/master/overview/font.html)

## Value
the following symbols are also added to the built-in fonts:

audio、video、list、ok、close、power、settings、home、download、drive、refresh、mute、volume_mid、volume_max、image、tint、prev、play、pause、stop、next、eject、left、right、plus、minus、eye_open、eye_close、warning、shuffle、up、down、loop、directory、upload、call、cut、copy、save、bars、envelope、charge、paste、bell、keyboard、gps、file、wifi、battery_full、battery_3、battery_2、battery_1、battery_empty、usb、bluetooth、trash、edit、backspace、sd_card、newline、dummy

## Usage
```jsx
import { Image, Text, BUILT_IN_SYMBOL } from 'lvlgjs-ui'
import { useRef } from 'react'

function Component () {
    const ref = useRef()
    useEffect(() => {
        console.log(ref.current.moveToFront())
    }, [])

    return (
       <React.Fragment>
          <Text>{BUILT_IN_SYMBOL.audio}<Text>
          <Image
              src={"audio"}
          ></Image>
       </React.Fragment>
    )
}
```