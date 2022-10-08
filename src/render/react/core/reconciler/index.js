import Reconciler from "react-reconciler";
import {
  getComponentByTagName,
} from "../../components/config";
import { unRegistEvent } from '../event'

let id = 1;

export const getUid = () => {
    return String(id++);
}

const instanceMap = new Map;

export const getInstance = (uid) => {
  return instanceMap[uid]
} 

const HostConfig = {
  now: Date.now,
  getPublicInstance: instance => {
    //for supporting refs
    return instance;
  },
  getRootHostContext: () => {
    let context = {
      name: "rootnode"
    };
    return context;
  },
  prepareForCommit: () => {},
  resetAfterCommit: () => {},
  getChildHostContext: () => {
    return {};
  },
  shouldSetTextContent: function(type, props) {
    return false
    return typeof props.children === 'string' || typeof props.children === 'number';
  },
  createInstance: (type, newProps, rootContainerInstance, _currentHostContext, workInProgress) => {
    const { createInstance } = getComponentByTagName(type);
    const uid = getUid()
    const instance = createInstance(
      newProps,
      rootContainerInstance,
      _currentHostContext,
      workInProgress,
      uid
    );
    instanceMap[uid] = instance
    return instance
  },
  createTextInstance: (
    text,
    rootContainerInstance,
    context,
    workInProgress
  ) => {
    return null
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
    parent.appendChild(child);
  },
  appendChild(parent, child) {
    parent.appendChild(child);
  },
  finalizeInitialChildren: (yueElement, type, props) => {
    return true
  },
  insertBefore: (parent, child, beforeChild) => {
    parent.insertBefore(child, beforeChild);
  },
  supportsMutation: true,
  appendChildToContainer: function(container, child) {
    container.add(child);
  },
  insertInContainerBefore: (container, child, beforeChild) => {
    container.add(child);
  },
  removeChildFromContainer: (container, child) => {
    container.delete(child);
    if (child.close) {
      child.close();
    }
  },
  prepareUpdate(instance, oldProps, newProps) {
    return true;
  },
  commitUpdate: function(
    instance,
    updatePayload,
    type,
    oldProps,
    newProps,
    finishedWork
  ) {
    const { commitUpdate } = getComponentByTagName(type);
    return commitUpdate(
      instance,
      updatePayload,
      oldProps,
      newProps,
      finishedWork
    );
  },
  commitTextUpdate(textInstance, oldText, newText) {
    textInstance.setText(newText)
  },
  removeChild(parent, child) {
    parent?.removeChild(child);
    unRegistEvent(child.uid);
    delete instanceMap[child.uid]
  },
  commitMount: function(instance, type, newProps, internalInstanceHandle) {
    const { commitMount } = getComponentByTagName(type);
    return commitMount(instance, newProps, internalInstanceHandle);
  }
};

export default Reconciler(HostConfig);
