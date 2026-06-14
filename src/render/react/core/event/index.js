import { getInstance } from "../reconciler";
import { EVENT_TYPE_MAP } from "../lv_types";

const eventMap = {};

/** @deprecated Use EVENT_TYPE_MAP from lv_types; kept for existing imports. */
export const EVENTTYPE_MAP = EVENT_TYPE_MAP;

export function registEvent(uid, eventType, fn) {
  eventMap[uid] = eventMap[uid] || {};
  eventMap[uid][eventType] = fn;
}

export function unRegistEvent(uid, eventType) {
  if (!eventType) {
    delete eventMap[uid];
  } else {
    const obj = eventMap[uid];
    obj && delete obj[eventType];
  }
}

export function fireEvent(targetUid, currentTargetUid, eventType, e) {
  const obj = eventMap[currentTargetUid];
  const target = getInstance(targetUid);
  const currentTarget = getInstance(currentTargetUid);
  if (obj) {
    e.target = target;
    e.currentTarget = currentTarget;
    try {
      obj[eventType].call(null, e);
    } catch (err) {
      console.log(err);
    }
  }
}

export function handleEvent(comp, fn, type) {
  if (fn) {
    registEvent(comp.uid, type, fn);
    comp.addEventListener(type);
  } else {
    unRegistEvent(comp.uid, type);
    comp.removeEventListener(type);
  }
}

globalThis.FIRE_QEVENT_CALLBACK = fireEvent;
