const bridge = globalThis.SJSJSBridge
const NativeAnimate = bridge.NativeRender.Animate

export const EAnimateEasingFunc = {
    'linear': 'linear',
    'ease-in': 'ease-in',
    'ease-out': 'ease-out',
    'ease-in-out': 'ease-in-out',
    'overshoot': 'overshoot',
    'bounce': 'bounce',
    'step': 'step'
}

let uid = 0
const execCallbackObj = {}
const animateInsObj = {}

globalThis.ANIMIATE_EXEC_CALLBACK = function (uid, value) {
    if (typeof execCallbackObj[uid] === 'function') {
        try {
            execCallbackObj[uid].call(null, value)
        } catch (e) {
            console.log(e)
        }
    }
}

class AnimateManage extends NativeAnimate {
    constructor ({
        duration,
        startValue,
        endValue,
        delay,
        easing,
        execCallback,
        instanceId,
        useNative = false
    }) {
        super()
        this.duration = duration
        this.startValue = startValue
        this.endValue = endValue
        this.delay = delay
        this.easing = easing
        this.execCallback = execCallback
        this.uid = ++uid
        this.instanceId = instanceId
        this.useNative = useNative
    }

    start () {
        const { duration, startValue, endValue, delay, easing, execCallback, uid, instanceId, useNative } = this
        if (!duration || !startValue || !endValue || !execCallback) return

        execCallbackObj[uid] = execCallback
        animateInsObj[uid] = this
        super.start({
            duration,
            startValue,
            endValue,
            easing,
            uid,
            instanceId,
            useNative,
            delay
        })
    }

    release () {
        delete animateInsObj[this.uid]
    }
}

function createTimingAnimate ({
    duration,
    startValue,
    endValue,
    delay,
    easing,
    execCallback
}) {
    return new AnimateManage({
        duration,
        startValue,
        endValue,
        delay,
        easing,
        execCallback
    })
}

export const Animate = {
    timing: createTimingAnimate
}
