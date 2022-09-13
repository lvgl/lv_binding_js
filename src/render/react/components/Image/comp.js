import { setStyle, handleEvent, EVENTTYPE_MAP, styleGetterProp } from '../config'
import { isValidUrl } from '../../utils/helpers'
import { builtInSymbol } from '../../core/style/symbol'
import { CommonComponentApi } from '../common/index'

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
        ...CommonComponentApi({ compName: 'Image', comp, newProps, oldProps }),
        onClick (fn) {
            handleEvent(comp, fn, EVENTTYPE_MAP.EVENT_CLICKED);
        },
        src(url) {
            if (url && url !== oldProps.src) {
                if (builtInSymbol[url]) {
                    comp.setSymbol(builtInSymbol[url])
                    return
                }
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
    }
    Object.keys(setter).forEach(key => {
        if (newProps[key]) {
            setter[key](newProps[key])
        }
    })
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
    moveToFront () {
        super.moveToFront()
    }
    moveToBackground () {
        super.moveToBackground()
    }
    scrollIntoView () {
        super.scrollIntoView()
    }
}