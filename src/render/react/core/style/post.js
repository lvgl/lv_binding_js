import { isValidUrl } from '../../utils/helpers'

const path = require('path')
const fs = require('fs')

async function getImageBinary(url) {
    const resp = await fetch(url, {
    });
    const imageBuffer = await resp.arrayBuffer();
    return imageBuffer;
}

export function PostProcessStyle ({comp, styleSheet, styleType}) {
    if (styleSheet['background-image'] !== undefined) {
        let url = styleSheet['background-image']
        if (url === null) {
            comp.setBackgroundImage(null, styleType)
        } else if (!isValidUrl(url)) {
            if (!path.isAbsolute(url)) {
                url = path.resolve(__dirname, url)
            }
            fs.readFile(url, { encoding: 'binary' })
                .then(data => {
                    comp.setBackgroundImage(data.buffer, styleType)
                })
                .catch (e => {
                    console.log('setBackground error', e)
                })
        } else {
            
                getImageBinary(url)
                    .then((buffer) => comp.setBackgroundImage(Buffer.from(buffer).buffer), styleType)
                    .catch(console.warn);
            
        }
    }
}