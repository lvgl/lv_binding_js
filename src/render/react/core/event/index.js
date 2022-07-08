const eventMap = {}

export function registEvent (uid, eventType, fn) {
    eventMap[uid] = eventMap[uid] || {}
    eventMap[uid][eventType] = fn
}

export function unRegistEvent (uid, eventType) {
    if (!eventType) {
        delete eventMap[uid]
    } else {
        const obj = eventMap[uid]
        obj && delete obj[eventType]
    }
}

export function fireEvent (uid, eventType, e) {
    const obj = eventMap[uid]
    if (obj) {
        try {
            obj[eventType].call(null, e);
        } catch (err) {
            console.log(err)
        }
    }
}

globalThis.FIRE_QEVENT_CALLBACK = fireEvent