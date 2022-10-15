import { ProcessColor, ProcessPx, ProcessPxOrPercent } from "../util"

export function DisplayStyle (style, result, compName) {
    if (style['display']) {
        result['display'] = style['display']
    }
}