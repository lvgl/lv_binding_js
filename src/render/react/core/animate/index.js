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

class AnimateBase extends NativeAnimate {
    constructor ({
        duration,
        startValue,
        endValue,
        delay,
        easing,
        execCallback,
        instanceId,
        useNative = false,
        playBackDelay,
        playBackTime,
        repeatDelay,
        repeatCount
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
        this.playBackDelay = playBackDelay
        this.playBackTime = playBackTime
        this.repeatDelay = repeatDelay
        this.repeatCount = repeatCount
    }

    start () {
        const { 
            duration, 
            startValue, 
            endValue, 
            delay, 
            easing, 
            execCallback, 
            uid, 
            instanceId, 
            useNative,
            playBackDelay,
            playBackTime,
            repeatDelay,
            repeatCount
        } = this
        if (duration == void 0 || startValue == void 0 || endValue == void 0 || !execCallback) return

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
            delay,
            playBackDelay,
            playBackTime,
            repeatDelay,
            repeatCount
        })
    }

    release () {
        delete animateInsObj[this.uid]
    }
}

function createTimingAnimate (params) {
    return new AnimateBase(params)
}

class ParallelAnimate {
    constructor (animates) {
        this.animates = animates
    }

    start () {
        this.animates.forEach(animate => {
            if (animate instanceof AnimateBase) {
                animate?.start()
            }
        })
    }
}

function createParallelAnimate() {
    const animates = Array.from(arguments[0])
    return new ParallelAnimate(animates)
}

export const Animate = {
    timing: createTimingAnimate,
    parallel: createParallelAnimate
}
