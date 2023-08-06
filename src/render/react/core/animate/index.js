const bridge = globalThis.SJSJSBridge;
const NativeAnimate = bridge.NativeRender.Animate;

export const EAnimateEasingFunc = {
  linear: "linear",
  "ease-in": "ease-in",
  "ease-out": "ease-out",
  "ease-in-out": "ease-in-out",
  overshoot: "overshoot",
  bounce: "bounce",
  step: "step",
};

let uid = 0;
const callbackObj = {};
const animateInsObj = {};

globalThis.ANIMIATE_CALLBACK = function (uid, ...args) {
  if (typeof callbackObj[uid] === "function") {
    try {
      callbackObj[uid].call(null, ...args);
    } catch (e) {
      console.log(e);
    }
  }
};

class AnimateBase extends NativeAnimate {
  constructor({
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
    repeatCount,
    startCallback,
    readyCallback,
  }) {
    super();
    this.duration = duration;
    this.startValue = startValue;
    this.endValue = endValue;
    this.delay = delay;
    this.easing = easing;
    this.execCallback = execCallback;
    this.instanceId = instanceId;
    this.useNative = useNative;
    this.playBackDelay = playBackDelay;
    this.playBackTime = playBackTime;
    this.repeatDelay = repeatDelay;
    this.repeatCount = repeatCount;
    this.startCallback = startCallback;
    this.readyCallback = readyCallback;
  }

  start() {
    const {
      duration,
      startValue,
      endValue,
      delay,
      easing,
      execCallback,
      instanceId,
      useNative,
      playBackDelay,
      playBackTime,
      repeatDelay,
      repeatCount = 0,
      startCallback,
      readyCallback,
    } = this;
    if (
      duration == void 0 ||
      startValue == void 0 ||
      endValue == void 0 ||
      !execCallback
    )
      return;
    if (!useNative && typeof execCallback === "function") {
      callbackObj[++uid] = execCallback;
      this.execUid = uid;
    }
    if (typeof startCallback === "function") {
      callbackObj[++uid] = startCallback;
      this.startCbUid = uid;
    }
    if (typeof readyCallback === "function") {
      callbackObj[++uid] = readyCallback;
      this.readyCbUid = uid;
    }
    animateInsObj[++uid] = this;
    this.uid = uid;
    super.start({
      duration,
      startValue,
      endValue,
      easing,
      instanceId,
      useNative,
      delay,
      playBackDelay,
      playBackTime,
      repeatDelay,
      repeatCount: !isFinite(repeatCount) ? 0xffff : repeatCount,
      uid: this.uid,
      execUid: this.execUid,
      startCbUid: this.startCbUid,
      readyCbUid: this.readyCbUid,
    });
  }

  release() {
    delete animateInsObj[this.uid];
  }
}

function createTimingAnimate(params) {
  return new AnimateBase(params);
}

class ParallelAnimate {
  constructor(animates) {
    this.animates = animates;
  }

  start() {
    this.animates.forEach((animate) => {
      if (animate instanceof AnimateBase) {
        animate?.start();
      }
    });
  }
}

function createParallelAnimate() {
  const animates = Array.from(arguments[0]);
  return new ParallelAnimate(animates);
}

export const Animate = {
  timing: createTimingAnimate,
  parallel: createParallelAnimate,
};
