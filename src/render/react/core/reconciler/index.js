import { getComponentByTagName } from "../../components/config";
import { unRegistEvent } from "../event";
import Reconciler from "react-reconciler";
import { DefaultEventPriority } from "react-reconciler/constants";
import { diffProps } from "./propDiffer.ts";

let id = 1;

export const getUid = () => {
  return String(id++);
};

const instanceMap = new Map();

export const getInstance = (uid) => {
  return instanceMap.get(uid);
};

const cleanupInstance = (child) => {
  if (!child) return;
  const uid = child.uid;
  if (uid) {
    unRegistEvent(uid);
    instanceMap.delete(uid);
  }
  child.style = null;
  child.dataset = null;
  child.uid = null; 
  child.close?.();
};

const HostConfig = {
  // --- Core Methods ---
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
  getChildHostContext: () => {
    return {};
  },
  prepareForCommit: () => {
    return null;
  },
  resetAfterCommit: () => {},
  preparePortalMount: () => {},
  
  // --- Scheduling ---
  scheduleTimeout: setTimeout,
  cancelTimeout: clearTimeout,
  noTimeout: -1,
  supportsMicrotasks: true,
  scheduleMicrotask: typeof queueMicrotask === 'function' 
    ? queueMicrotask 
    : (fn) => Promise.resolve().then(fn),
  
  // --- Mode Configuration ---
  isPrimaryRenderer: true,
  supportsMutation: true,
  supportsPersistence: false,
  supportsHydration: false,
  
  // --- Event Priority ---
  getCurrentEventPriority: () => {
    return DefaultEventPriority;
  },
  
  // --- Instance Lifecycle ---
  shouldSetTextContent: function (type, props) {
    // Keep text as a prop for our `Text` host component, not as separate text children.
    if (type === "Text") {
      const c = props?.children;
      if (typeof c === "string" || typeof c === "number") return true;
      if (Array.isArray(c)) {
        return c.every((x) => typeof x === "string" || typeof x === "number");
      }
    }
    return false;
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
    const { createInstance } = getComponentByTagName("Text");
    const uid = getUid();
    const instance = createInstance(
      { children: text },
      rootContainerInstance,
      context,
      workInProgress,
      uid,
    );
    return instance;
  },
  appendInitialChild: (parent, child) => {
    parent.appendChild(child);
  },
  finalizeInitialChildren: (instance, type, props) => {
    return true;
  },
  prepareUpdate(instance, type, oldProps, newProps, rootContainer, hostContext) {
    const skipKeys = type === 'Text' ? [] : ['children'];
    return diffProps(oldProps, newProps, skipKeys);
  },

  // --- Mutation Methods ---
  appendChild(parent, child) {
    parent.appendChild(child);
  },
  appendChildToContainer: function (container, child) {
    container.add(child);
  },
  insertBefore: (parent, child, beforeChild) => {
    parent.insertBefore(child, beforeChild);
  },
  insertInContainerBefore: (container, child, beforeChild) => {
    container.insertBefore(child, beforeChild);
  },
  removeChild(parent, child) {
    parent?.removeChild(child);
  },
  removeChildFromContainer: (container, child) => {
    container.delete(child);
  },
  resetTextContent: (instance) => {},
  commitTextUpdate(textInstance, oldText, newText) {
    textInstance.setText(newText);
  },
  commitMount: function (instance, type, newProps, internalInstanceHandle) {
    instanceMap.set(instance.uid, instance);
    if (newProps.autoFocus) {
      instance.focus?.();
    }
    const { commitMount } = getComponentByTagName(type);
    return commitMount(instance, newProps, internalInstanceHandle);
  },
  commitUpdate: function (
    instance,
    updatePayload,
    type,
    oldProps,
    newProps,
    finishedWork,
  ) {
    console.log('updatePayload', updatePayload);
    const { commitUpdate } = getComponentByTagName(type);
    return commitUpdate(instance, updatePayload, oldProps, newProps, finishedWork);
  },
  
  // --- Visibility Methods (for Suspense) ---
  hideInstance: (instance) => {
    instance.setStyle?.({ opa: 0 });
  },
  hideTextInstance: (textInstance) => {
    textInstance.setStyle?.({ opa: 0 });
  },
  unhideInstance: (instance, props) => {
    instance.setStyle?.({ opa: 255 });
  },
  unhideTextInstance: (textInstance, text) => {
    textInstance.setStyle?.({ opa: 255 });
  },
  
  // --- Cleanup ---
  clearContainer: (container) => {
    // Clear all children from the container
    container.clear?.();
  },
  detachDeletedInstance: (instance) => {
    cleanupInstance(instance);
  },

  // --- Other required methods ---
  getInstanceFromNode: () => null,
  beforeActiveInstanceBlur: () => {},
  afterActiveInstanceBlur: () => {},
  prepareScopeUpdate: () => {},
  getInstanceFromScope: () => null,
};

export default Reconciler(HostConfig);
