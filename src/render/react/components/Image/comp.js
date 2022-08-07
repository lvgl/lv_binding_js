import { setStyle, handleEvent, EVENTTYPE_MAP, unRegistEvent } from '../config'
import { isValidUrl } from '../../utils/helpers'

const fs = require('fs')
const path = require('path')

const bridge = globalThis.SJSJSBridge
const NativeImage = bridge.NativeRender.NativeComponents.Image

async function getImageBinary(url) {
    const resp = await fetch(url, {
        headers: {
            "Content-Type": "application/octet-stream"
        }
    });
    const imageBuffer = await resp.arrayBuffer();
    return imageBuffer;
}

function setImageProps(comp, newProps, oldProps) {
    const setter = {
        set style(styleSheet) {
            setStyle(comp, styleSheet, 'Image', 0x0000, oldProps.style);
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
            if (!type || !parent || !parent.uid) return
            comp.alignTo(type, pos, parent.__proto__)
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
}