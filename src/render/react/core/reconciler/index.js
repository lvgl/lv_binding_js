import { getComponentByTagName } from "../../components/config";
import { unRegistEvent } from "../event";
import Reconciler from "react-reconciler";

let id = 1;

export const getUid = () => {
  return String(id++);
};

const HOST_CHILDREN = Symbol("hostChildren");
const DETACHED = Symbol("detached");

// React reconciler 0.25.1 may skip per-child removeChild when an entire subtree is
// deleted (e.g. Mask + Calendar). Track host children ourselves so detachInstance can
// walk and close them before the parent.

const instanceMap = new Map();

export const getInstance = (uid) => {
  return instanceMap.get(uid);
};

function trackHostChild(parent, child) {
  if (!parent || !child) return;
  if (!parent[HOST_CHILDREN]) {
    parent[HOST_CHILDREN] = new Set();
  }
  parent[HOST_CHILDREN].add(child);
}

function untrackHostChild(parent, child) {
  parent?.[HOST_CHILDREN]?.delete(child);
}

function mountHostChild(parent, child, attach) {
  trackHostChild(parent, child);
  attach();
}

function detachInstance(instance) {
  if (!instance?.uid || instance[DETACHED]) return;
  instance[DETACHED] = true;

  const children = instance[HOST_CHILDREN];
  if (children) {
    // Close children before this instance. LVGL deletes all child lv_objs when a
    // parent is lv_obj_del'd; child close() must run first while the parent still
    // exists. Native removeChild does not reparent to the window root for this.
    for (const child of [...children]) {
      detachInstance(child);
    }
    instance[HOST_CHILDREN] = undefined;
  }

  unRegistEvent(instance.uid);
  instanceMap.delete(instance.uid);
  instance.style = null;
  instance.close?.();
}

const HostConfig = {
  now: Date.now,
  getPublicInstance: (instance) => {
    //for supporting refs
    return instance;
  },
  getRootHostContext: () => {
    let context = {
      name: "rootnode",
    };
    return context;
  },
  prepareForCommit: () => {},
  resetAfterCommit: () => {},
  getChildHostContext: () => {
    return {};
  },
  shouldSetTextContent: function (type, props) {
    return false;
    return (
      typeof props.children === "string" || typeof props.children === "number"
    );
  },
  createInstance: (
    type,
    newProps,
    rootContainerInstance,
    _currentHostContext,
    workInProgress,
  ) => {
    const { createInstance } = getComponentByTagName(type);
    const uid = getUid();
    const instance = createInstance(
      newProps,
      rootContainerInstance,
      _currentHostContext,
      workInProgress,
      uid,
    );
    return instance;
  },
  createTextInstance: (
    text,
    rootContainerInstance,
    context,
    workInProgress,
  ) => {
    return null;
    // const { createInstance } = getComponentByTagName('Text');
    // const uid = getUid()

    // return createInstance(
    //   {
    //     text
    //   },
    //   rootContainerInstance,
    //   context,
    //   workInProgress,
    //   uid
    // );
  },
  appendInitialChild: (parent, child) => {
    mountHostChild(parent, child, () => parent.appendChild(child));
  },
  appendChild(parent, child) {
    mountHostChild(parent, child, () => parent.appendChild(child));
  },
  finalizeInitialChildren: (yueElement, type, props) => {
    return true;
  },
  insertBefore: (parent, child, beforeChild) => {
    mountHostChild(parent, child, () => parent.insertBefore(child, beforeChild));
  },
  supportsMutation: true,
  appendChildToContainer: function (container, child) {
    container.add(child);
  },
  insertInContainerBefore: (container, child, beforeChild) => {
    container.add(child);
  },
  removeChildFromContainer: (container, child) => {
    container.delete(child);
    detachInstance(child);
  },
  prepareUpdate(instance, oldProps, newProps) {
    return true;
  },
  commitUpdate: function (
    instance,
    updatePayload,
    type,
    oldProps,
    newProps,
    finishedWork,
  ) {
    const { commitUpdate } = getComponentByTagName(type);
    return commitUpdate(
      instance,
      updatePayload,
      oldProps,
      newProps,
      finishedWork,
    );
  },
  commitTextUpdate(textInstance, oldText, newText) {
    textInstance.setText(newText);
  },
  detachDeletedInstance: (instance) => {
    detachInstance(instance);
  },
  removeChild(parent, child) {
    untrackHostChild(parent, child);
    // close() first so lv_obj is freed before any parent teardown touches the tree
    detachInstance(child);

    // removeChild is an no-op that will be removed in future, no need call it
    // parent?.removeChild(child);
  },
  commitMount: function (instance, type, newProps, internalInstanceHandle) {
    instanceMap.set(instance.uid, instance);
    const { commitMount } = getComponentByTagName(type);
    return commitMount(instance, newProps, internalInstanceHandle);
  },
};

export default Reconciler(HostConfig);
