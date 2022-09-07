import { setStyle, handleEvent, EVENTTYPE_MAP, styleGetterProp } from '../config'
import { isValidUrl } from '../../utils/helpers'
import { builtInSymbol } from '../../core/style/symbol'

const fs = require('fs')
const path = require('path')

const bridge = globalThis.SJSJSBridge
const NativeGIF = bridge.NativeRender.NativeComponents.GIF

async function getGIFBinary(url) {
    const resp = await fetch(url, {
        headers: {
            "Content-Type": "application/octet-stream"
        }
    });
    const GIFBuffer = await resp.arrayBuffer();
    return GIFBuffer;
}

function setGIFProps(comp, newProps, oldProps) {
    const setter = {
        set style(styleSheet) {
            setStyle({ comp, styleSheet, compName: 'GIF', styleType: 0x0000, oldStyleSheet: oldProps.style });
        },
        set onClick (fn) {
            handleEvent(comp, fn, EVENTTYPE_MAP.EVENT_CLICKED);
        },
        set src(url) {
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
                            comp.setGIFBinary(data.buffer)
                        })
                        .catch (e => {
                            console.log('setGIF error', e)
                        })
                } else {
                    getGIFBinary(url)
                        .then((buffer) => comp.setGIFBinary(Buffer.from(buffer).buffer))
                        .catch(console.warn);
                }
            }
        },
        set align ({
            type,
            pos = [0, 0]
        }) {
            if (!type || (type === oldProps.align?.type && newProps.align?.pos?.[0] === oldProps.align?.pos?.[0] && newProps.align?.pos?.[1] === oldProps.align?.pos?.[1])) return
            comp.align(type, pos)
        },
        set alignTo ({
            type,
            pos = [0, 0],
            parent
        }) {
            if (!type || (type === oldProps.alignTo?.type && newProps.alignTo?.pos?.[0] === oldProps.alignTo?.pos?.[0] && newProps.alignTo?.pos?.[1] === oldProps.alignTo?.pos?.[1] && parent?.uid === oldProps.alignTo?.parent?.uid)) return
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
  
export class GIFComp extends NativeGIF {
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
        setGIFProps(this, newProps, oldProps);
    }
    insertBefore(child, beforeChild) {
    }
    static tagName = "GIF";
    appendInitialChild(child) {
    }
    appendChild(child) {
        
    }
    removeChild(child) {
        
    }
    close () {
    }
    setStyle (style, type = 0x0000) {
        setStyle({ comp: this, styleSheet: style, compName: "GIF", styleType: type, oldStyleSheet: null, isInit: false })
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