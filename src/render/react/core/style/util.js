import { colorTransform } from './color'

export function ProcessPx (key, value, result) {
    if (!value) return null
    if (!isNaN(value)) {
        return result[key] = value
    }
    value = value.replace(/(^\s*)|(\s*$)/g, "")
    const reg = /(\d+\.?\d*)(px)?$/
    value = value.match(reg)?.[1]

    if (!isNaN(value)) {
        result[key] = value
    }
}

export function ProcessPxOrPercent (key, value, result) {
    if (value === 'auto') {
        return result[key] = 2001 | 1 << 13
    }
    if (!isNaN(value)) {
        return result[key] = value
    }
    value = value.replace(/(^\s*)|(\s*$)/g, "")
    const reg1 = /(\d+\.?\d*)(%)?$/
    const reg2 = /(\d+\.?\d*)(px)?$/

    const value2 = value.match(reg2)?.[1]
    if (!isNaN(value2)) {
        return result[key] = value2
    }

    const value1 = value.match(reg1)?.[1]
    if (!isNaN(value1)) {
        return result[`${key}_pct`] = value1
    }
}

export function ProcessEnum (obj) {
    return (key, value, result) => {
        if (obj[value]) {
            result[key] = obj[value]
        }
    }
}

export function ProcessColor (key, value, result) {
    value = colorTransform(value)
    if (!isNaN(value)) {
        result[key] = value
    }
}

export function NormalizeTime (value) {
    if (!value) return null
    if (!isNaN(value)) return value
    const reg = /([^ms]+)(ms|s)/
    const [_, time, unit] = value.match(reg)
    if (!isNaN(time)) {
        if (unit == 's') {
            return time * 1000
        } else if (unit == 'ms') {
            return time
        }
    }
    return null
}

export function ProcessScale (key, value, result) {
    if (!value && isNaN(value)) return null
    result[key] = Math.floor(value * 256)
}