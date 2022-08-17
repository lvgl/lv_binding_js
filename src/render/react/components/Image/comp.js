import { setStyle, handleEvent, EVENTTYPE_MAP, styleGetterProp } from '../config'
import { isValidUrl } from '../../utils/helpers'

const fs = require('fs')
const path = require('path')

const bridge = globalThis.SJSJSBridge
const NativeImage = bridge.NativeRender.NativeComponents.Image

async function getImageBinary(url) {
    const resp = await fetch(url, {
    });
    const imageBuffer = await resp.arrayBuffer();
    return imageBuffer;
}

function setImageProps(comp, newProps, oldProps) {
    const setter = {
        set style(styleSheet) {
            setStyle({ comp, styleSheet, compName: 'Image', styleType: 0x0000, oldStyleSheet: oldProps.style });
        },
        set onClick (fn) {
            handleEvent(comp, fn, EVENTTYPE_MAP.EVENT_CLICKED);
        },
        set onPressed (fn) {
            handleEvent (comp, fn, EVENTTYPE_MAP.EVENT_PRESSED);
        },
        set onLongPressed (fn) {
            handleEvent (comp, fn, EVENTTYPE_MAP.EVENT_LONG_PRESSED);
        },
        set onLongPressRepeat (fn) {
            handleEvent (comp, fn, EVENTTYPE_MAP.EVENT_LONG_PRESSED_REPEAT);
        },
        set src(url) {
            if (url && url !== oldProps.src) {
                if (!isValidUrl(url)) {
                    if (!path.isAbsolute(url)) {
                        url = path.resolve(__dirname, url)
                    }
                    fs.readFile(url, { encoding: 'binary' })
                        .then(data => {
                            comp.setImageBinary(data.buffer)
                        })
                        .catch (e => {
                            console.log('setImage error', e)
                        })
                } else {
                    getImageBinary(url)
                        .then((buffer) => comp.setImageBinary(Buffer.from(buffer).buffer))
                        .catch(console.warn);
                }
            }
        },
        set align ({
            type,
            pos = [0, 0]
        }) {
            if (!type || (type === oldProps.align?.type && pos[0] === oldProps.align?.pos[0] && pos[1] === oldProps.align?.pos[1])) return
            comp.align(type, pos)
        },
        set alignTo ({
            type,
            pos = [0, 0],
            parent
        }) {
            if (!type || (type === oldProps.alignTo?.type && pos[0] === (oldProps.alignTo?.pos?.[0] || 0) && pos[1] === (oldProps.alignTo?.pos?.[1] || 0) && parent?.uid === oldProps.alignTo?.parent?.uid)) return
            comp.alignTo(type, pos, parent)
        }
    }
    Object.assign(setter, newProps);
    comp.dataset = {}
    Object.keys(newProps).forEach(prop => {
        const index = prop.indexOf('data-')
        if (index === 0) {
            comp.dataset[prop.substring(5)] = newProps[prop]
        }
    })
}
  
export class ImageComp extends NativeImage {
    constructor ({ uid }) {
        super({ uid })
        this.uid = uid

        const style = super.style
        const that = this
        this.style = new Proxy(this, {
            get (obj, prop) {
                if (styleGetterProp.includes(prop)) {
                    return style[prop].call(that)
                }
            }
        })
    }
    setProps(newProps, oldProps) {
        setImageProps(this, newProps, oldProps);
    }
    insertBefore(child, beforeChild) {
    }
    static tagName = "Image";
    appendInitialChild(child) {
    }
    appendChild(child) {
        
    }
    removeChild(child) {
        
    }
    close () {
    }

    setStyle (style, type = 0x0000) {
        setStyle({ comp: this, styleSheet: style, compName: "Image", styleType: type, oldStyleSheet: null, isInit: false })
    }
}