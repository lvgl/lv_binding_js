import { getUid, setStyle, handleOnClick } from '../config'
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
            setStyle(comp, styleSheet, 'Image');
        },
        set onClick (fn) {
            handleOnClick(comp, fn);
        },
        set src(url) {
            if (url && url !== oldProps.url) {
                if (!isValidUrl(url)) {
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
    Object.assign(setter, newProps);
}
  
export class ImageComp extends NativeImage {
    constructor (props) {
        const uid = getUid()
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
}